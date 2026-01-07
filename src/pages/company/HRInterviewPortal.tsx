import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Peer, { DataConnection } from 'peerjs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Users, UserCheck, FileText, ChevronRight, Save, CheckCircle, MessageSquare, Signal, Settings, Volume2, Send, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { getCompanyData } from '@/lib/companyStore';
import { whisperService } from '@/services/whisperService';


interface TranscriptMsg {
    speaker: string;
    text: string;
    timestamp: string;
}



const HRInterviewPortal = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Role Determination
    const role = location.state?.role || 'candidate';
    const isInterviewer = role === 'interviewer';

    // State
    const [myPeerId, setMyPeerId] = useState<string>('');
    const [remotePeerId, setRemotePeerId] = useState<string>('');
    const [isConnected, setIsConnected] = useState(false);
    const [isMicOn, setIsMicOn] = useState(true);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [isVolumeOn, setIsVolumeOn] = useState(true);

    // Form State
    const [notes, setNotes] = useState('');
    const [decision, setDecision] = useState('Hold');
    const [isSaving, setIsSaving] = useState(false);

    // Transcription State
    const [transcripts, setTranscripts] = useState<TranscriptMsg[]>([]);
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [debugStatus, setDebugStatus] = useState<string[]>([]);
    const [volumeLevel, setVolumeLevel] = useState(0);

    const addDebug = (msg: string) => setDebugStatus(prev => [msg, ...prev].slice(0, 5));

    // Refs for stable references
    const myVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const peerInstance = useRef<Peer | null>(null);
    const connInstance = useRef<DataConnection | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const remoteStreamRef = useRef<MediaStream | null>(null); // Store remote stream for delayed attachment
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const callRef = useRef<any>(null);
    const screenStreamRef = useRef<MediaStream | null>(null);
    const transcriptEndRef = useRef<HTMLDivElement>(null);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const micRef = useRef(isMicOn); // Ref for closures
    const isConnectedRef = useRef(isConnected);

    // Sync refs
    useEffect(() => { micRef.current = isMicOn; }, [isMicOn]);
    useEffect(() => { isConnectedRef.current = isConnected; }, [isConnected]);

    // Housekeeping
    const companyData = getCompanyData();
    const SESSION_ID = 'session-debug-999'; // Consider making this dynamic later
    const HOST_ID = `mockello-hr-${SESSION_ID}`;
    const CANDIDATE_ID = `mockello-candidate-${SESSION_ID}`;
    // Swap IDs: If I'm the interviewer, I want my ID to be HOST_ID.
    const myId = isInterviewer ? HOST_ID : CANDIDATE_ID;
    const targetPeerId = isInterviewer ? CANDIDATE_ID : HOST_ID;

    // Auto-scroll transcript
    useEffect(() => {
        transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [transcripts]);

    // Attach remote stream when connected and video element is ready
    useEffect(() => {
        if (isConnected && remoteVideoRef.current && remoteStreamRef.current) {
            console.log("[WebRTC] Attaching remote stream to video element");
            remoteVideoRef.current.srcObject = remoteStreamRef.current;
        }
    }, [isConnected]);

    // --- Transcription Logic (Groq + VAD) ---
    const SPEECH_THRESHOLD = 5; // Reduced from 15 to 5
    const MIN_SPEECH_FRAMES = 2; // Reduced from 5 to 2

    const processAudioChunk = async (blob: Blob, speechFrames: number, maxVol: number) => {
        if (speechFrames < MIN_SPEECH_FRAMES) {
            addDebug(`Skip: Silence (Frames: ${speechFrames}, MaxVol: ${maxVol})`);
            return;
        }

        addDebug(`Sending... (Frames: ${speechFrames}, Vol: ${maxVol})`);
        try {
            const text = await whisperService.transcribeAudio(blob);
            if (!text) return;

            // Hallucination Filtering
            const hallucinations = [
                'Thank you', 'Thanks for watching', 'Subtitle by', 'Amara.org', 'Support us', 'Copyright',
                'All rights reserved', 'Translated by', 'Transcribed by', '.'
            ];

            const cleanup = text.trim();
            if (cleanup.length < 2) return;
            if (hallucinations.some(h => cleanup.toLowerCase().includes(h.toLowerCase()))) {
                addDebug("Filtered Hallucination");
                return;
            }

            // Success
            console.log(`[Transcription] Final: "${cleanup}"`);
            addDebug(`Final: ${cleanup.substring(0, 20)}...`);

            setTranscripts(prev => {
                const newMsg: TranscriptMsg = {
                    speaker: isInterviewer ? 'HR' : 'Candidate',
                    text: cleanup,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };

                // Send to peer
                if (connInstance.current && connInstance.current.open) {
                    connInstance.current.send({ type: 'transcript', payload: newMsg });
                }

                return [...prev, newMsg];
            });

        } catch (e) {
            console.error(e);
            addDebug("Error: API Call Failed");
        }
    };

    const startRecording = useCallback(async () => {
        if (!streamRef.current) return;

        setIsTranscribing(true);
        addDebug("Starting Recorder...");

        const mediaRecorder = new MediaRecorder(streamRef.current, { mimeType: 'audio/webm' });
        mediaRecorderRef.current = mediaRecorder;

        // VAD State for current chunk
        let currentSpeechFrames = 0;
        let maxVol = 0;
        let audioContext: AudioContext | null = null;
        let analyzer: AnalyserNode | null = null;
        let source: MediaStreamAudioSourceNode | null = null;
        let intervalId: any = null;

        try {
            audioContext = new AudioContext();
            source = audioContext.createMediaStreamSource(streamRef.current);
            analyzer = audioContext.createAnalyser();
            analyzer.fftSize = 256;
            source.connect(analyzer);

            const bufferLength = analyzer.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            // Check volume 10 times a second
            intervalId = setInterval(() => {
                if (!isTranscribing) return; // Stop checking if stopped
                analyzer?.getByteFrequencyData(dataArray);
                const sum = dataArray.reduce((src, a) => src + a, 0);
                const avg = sum / bufferLength;

                // Update UI visualization
                const vol = Math.round(avg);
                setVolumeLevel(vol);
                if (vol > maxVol) maxVol = vol;

                if (avg > SPEECH_THRESHOLD) {
                    currentSpeechFrames++;
                }
            }, 100);

        } catch (e) { console.error("Audio Context Error", e); }

        mediaRecorder.ondataavailable = async (event) => {
            if (event.data.size > 0) {
                // Process the chunk we just finished recording
                const frames = currentSpeechFrames;
                const peak = maxVol;
                currentSpeechFrames = 0; // Reset for next chunk
                maxVol = 0;
                await processAudioChunk(event.data, frames, peak);
            }
        };

        mediaRecorder.start(4000); // 4 second chunks

        // Cleanup function stored in ref or effect
        return () => {
            clearInterval(intervalId);
            audioContext?.close();
        };

    }, [isInterviewer]);

    const stopTranscription = useCallback(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
        }
        setIsTranscribing(false);
        addDebug("Stopped manually");
    }, []);

    const startTranscription = () => {
        startRecording();
    };

    // Cleanup recognition on unmount
    // Cleanup recognition on unmount
    useEffect(() => {
        return () => {
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
                mediaRecorderRef.current.stop();
            }
        };
    }, []);



    // --- Connection Handlers ---
    const handleConnection = useCallback((conn: DataConnection) => {
        connInstance.current = conn;
        conn.on('open', () => console.log("[Data] Link Open"));
        conn.on('data', (data: any) => {
            if (data.type === 'transcript') {
                setTranscripts(prev => [...prev, data.payload]);
            }
        });
        conn.on('error', (err) => console.error("[Data] Error:", err));
    }, []);

    const connectToHost = useCallback((peer: Peer, stream: MediaStream) => {
        if (!peer || peer.destroyed) return;
        console.log(`[WebRTC] Calling: ${targetPeerId}`);
        const call = peer.call(targetPeerId, stream);
        callRef.current = call;
        if (call) {
            call.on('stream', (remoteStream) => {
                console.log("[WebRTC] Remote Stream Received");
                remoteStreamRef.current = remoteStream;
                setIsConnected(true);
            });
        }
        const conn = peer.connect(targetPeerId);
        handleConnection(conn);
    }, [targetPeerId, handleConnection]);

    // --- LifeCycle ---
    useEffect(() => {
        const init = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                    .catch(() => navigator.mediaDevices.getUserMedia({ audio: true }));

                streamRef.current = stream;
                if (myVideoRef.current) myVideoRef.current.srcObject = stream;

                try { startTranscription(); } catch (e) { console.error(e); }

                const peer = new Peer(myId, { debug: 1 });
                peerInstance.current = peer;

                peer.on('open', (id) => {
                    setMyPeerId(id);
                    console.log(`[Peer] Open with ID: ${id}`);
                });

                peer.on('call', (call) => {
                    callRef.current = call;
                    call.answer(stream);
                    call.on('stream', (remoteStream) => {
                        remoteStreamRef.current = remoteStream;
                        setIsConnected(true);
                        toast.success("Connected to Candidate!");
                    });
                });

                // Auto-connect for candidate (with delay to let host init)
                if (!isInterviewer) {
                    console.log("[Student] Scheduling connection attempt...");
                    setTimeout(() => connectToHost(peer, stream), 2000);
                }

                peer.on('connection', (conn) => handleConnection(conn));

                peer.on('error', (err) => {
                    console.error("[Peer] Error:", err.type);
                    if (err.type === 'unavailable-id') toast.error("Session conflict. Please refresh.");
                });



            } catch (err) {
                toast.error("Camera/Mic Denied");
            }
        };

        init();

        return () => {
            if (peerInstance.current) peerInstance.current.destroy();
            if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
            if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
        };
    }, []);

    // Actions
    const toggleMic = () => {
        const track = streamRef.current?.getAudioTracks()[0];
        if (track) {
            track.enabled = !track.enabled;
            setIsMicOn(track.enabled);
            // Also toggle transcription to save resources / prevent errors
            if (track.enabled) startTranscription();
            else stopTranscription();
        }
    };
    const toggleVideo = () => {
        const track = streamRef.current?.getVideoTracks()[0];
        if (track) { track.enabled = !track.enabled; setIsVideoOn(track.enabled); }
    };

    // Replace the outgoing video track in the Peer connection and local stream
    const replaceOutgoingVideoTrack = async (newTrack: MediaStreamTrack) => {
        try {
            // Update local stream
            if (streamRef.current) {
                // Remove existing video tracks
                streamRef.current.getVideoTracks().forEach(t => streamRef.current?.removeTrack(t));
                streamRef.current.addTrack(newTrack);
                if (myVideoRef.current) myVideoRef.current.srcObject = streamRef.current;
            }

            // Replace track on peer connection sender
            const pc = callRef.current?.peerConnection;
            if (pc && typeof pc.getSenders === 'function') {
                const sender = pc.getSenders().find((s: any) => s.track && s.track.kind === 'video');
                if (sender) {
                    await sender.replaceTrack(newTrack);
                }
            }
        } catch (e) { console.error('Replace track failed', e); }
    };

    const startScreenShare = async () => {
        try {
            const screenStream = await (navigator.mediaDevices as any).getDisplayMedia({ video: true });
            const screenTrack = screenStream.getVideoTracks()[0];
            if (!screenTrack) throw new Error('No screen track');

            // When the user stops sharing via browser UI, revert
            screenTrack.onended = () => {
                stopScreenShare();
            };

            screenStreamRef.current = screenStream;
            await replaceOutgoingVideoTrack(screenTrack);
            setIsScreenSharing(true);
            setIsVideoOn(true);
            addDebug('Screen sharing started');
        } catch (e) {
            console.error('Screen share error', e);
            toast.error('Could not start screen share');
        }
    };

    const stopScreenShare = async () => {
        try {
            // Stop any existing screen tracks
            screenStreamRef.current?.getTracks().forEach(t => t.stop());
            screenStreamRef.current = null;

            // Try to re-acquire camera video and replace track
            const camStream = await navigator.mediaDevices.getUserMedia({ video: true }).catch(() => null);
            const camTrack = camStream?.getVideoTracks()[0];
            if (camTrack) {
                await replaceOutgoingVideoTrack(camTrack);
                setIsVideoOn(true);
                addDebug('Screen sharing stopped — returned to camera');
            } else {
                // If camera unavailable, remove video track
                if (streamRef.current) streamRef.current.getVideoTracks().forEach(t => t.stop());
                setIsVideoOn(false);
            }
        } catch (e) {
            console.error('Stop screen share failed', e);
        } finally {
            setIsScreenSharing(false);
        }
    };
    const handleManualRetry = () => {
        if (peerInstance.current && streamRef.current) connectToHost(peerInstance.current, streamRef.current);
    };
    const endCall = () => navigate(isInterviewer ? '/company/dashboard' : '/student/dashboard');

    const handleSaveNotes = async () => {
        setIsSaving(true);
        try {
            const resp = await fetch('http://localhost:8000/company/interview-result', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    company_email: companyData?.hrEmail || 'demo@company.com',
                    candidate_id: 'Student',
                    notes, decision, timestamp: new Date().toISOString()
                })
            });
            if (resp.ok) toast.success("Saved"); else toast.error("Failed");
        } catch (e) { toast.error("Error"); }
        finally { setIsSaving(false); }
    };

    const TranscriptionBox = ({ isDark = false }) => (
        <div className={`flex flex-col h-full overflow-hidden ${isDark ? 'text-white' : 'text-slate-800'}`}>
            <div className={`p-4 border-b ${isDark ? 'border-white/10' : 'bg-slate-50'} flex justify-between`}>
                <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <MessageSquare size={14} /> Transcript
                </span>
                <div className="flex items-center gap-2">
                    {isTranscribing ? (
                        <span className="text-[10px] animate-pulse text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Live
                        </span>
                    ) : (
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-slate-400"></span> Off
                        </span>
                    )}
                    <Button variant="ghost" size="icon" className="h-6 w-6 ml-2" onClick={isTranscribing ? stopTranscription : startTranscription} title={isTranscribing ? "Stop Captioning" : "Start Captioning"}>
                        {isTranscribing ? <Volume2 size={12} className="text-emerald-400" /> : <Volume2 size={12} className="opacity-40" />}
                    </Button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                {transcripts.length === 0 ? (
                    <div className="h-full flex items-center justify-center opacity-20 text-xs italic">Waiting for speech...</div>
                ) : (
                    transcripts.map((t, i) => (
                        <div key={i} className={`flex flex-col ${t.speaker === (isInterviewer ? 'HR' : 'Candidate') ? 'items-end' : 'items-start'}`}>
                            <span className="text-[9px] font-bold uppercase opacity-40 mb-1">{t.speaker}</span>
                            <div className={`px-4 py-2 rounded-2xl text-[11px] max-w-[85%] ${t.speaker === 'HR' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : (isDark ? 'bg-white/10' : 'bg-white border shadow-sm')
                                }`}>
                                {t.text}
                            </div>
                        </div>
                    ))
                )}
                <div ref={transcriptEndRef} />
            </div>
        </div>
    );

    if (!isInterviewer) {
        return (
            <div className="h-screen bg-[#112620] text-white flex overflow-hidden font-sans">
                <div className="flex-1 flex flex-col relative p-6">
                    <div className="flex-1 bg-[#1a3a32] rounded-[32px] border border-white/5 relative overflow-hidden flex items-center justify-center">
                        {!isConnected ? (
                            <div className="flex flex-col items-center gap-4 text-white/30">
                                <RefreshCw className="w-12 h-12 animate-spin opacity-20" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Waiting for HR...</span>
                                <Button size="sm" variant="outline" className="mt-2 border-white/10 text-white/60 hover:bg-white/5" onClick={handleManualRetry}>Connect Now</Button>
                            </div>
                        ) : (
                            <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
                        )}
                        {isConnected && <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur px-6 py-2 rounded-full border border-white/5 text-xs font-bold uppercase tracking-widest">Interviewer (Connected)</div>}
                    </div>
                    <div className="absolute top-10 right-10 w-64 aspect-video bg-[#0d1f1b] rounded-24px border border-white/10 overflow-hidden shadow-2xl z-20">
                        <video ref={myVideoRef} autoPlay playsInline muted className="w-full h-full object-cover transform scale-x-[-1]" />
                        {!isVideoOn && <div className="absolute inset-0 bg-[#0d1f1b] flex items-center justify-center"><VideoOff className="opacity-20" /></div>}
                    </div>
                    <div className="h-24 flex items-center justify-center gap-4 mt-4">
                        <Button variant="outline" size="icon" onClick={toggleMic} className={`rounded-xl w-12 h-12 bg-white/5 border-white/10 hover:bg-white/10 ${!isMicOn && 'bg-red-500/80 text-white'}`}>
                            {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
                        </Button>
                        <Button variant="outline" size="icon" onClick={toggleVideo} className={`rounded-xl w-12 h-12 bg-white/5 border-white/10 hover:bg-white/10 ${!isVideoOn && 'bg-red-500/80 text-white'}`}>
                            {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
                        </Button>
                        <Button variant="outline" size="icon" onClick={isScreenSharing ? stopScreenShare : startScreenShare} className={`rounded-xl w-12 h-12 bg-white/5 border-white/10 hover:bg-white/10 ${isScreenSharing ? 'bg-emerald-600 text-white' : ''}`} title={isScreenSharing ? 'Stop Screen Share' : 'Share Screen'}>
                            <Video size={18} />
                        </Button>
                        <Button variant="destructive" onClick={endCall} className="h-12 px-10 rounded-xl font-bold uppercase tracking-widest shadow-xl">Leave</Button>
                    </div>
                </div>
                <div className="w-[380px] bg-[#0d1f1b] border-l border-white/5 flex flex-col shadow-2xl">
                    <TranscriptionBox isDark={true} />
                    <div className="absolute top-4 left-4 z-50">
                        <Button size="sm" variant={isTranscribing ? "default" : "secondary"} className="h-8 text-[10px] uppercase font-bold tracking-widest" onClick={isTranscribing ? stopTranscription : startTranscription}>
                            {isTranscribing ? "Captions On" : "Captions Off"}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-[#f3f5f4] text-slate-800 flex flex-col overflow-hidden font-sans">
            <header className="h-14 bg-white border-b flex items-center justify-between px-6 shadow-sm z-10">
                <div className="flex items-center gap-2 font-bold text-lg text-emerald-900 font-display"><Users size={20} className="text-emerald-600" /> HR Panel</div>
                <div className="flex items-center gap-4">
                    <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-tighter ${isConnected ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-100 text-slate-500'}`}>{isConnected ? 'Connected' : 'Disconnected'}</span>
                    <Button size="sm" variant="ghost" className="text-xs hover:bg-emerald-50" onClick={handleManualRetry}><RefreshCw className="w-3 h-3 mr-2" /> Retry Link</Button>
                    <Button size="sm" variant={isScreenSharing ? "default" : "ghost"} className="text-xs hover:bg-emerald-50" onClick={isScreenSharing ? stopScreenShare : startScreenShare}>{isScreenSharing ? 'Sharing' : 'Share Screen'}</Button>
                    <Button size="sm" variant="destructive" onClick={endCall} className="rounded-lg px-6 font-bold uppercase tracking-tighter">Exit</Button>
                </div>
            </header>
            <div className="flex-1 flex overflow-hidden">
                <div className="w-[350px] bg-white border-r shadow-sm"><TranscriptionBox /></div>
                <div className="flex-1 bg-slate-200/50 p-4 relative overflow-hidden flex flex-col">
                    <div className="flex-1 bg-[#1a3a32] rounded-3xl overflow-hidden relative shadow-2xl border border-black/5">
                        <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
                        {!isConnected && <div className="absolute inset-0 flex items-center justify-center text-white/10 uppercase tracking-[0.2em] font-bold">Waiting for Candidate...</div>}
                    </div>
                    <div className="absolute bottom-10 right-10 w-56 aspect-video bg-[#0d1f1b] rounded-2xl border-4 border-white shadow-2xl overflow-hidden z-20">
                        <video ref={myVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="w-[380px] bg-white border-l p-6 flex flex-col gap-6 shadow-2xl z-10">
                    <div className="flex-1 flex flex-col gap-3">
                        <div className="bg-black/90 p-2 rounded text-[10px] font-mono text-green-400 mb-2 h-20 overflow-hidden flex flex-col gap-1">
                            {/* Volume Meter */}
                            <div className="flex items-center gap-2 border-b border-white/20 pb-1 mb-1">
                                <span>Vol:</span>
                                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-green-500 transition-all duration-75 ease-out"
                                        style={{ width: `${volumeLevel}%` }}
                                    />
                                </div>
                                <span>{volumeLevel}%</span>
                            </div>
                            {/* Logs */}
                            <div className="flex-1 overflow-y-auto scrollbar-hide">
                                {debugStatus.map((msg, i) => <div key={i}>{msg}</div>)}
                            </div>
                        </div>
                        <label className="text-[10px] font-bold uppercase opacity-40 tracking-widest flex items-center gap-2"><FileText size={12} /> Notes & Observation</label>
                        <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="flex-1 resize-none bg-slate-50 border-none rounded-2xl p-5 text-sm leading-relaxed shadow-inner" placeholder="Type behavioral and skill observations here..." />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {['Strong Hire', 'Hire', 'Hold', 'Reject'].map(d => (
                            <Button key={d} variant={decision === d ? 'default' : 'outline'} size="sm" onClick={() => setDecision(d)} className={`text-[10px] uppercase font-bold rounded-xl h-11 ${decision === d ? 'bg-emerald-600 shadow-lg shadow-emerald-100' : ''}`}>{d}</Button>
                        ))}
                    </div>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 h-14 rounded-2xl text-white font-bold uppercase tracking-widest shadow-xl shadow-emerald-100 mt-2" onClick={handleSaveNotes} disabled={isSaving}>
                        {isSaving ? 'Saving...' : 'Save Result'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HRInterviewPortal;
