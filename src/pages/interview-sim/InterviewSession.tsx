import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Camera, Video, VideoOff, PhoneOff, Cpu, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { groqService, GroqMessage } from '@/services/groqService';
import { Message } from '@/types/interview';
import { useToast } from "@/components/ui/use-toast";

// --- Components ---
const AudioVisualizer = ({ isSpeaking }: { isSpeaking: boolean }) => (
    <div className="flex items-center justify-center gap-1 h-10">
        {[...Array(5)].map((_, i) => (
            <motion.div
                key={i}
                className="w-1.5 bg-[#0F2C1F] rounded-full"
                animate={{
                    height: isSpeaking ? [10, 24, 10] : 8,
                    opacity: isSpeaking ? 1 : 0.3
                }}
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut"
                }}
            />
        ))}
    </div>
);

const InterviewSession = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { toast } = useToast();
    const { department, domain } = location.state || { department: 'General', domain: 'General' };

    // --- State ---
    const [messages, setMessages] = useState<Message[]>([]);
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isAISpeaking, setIsAISpeaking] = useState(false);
    const [cameraOn, setCameraOn] = useState(true);

    // --- Refs ---
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    // --- Initial System Prompt ---
    const systemPrompt: GroqMessage = {
        role: 'system',
        content: `You are a professional Technical Interviewer for a ${department} role specializing in ${domain}. 
    
    CRITICAL INSTRUCTIONS:
    1. You must ask a TOTAL of 5 to 7 questions only. Not more, not less.
    2. Focus purely on Technical questions and Project-related questions.
    3. Keep the interview "short and crisp".
    4. Start by asking them to introduce themselves.
    5. After the candidate introduces themselves, move straight to technical/project questions.
    6. After you have asked your 5-7 questions, thank the candidate and say "Thank you, we are done with the interview."
    7. Be professional but concise. Do not lecture.
    `
    };

    const [conversationHistory, setConversationHistory] = useState<GroqMessage[]>([systemPrompt]);

    // --- Effects ---
    useEffect(() => {
        startCamera();

        // Seed the conversation with a system prompt AND a hidden user trigger
        const startTrigger: GroqMessage = {
            role: 'user',
            content: 'The candidate has entered the room. Please introduce yourself and start the interview.'
        };

        const initialHistory = [systemPrompt, startTrigger];
        setConversationHistory(initialHistory);
        handleAIResponse(initialHistory);

        return () => {
            stopCamera();
            stopSpeaking();
        };
    }, []);

    // --- Media Handlers ---
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setCameraOn(true);
        } catch (err) {
            console.error("Camera error:", err);
            setCameraOn(false);
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }
    };

    const toggleCamera = () => {
        if (cameraOn) {
            stopCamera();
            setCameraOn(false);
        } else {
            startCamera();
        }
    };

    // --- Recording Logic ---
    const startRecording = () => {
        if (!streamRef.current) {
            toast({
                title: "Microphone Error",
                description: "Cannot access microphone. Please check permissions.",
                variant: "destructive"
            });
            return;
        }

        // Stop AI speech if interrupted
        stopSpeaking();

        try {
            // Select supported MIME type
            const types = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus', 'audio/mp4', ''];
            const mimeType = types.find(t => t === '' || MediaRecorder.isTypeSupported(t));

            console.log(`[Session] Starting MediaRecorder with mimeType: ${mimeType || 'default'}`);
            const mediaRecorder = new MediaRecorder(streamRef.current, mimeType ? { mimeType } : undefined);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    console.log(`[Session] Received chunk: ${event.data.size} bytes`);
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = async () => {
                const mimeType = mediaRecorder.mimeType || 'audio/webm';
                console.log(`[Session] Stopped. Mime: ${mimeType}, Chunks: ${audioChunksRef.current.length}`);

                if (audioChunksRef.current.length === 0) return;

                const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
                await processUserAudio(audioBlob);
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (err) {
            console.error("[Session] MediaRecorder start failed:", err);
            toast({
                title: "Recording Failed",
                description: "Could not start recording.",
                variant: "destructive"
            });
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    // --- Core Loop ---
    const processUserAudio = async (audioBlob: Blob) => {
        setIsProcessing(true);
        try {
            console.log(`[Session] Processing audio blob of size: ${audioBlob.size} bytes`);
            // 1. Transcribe
            const text = await groqService.transcribeAudio(audioBlob);

            if (!text || !text.trim()) {
                console.warn("[Session] Empty transcription received");
                toast({
                    title: "No speech detected",
                    description: "We couldn't hear you clearly. Please try again.",
                    variant: "default"
                });
                setIsProcessing(false);
                return;
            }

            console.log(`[Session] Transcribed: "${text}"`);

            // Add User Message
            const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() };
            setMessages(prev => [...prev, userMsg]);

            const newHistory = [...conversationHistory, { role: 'user', content: text } as GroqMessage];
            setConversationHistory(newHistory);

            // 2. Get AI Response
            await handleAIResponse(newHistory);

        } catch (err) {
            console.error("Processing error:", err);
            toast({
                title: "Processing Failed",
                description: err instanceof Error ? err.message : "Transcription failed",
                variant: "destructive"
            });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleAIResponse = async (history: GroqMessage[]) => {
        setIsProcessing(true);
        try {
            // OPTIMIZATION: Context Window Management
            // Always keep System Prompt (index 0)
            // Then take only the last 10 messages from the rest
            const systemMsg = history[0];
            const recentHistory = history.slice(1).slice(-10);
            const optimizedHistory = [systemMsg, ...recentHistory];

            const aiText = await groqService.getChatCompletion(optimizedHistory);

            const aiMsg: Message = { id: Date.now().toString(), role: 'assistant', content: aiText, timestamp: new Date() };
            setMessages(prev => [...prev, aiMsg]);
            setConversationHistory([...history, { role: 'assistant', content: aiText }]);

            // 3. Speak
            speakText(aiText);
        } catch (err) {
            console.error("AI Response error:", err);
            toast({
                title: "AI Response Failed",
                description: err instanceof Error ? err.message : "Verified API failure",
                variant: "destructive"
            });
        } finally {
            setIsProcessing(false);
        }
    };

    // --- TTS ---
    const speakText = (text: string) => {
        if (!window.speechSynthesis) return;

        stopSpeaking();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        // Try to find a good voice
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.name.includes("Google US English")) || voices[0];
        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.onstart = () => setIsAISpeaking(true);
        utterance.onend = () => setIsAISpeaking(false);

        window.speechSynthesis.speak(utterance);
    };

    const stopSpeaking = () => {
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
            setIsAISpeaking(false);
        }
    };

    // --- Handlers ---
    const handleEndSession = async () => {
        console.log("handleEndSession triggered");
        stopSpeaking();
        if (isProcessing) {
            console.log("Already processing, ignoring click");
            return;
        }

        setIsProcessing(true);
        toast({ title: "Analyzing Session", description: "Generating your performance report..." });

        try {
            console.log("Calling evaluateInterview with history:", conversationHistory);
            const result = await groqService.evaluateInterview(conversationHistory);
            console.log("Evaluation result received:", result);

            console.log("Navigating to result page...");
            navigate('/interview/result', { state: { result } });
            console.log("Navigation called.");
        } catch (error) {
            console.error("Evaluation error / Navigation fail:", error);
            toast({ title: "Error", description: "Could not generate report.", variant: "destructive" });
            navigate('/interview');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="h-screen bg-[#F1F7F4] flex flex-col font-sans text-[#0F2C1F] overflow-hidden">

            {/* Header */}
            <header className="h-16 bg-[#0F2C1F] text-[#CCDBD0] flex items-center justify-between px-6 shadow-md z-20">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                        <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg leading-tight">AI Interviewer</h1>
                        <p className="text-xs opacity-70">{department} • {domain}</p>
                    </div>
                </div>
                <Button
                    variant="destructive"
                    size="sm"
                    className="bg-red-500 hover:bg-red-600 text-white rounded-full px-4"
                    onClick={handleEndSession}
                    disabled={isProcessing}
                >
                    {isProcessing ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" /> : <PhoneOff className="w-4 h-4 mr-2" />}
                    {isProcessing ? "Analyzing..." : "End Session"}
                </Button>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex gap-4 p-4 min-h-0">

                {/* Left: Chat Transcript */}
                <div className="w-1/3 bg-white rounded-3xl shadow-lg flex flex-col overflow-hidden border border-[#0F2C1F]/10">
                    <div className="p-4 bg-[#0F2C1F]/5 font-semibold text-sm uppercase tracking-wider border-b border-[#0F2C1F]/10">
                        Transcript
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map(msg => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                                    ? 'bg-[#0F2C1F] text-[#CCDBD0] rounded-tr-none'
                                    : 'bg-[#F1F7F4] text-[#0F2C1F] border border-gray-100 rounded-tl-none'
                                    }`}>
                                    {msg.content}
                                </div>
                            </motion.div>
                        ))}
                        {isProcessing && (
                            <div className="flex justify-start">
                                <div className="bg-[#F1F7F4] p-3 rounded-2xl rounded-tl-none flex gap-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75" />
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Video & Controls */}
                <div className="flex-1 flex flex-col gap-4">

                    {/* AI Avatar / Status */}
                    <div className="h-2/3 bg-black rounded-3xl overflow-hidden relative shadow-2xl group border-4 border-[#0F2C1F]">

                        {/* Avatar Image with Breathing Animation */}
                        <div className="absolute inset-0 bg-[#39634E] flex flex-col items-center justify-center overflow-hidden">
                            {/* Round Icon */}
                            <div className="w-32 h-32 bg-[#F1F7F4] rounded-full flex items-center justify-center shadow-2xl mb-4 border-4 border-[#0F2C1F]/20">
                                <span className="text-4xl font-bold text-[#0F2C1F]">HR</span>
                            </div>

                            {/* Optional: Real Video Layer (Hidden unless file exists) */}
                            {/* User can enable this by dropping 'interviewer.mp4' in public folder */}
                            <video
                                src="/interviewer.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover hidden"
                                onError={(e) => e.currentTarget.style.display = 'none'}
                                onCanPlay={(e) => e.currentTarget.style.display = 'block'}
                            />

                            {/* Overlay Gradient for Text Readability */}
                            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0F2C1F] to-transparent pointer-events-none" />
                        </div>

                        {/* Status Overlay */}
                        <div className="absolute bottom-6 left-0 right-0 text-center z-10">
                            {/* Speaker Icon Removed */}
                            <h2 className="text-xl font-bold text-white mt-3 drop-shadow-md tracking-wider">HR INTERVIEWER</h2>
                            {isAISpeaking && (
                                <div className="mt-2 scale-75 transform origin-bottom">
                                    <AudioVisualizer isSpeaking={true} />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* User Camera & Controls */}
                    <div className="h-1/3 flex gap-4">
                        {/* Camera Feed */}
                        <div className="aspect-video bg-black rounded-3xl overflow-hidden relative shadow-lg border border-white/20">
                            <video
                                ref={videoRef}
                                autoPlay
                                muted
                                className="w-full h-full object-cover transform scale-x-[-1]"
                            />
                            {!cameraOn && (
                                <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a] text-white/50">
                                    <VideoOff className="w-8 h-8" />
                                </div>
                            )}
                        </div>

                        {/* Controls */}
                        <div className="flex-1 bg-white rounded-3xl shadow-lg border border-[#0F2C1F]/10 flex flex-col items-center justify-center gap-6 p-6">
                            <div className="text-sm font-medium text-gray-500">
                                {isRecording ? "Listening..." : isProcessing ? "Thinking..." : "Your turn to speak"}
                            </div>

                            <div className="flex items-center gap-6">
                                <Button
                                    size="icon"
                                    variant="secondary"
                                    className={`w-14 h-14 rounded-full transition-all ${!cameraOn ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}
                                    onClick={toggleCamera}
                                >
                                    {cameraOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                                </Button>

                                <Button
                                    size="icon"
                                    className={`w-20 h-20 rounded-full shadow-xl transition-all duration-300 ${isRecording
                                        ? 'bg-red-500 hover:bg-red-600 scale-110 ring-4 ring-red-500/30'
                                        : 'bg-[#0F2C1F] hover:bg-[#1a3f2d] hover:scale-105'
                                        }`}
                                    onClick={isRecording ? stopRecording : startRecording}
                                    disabled={isProcessing}
                                >
                                    {isRecording ? <MicOff className="w-8 h-8 text-white" /> : <Mic className="w-8 h-8 text-white" />}
                                </Button>
                            </div>
                            <p className="text-xs text-gray-400">
                                {isRecording ? "Tap to send answer" : "Tap microphone to answer"}
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

// Basic Error Boundary Component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: Error | null }> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("InterviewSession Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-8 text-center">
                    <h2 className="text-xl font-bold text-red-600 mb-4">Something went wrong.</h2>
                    <p className="text-gray-700 mb-4">{this.state.error?.message}</p>
                    <Button onClick={() => window.location.reload()}>Reload Page</Button>
                </div>
            );
        }
        return this.props.children;
    }
}

export default function InterviewSessionWrapper() {
    return (
        <ErrorBoundary>
            <InterviewSession />
        </ErrorBoundary>
    );
}
