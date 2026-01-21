import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { usePeer } from '../../context/PeerContext';
import { apiService } from '../../services/apiConfig';
import {
    Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare,
    MoreVertical, Info, Users, LayoutGrid
} from 'lucide-react';

interface Participant {
    peerId: string;
    isAi: boolean;
    stream?: MediaStream;
}

export const GDSession: React.FC = () => {
    const { sessionId, roomId } = useParams();
    const { state } = useLocation(); // { name, myPeerId }
    const navigate = useNavigate();
    const { peer, myPeerId } = usePeer();
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [myStream, setMyStream] = useState<MediaStream | null>(null);
    const [transcripts, setTranscripts] = useState<any[]>([]);
    const [timeLeft, setTimeLeft] = useState(300); // 5 mins
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);

    const processedTranscriptIds = useRef<Set<string>>(new Set());
    const peersRef = useRef<{ [key: string]: any }>({});
    const scrollRef = useRef<HTMLDivElement>(null);
    const roomFetchedRef = useRef(false);

    // 1. Get User Media
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                setMyStream(stream);
            })
            .catch(err => {
                console.error("Media error", err);
                // Allow proceeding without media? 
                // For now just log. App requires media for calls.
            });
    }, []);

    // 2. Fetch Room (Independent of Media)
    useEffect(() => {
        if (!sessionId || !myPeerId) return;
        if (roomFetchedRef.current) return;

        const fetchRoomContext = async () => {
            try {
                console.log("Fetching room details...");
                const res = await apiService.getMyRoom(sessionId, myPeerId);
                const roomPeers: string[] = res.data.participants || [];
                console.log("Room participants:", roomPeers);

                const initialParticipantsList = roomPeers.map(pid => ({
                    peerId: pid,
                    isAi: pid.startsWith('ai-')
                }));
                const others = initialParticipantsList.filter(p => p.peerId !== myPeerId);

                setParticipants(others);
                roomFetchedRef.current = true;
            } catch (e) { console.error("Error fetching room:", e); }
        };

        fetchRoomContext();
    }, [sessionId, myPeerId]);

    // 3. Connect to Peers (Depends on Media & Participants)
    useEffect(() => {
        if (!myStream || !peer || participants.length === 0) return;

        participants.forEach(p => {
            // Only call humans we haven't called yet
            if (!p.isAi && !peersRef.current[p.peerId]) {
                console.log("Calling peer", p.peerId);
                const call = peer.call(p.peerId, myStream);
                call.on('stream', remoteStream => {
                    addStreamToParticipant(p.peerId, remoteStream);
                });
                peersRef.current[p.peerId] = call;
            }
        });

    }, [myStream, peer, participants]);

    // 4. Handle Incoming Calls
    useEffect(() => {
        if (!peer || !myStream) return;

        const handleCall = (call: any) => {
            console.log("Incoming call from", call.peer);
            call.answer(myStream);
            call.on('stream', (remoteStream: MediaStream) => {
                addStreamToParticipant(call.peer, remoteStream);
            });
        };

        // Cleanup previous listener not trivial with one-shot effect, 
        // but peer.off('call') is safe.
        peer.off('call');
        peer.on('call', handleCall);

        return () => { peer.off('call', handleCall); };
    }, [peer, myStream]);

    const addStreamToParticipant = (pid: string, stream: MediaStream) => {
        setParticipants(prev => prev.map(p => {
            if (p.peerId === pid) return { ...p, stream };
            return p;
        }));
    };

    const [isTalking, setIsTalking] = useState(false);
    const [videoEnabled, setVideoEnabled] = useState(true);
    const recognitionRef = useRef<any>(null);

    // 5. Transcription & AI Speech
    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            recognition.onresult = (event: any) => {
                const last = event.results.length - 1;
                const text = event.results[last][0].transcript;
                apiService.sendTranscript(sessionId!, roomId, myPeerId, text);
            };
            recognitionRef.current = recognition;
        }
    }, [sessionId, roomId, myPeerId]);

    const startTalking = () => {
        setIsTalking(true);
        window.speechSynthesis.cancel();
        if (roomId) apiService.toggleUserTalking(roomId, true).catch(console.error);
        if (recognitionRef.current) {
            try { recognitionRef.current.start(); } catch (e) { }
        }
    };

    const stopTalking = () => {
        setIsTalking(false);
        if (roomId) apiService.toggleUserTalking(roomId, false).catch(console.error);
        if (recognitionRef.current) { recognitionRef.current.stop(); }
    };

    const speakNaturally = (text: string) => {
        if (isTalking) return; // Barge-in: Don't start AI speech if user is talking

        // Add a 2s delay in frontend as well to ensure a clean break after transcript appears
        setTimeout(() => {
            if (isTalking) return; // Re-check if user started talking during delay
            const utt = new SpeechSynthesisUtterance(text);
            utt.rate = 0.9;
            window.speechSynthesis.speak(utt);
        }, 2000);
    };

    // 6. Poll Transcripts
    useEffect(() => {
        const interval = setInterval(async () => {
            if (!sessionId) return;
            try {
                const tRes = await apiService.getTranscripts(sessionId, roomId);
                const newTranscripts = tRes.data;
                setTranscripts(newTranscripts);

                newTranscripts.forEach((t: any) => {
                    const pid = t.speakerId;
                    if (pid.startsWith('ai-') && !processedTranscriptIds.current.has(t._id)) {
                        speakNaturally(t.text);
                        processedTranscriptIds.current.add(t._id);
                    }
                });

                if (scrollRef.current) {
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }
            } catch (e) { console.error(e); }
        }, 3000);
        return () => clearInterval(interval);
    }, [sessionId]);

    // 7. Timer
    // 7. Timer (Fixed Stale Closure)
    useEffect(() => {
        if (timeLeft <= 0) {
            console.log("Time up! Navigating to result...", { sessionId, roomId, myPeerId });
            navigate('/gd-portal/result', { state: { sessionId, roomId, myPeerId } });
        }
    }, [timeLeft, navigate, sessionId, roomId, myPeerId]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-screen w-screen bg-[#020403] flex flex-col overflow-hidden text-emerald-50 font-sans">
            {/* Top Bar (Info / Time) */}
            <div className="flex justify-between items-center px-4 py-3 bg-[#0F2C1F] border-b border-emerald-900/30">
                <div className="flex items-center gap-2">
                    <span className="text-xl font-medium tracking-tight text-emerald-100/90">
                        {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </span>
                    <div className="h-4 w-[1px] bg-emerald-800 mx-2"></div>
                    <span className="text-sm font-medium text-emerald-200/80">GD Session: {roomId?.slice(0, 8)}</span>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-emerald-400/60">
                        <Info size={20} />
                    </div>
                </div>
            </div>

            {/* Main Stage */}
            <div className="flex-1 flex overflow-hidden">
                {/* Video Grid */}
                <div className={`flex-1 p-4 flex flex-wrap content-center justify-center gap-4 transition-all duration-300 ${isSidePanelOpen ? 'pr-0' : ''}`}>

                    {/* My Video */}
                    <div className="relative bg-[#1A3329] rounded-xl overflow-hidden shadow-2xl aspect-video min-w-[300px] max-w-[48%] flex-1 ring-2 ring-emerald-500/30 border border-emerald-800/20">
                        {myStream && videoEnabled ? (
                            <video
                                ref={ref => { if (ref) ref.srcObject = myStream }}
                                autoPlay muted playsInline
                                className="w-full h-full object-cover transform scale-x-[-1]"
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-[#0F2C1F]/50">
                                <div className="w-20 h-20 bg-emerald-800/80 rounded-full flex items-center justify-center text-3xl font-bold text-emerald-100 mb-2">
                                    {state?.name?.charAt(0) || 'Y'}
                                </div>
                                <span className="text-emerald-400/60 text-sm font-medium">{videoEnabled ? 'Starting camera...' : 'Camera turned off'}</span>
                            </div>
                        )}
                        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-emerald-100">You</div>
                        {isTalking && <div className="absolute top-3 right-3 bg-emerald-500 p-1.5 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"><Mic size={14} className="text-[#020403]" /></div>}
                    </div>

                    {/* Other Participants */}
                    {participants.map(p => (
                        <div key={p.peerId} className="relative bg-[#1A3329] rounded-xl overflow-hidden shadow-xl aspect-video min-w-[300px] max-w-[48%] flex-1 border border-emerald-800/20">
                            {p.isAi ? (
                                <div className="w-full h-full flex flex-col items-center justify-center relative bg-gradient-to-b from-[#1A3329] to-[#0F2C1F]">
                                    <img
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${p.peerId}`}
                                        alt="AI"
                                        className="w-24 h-24 mb-2 filter drop-shadow-xl opacity-90"
                                    />
                                    {/* AI Audio Visualizer (Fake) */}
                                    <div className="flex gap-1 h-4 items-end">
                                        {[1, 2, 3].map(i => <div key={i} className="w-1 bg-emerald-400 animate-pulse" style={{ height: `${Math.random() * 100}%` }}></div>)}
                                    </div>
                                </div>
                            ) : p.stream ? (
                                <video
                                    ref={ref => { if (ref) ref.srcObject = (p.stream as MediaStream) }}
                                    autoPlay playsInline
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <span className="bg-amber-700/50 rounded-full w-14 h-14 flex items-center justify-center text-xl font-bold text-amber-100">P</span>
                                    <div className="text-xs mt-2 text-emerald-200/50">Waiting for stream...</div>
                                </div>
                            )}
                            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium max-w-[80%] truncate text-emerald-100">
                                {p.isAi ? "AI Participant" : `Peer ${p.peerId.slice(0, 4)}`}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Side Panel */}
                {isSidePanelOpen && (
                    <div className="w-[360px] bg-[#0F2C1F] border-l border-emerald-900/30 m-0 flex flex-col shadow-2xl transition-all duration-300">
                        {/* Panel Header */}
                        <div className="flex items-center justify-between p-4 border-b border-emerald-900/30">
                            <h3 className="text-lg font-medium text-emerald-100">In-call messages</h3>
                            <button onClick={() => setIsSidePanelOpen(false)} className="text-emerald-400 hover:bg-emerald-900/50 p-2 rounded-full transition-colors">
                                <span className="text-xl">×</span>
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0A1F16]" ref={scrollRef}>
                            <div className="text-center text-xs text-emerald-500/50 my-2">Messages can only be seen by people in the call and are deleted when the call ends.</div>

                            {transcripts.map((t, i) => {
                                const isAi = t.speakerId.startsWith('ai-');
                                const isMe = t.speakerId === myPeerId;
                                return (
                                    <div key={i} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                        <div className="flex items-baseline gap-2 mb-1">
                                            <span className="text-xs font-bold text-emerald-300/80">
                                                {isMe ? 'You' : (isAi ? 'AI Participant' : 'Peer')}
                                            </span>
                                            <span className="text-[10px] text-emerald-500/50">
                                                {new Date(t.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <div className={`px-4 py-2 rounded-2xl max-w-[90%] text-sm shadow-sm backdrop-blur-sm ${isMe
                                            ? 'bg-emerald-800/40 text-emerald-100 rounded-tr-sm border border-emerald-700/30'
                                            : (isAi ? 'bg-teal-900/40 text-teal-100 rounded-tl-sm border border-teal-800/30' : 'bg-[#1A3329] border border-emerald-800/30 text-emerald-100 rounded-tl-sm')
                                            }`}>
                                            {t.text}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Fake Input Area (since it's PTT) */}
                        <div className="p-4 bg-[#0F2C1F] border-t border-emerald-900/30 text-center">
                            <p className="text-xs text-emerald-400 bg-emerald-900/30 py-2 rounded border border-emerald-800/30">
                                Use the "Hold to Talk" button below to speak
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Control Bar */}
            <div className="h-[80px] bg-[#0F2C1F] flex items-center justify-between px-6 border-t border-emerald-900/30 z-50 relative">
                {/* Meeting Details */}
                <div className="flex items-center text-emerald-100/80 gap-2 min-w-[200px]">
                    <span className="font-medium hidden md:block">{moment().format('hh:mm A')}</span>
                    <span className="hidden md:block text-emerald-700">|</span>
                    <span className="truncate max-w-[150px] font-medium">{roomId?.slice(0, 8)}...</span>
                </div>

                {/* Center Controls */}
                <div className="flex items-center gap-3">
                    {/* Mic / PTT */}
                    <button
                        className={`p-4 rounded-full transition-all duration-200 shadow-lg ${isTalking
                            ? 'bg-emerald-500 hover:bg-emerald-400 ring-4 ring-emerald-500/30 text-[#020403]'
                            : 'bg-[#1A3329] hover:bg-[#234235] text-emerald-100 border border-emerald-700/30'
                            }`}
                        onMouseDown={startTalking}
                        onMouseUp={stopTalking}
                        onTouchStart={startTalking}
                        onTouchEnd={stopTalking}
                    >
                        {isTalking ? <Mic size={24} /> : <MicOff size={24} className="text-red-400" />}
                    </button>

                    {/* Camera Toggle */}
                    <button
                        onClick={() => {
                            setVideoEnabled(!videoEnabled);
                            if (myStream) {
                                myStream.getVideoTracks().forEach(track => track.enabled = !videoEnabled);
                            }
                        }}
                        className={`p-4 rounded-full transition-colors border shadow-lg ${videoEnabled
                            ? 'bg-[#1A3329] hover:bg-[#234235] text-emerald-100 border-emerald-700/30'
                            : 'bg-red-600/20 hover:bg-red-600/30 text-red-100 border-red-500/30'}`}
                    >
                        {videoEnabled ? <Video size={24} /> : <VideoOff size={24} />}
                    </button>

                    {/* Hand Raise (Cosmetic) */}
                    <button className="hidden md:block p-4 rounded-full bg-[#1A3329] hover:bg-[#234235] text-emerald-100 border border-emerald-700/30 transition-colors">
                        <Users size={24} />
                    </button>

                    {/* End Call */}
                    <button
                        onClick={() => {
                            console.log("End Call Clicked", { sessionId, roomId, myPeerId });
                            navigate('/gd-portal/result', { state: { sessionId, roomId, myPeerId } });
                        }}
                        className="p-4 rounded-full bg-red-600/90 hover:bg-red-500 text-white min-w-[60px] flex items-center justify-center transform hover:scale-105 transition-all shadow-lg shadow-red-900/20"
                    >
                        <PhoneOff size={24} />
                    </button>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-3 min-w-[200px] justify-end">
                    <button
                        onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
                        className={`text-emerald-100 p-3 rounded-full hover:bg-[#1A3329] relative transition-colors ${isSidePanelOpen ? 'text-emerald-400 bg-[#1A3329]' : ''}`}
                    >
                        <MessageSquare size={24} />
                        {transcripts.length > 0 && (
                            <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_5px_#10B981]"></span>
                        )}
                    </button>
                    <button className="text-emerald-100 p-3 rounded-full hover:bg-[#1A3329] transition-colors">
                        <LayoutGrid size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

// Helper for 'moment' if not installed, using inline date
const moment = () => ({ format: (fmt: string) => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) });
