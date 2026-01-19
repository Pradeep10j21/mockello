import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, PhoneOff, MessageSquare, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { groqService, GroqMessage } from '@/services/groqService';
import { Message } from '@/types/interview';
import { useToast } from "@/components/ui/use-toast";

// --- Timer Component ---
const InterviewTimer = ({ elapsedTime, maxTime = 600 }: { elapsedTime: number; maxTime?: number }) => {
    const progress = Math.min((elapsedTime / maxTime) * 100, 100);
    const minutes = String(Math.floor(elapsedTime / 60)).padStart(2, '0');
    const seconds = String(elapsedTime % 60).padStart(2, '0');

    return (
        <div className="w-full">
            <div className="bg-[#0D1F17]/90 backdrop-blur-md rounded-2xl px-8 py-4 border border-green-primary/20 shadow-2xl">
                <p className="text-xs text-gray-400 text-center mb-1 tracking-wide">Interview Time</p>
                <p className="text-4xl font-bold text-emerald-400 text-center tracking-[0.2em] font-mono">
                    {minutes}:{seconds}
                </p>
                <div className="mt-3 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>
        </div>
    );
};

// --- AI Status Indicator ---
const AIStatusIndicator = ({ isSpeaking }: { isSpeaking: boolean }) => (
    <div className="absolute bottom-6 left-6 z-20">
        <div className="flex items-center gap-3 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
            <div className={`w-3 h-3 rounded-full ${isSpeaking ? 'bg-emerald-400 animate-pulse' : 'bg-emerald-500'}`} />
            <span className="text-white font-medium text-sm">AI Assistant</span>
        </div>
    </div>
);

// --- Conversation Panel ---
const ConversationPanel = ({
    messages,
    isProcessing
}: {
    messages: Message[];
    isProcessing: boolean
}) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="w-[340px] bg-[#0F2C1F]/95 backdrop-blur-xl rounded-2xl flex flex-col overflow-hidden border border-green-primary/20 shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-green-primary/20 flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-white" />
                <h3 className="font-semibold text-white">Conversation</h3>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-120px)]">
                {messages.map(msg => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {msg.role === 'assistant' ? (
                            <div className="max-w-[85%]">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    <span className="text-xs text-gray-400">AI Assistant</span>
                                </div>
                                <div className="bg-[#1a3026] text-white px-4 py-3 rounded-2xl rounded-tl-sm text-sm leading-relaxed">
                                    {msg.content}
                                </div>
                            </div>
                        ) : (
                            <div className="max-w-[85%]">
                                <div className="flex items-center gap-2 mb-1 justify-end">
                                    <User className="w-3 h-3 text-gray-400" />
                                    <span className="text-xs text-gray-400">You</span>
                                </div>
                                <div className="bg-[#0F2C1F] text-white px-4 py-3 rounded-2xl rounded-tr-sm text-sm leading-relaxed shadow-lg shadow-green-900/10">
                                    {msg.content}
                                </div>
                            </div>
                        )}
                    </motion.div>
                ))}

                {isProcessing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                    >
                        <div className="bg-[#1a3026] px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5">
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
};

// --- Main Component ---
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
    const [elapsedTime, setElapsedTime] = useState(0);

    // --- Refs ---
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const streamRef = useRef<MediaStream | null>(null);

    // --- Department-Specific Prompts ---
    const getDepartmentFocus = () => {
        const focus: Record<string, string> = {
            'CSE': 'focus on algorithms, data structures, system design, and web/mobile technologies',
            'IT': 'focus on IT infrastructure, network management, and system administration',
            'ECE': 'focus on circuit design, embedded systems, and signal processing',
            'Mechanical': 'focus on mechanical design, thermodynamics, and engineering principles',
            'Civil': 'focus on structural analysis, construction management, and civil engineering design',
            'Electrical': 'focus on power systems, electrical machines, and control systems',
            'B.Com': 'focus on accounting principles, financial management, and business law',
            'Marketing': 'focus on market analysis, consumer behavior, and marketing strategies',
            'Finance': 'focus on financial analysis, investment strategy, and risk management',
            'Sales': 'focus on sales techniques, client management, and negotiation skills'
        };
        return focus[department] || 'focus on technical expertise and practical experience';
    };

    // --- Initial System Prompt ---
    const systemPrompt: GroqMessage = {
        role: 'system',
        content: `You are a professional female HR Interviewer for a ${department} role specializing in ${domain}. Please ${getDepartmentFocus()}.
    
    CRITICAL INSTRUCTIONS:
    1. Maintain a professional, warm, and engaging "Lady HR" persona.
    2. Conversations should be natural and professional—neither too short nor too lengthy.
    3. YOUR VERY FIRST QUESTION MUST BE: "Tell me about yourself."
    4. Provide brief, encouraging feedback or follow-up based on the candidate's responses before moving to the next question.
    5. Ask exactly 5 to 7 questions in total.
    6. Conclude with a warm thanks: "Thank you for your time today. We have completed the interview session."
    `
    };

    const [conversationHistory, setConversationHistory] = useState<GroqMessage[]>([systemPrompt]);

    // --- Effects ---
    useEffect(() => {
        initializeAudio();

        const startTrigger: GroqMessage = {
            role: 'user',
            content: 'The candidate has entered the room. Please greet them briefly and ask: "Tell me about yourself."'
        };

        const initialHistory = [systemPrompt, startTrigger];
        setConversationHistory(initialHistory);
        handleAIResponse(initialHistory);

        return () => {
            stopAudio();
            stopSpeaking();
        };
    }, []);

    // --- Timer Effect ---
    useEffect(() => {
        const interval = setInterval(() => {
            setElapsedTime(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // --- Audio Handlers ---
    const initializeAudio = async () => {
        try {
            console.log("[Session] Requesting audio stream...");
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: { echoCancellation: true, noiseSuppression: true }
            });
            streamRef.current = stream;
            console.log("[Session] Audio stream acquired");
        } catch (err) {
            console.error("[Session] Audio access error:", err);
            toast({
                title: "Microphone Error",
                description: "Cannot access microphone. Please check permissions.",
                variant: "destructive"
            });
        }
    };

    const stopAudio = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
    };

    // --- Recording Logic ---
    const startRecording = async (retryCount = 0) => {
        console.log(`[Session] startRecording triggered (retry: ${retryCount})`);

        let stream = streamRef.current;
        const isStreamDead = !stream || !stream.active || stream.getAudioTracks().every(t => t.readyState === 'ended');

        if (isStreamDead) {
            console.log("[Session] Stream missing or inactive, re-requesting...");
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    audio: { echoCancellation: true, noiseSuppression: true }
                });
                streamRef.current = stream;
            } catch (err) {
                console.error("[Session] Audio acquisition failure:", err);
                toast({
                    title: "Microphone Error",
                    description: "Cannot access microphone. Please check permissions.",
                    variant: "destructive"
                });
                return;
            }
        }

        if (!stream) return;

        const audioTrack = stream.getAudioTracks()[0];
        if (!audioTrack || audioTrack.readyState !== 'live') {
            console.error("[Session] No active audio track found");
            if (retryCount < 1) return startRecording(retryCount + 1);
            toast({
                title: "Microphone Error",
                description: "No active microphone track found. Please refresh.",
                variant: "destructive"
            });
            return;
        }

        audioTrack.enabled = true;
        stopSpeaking();

        try {
            const audioOnlyStream = new MediaStream([audioTrack]);
            const types = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus'];
            const mimeType = types.find(t => MediaRecorder.isTypeSupported(t));

            console.log(`[Session] Initializing MediaRecorder with mimeType: ${mimeType || 'browser-default'}`);

            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
                try { mediaRecorderRef.current.stop(); } catch (e) { }
            }

            const mediaRecorder = new MediaRecorder(audioOnlyStream, mimeType ? { mimeType } : undefined);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = async () => {
                const usedMimeType = mediaRecorder.mimeType || 'audio/webm';
                console.log(`[Session] Recorder stopped. Chunks: ${audioChunksRef.current.length}`);

                if (audioChunksRef.current.length === 0) {
                    console.warn("[Session] No audio captured.");
                    return;
                }

                const audioBlob = new Blob(audioChunksRef.current, { type: usedMimeType });
                await processUserAudio(audioBlob);
            };

            await new Promise(resolve => setTimeout(resolve, 100));
            mediaRecorder.start();
            setIsRecording(true);
            console.log("[Session] Recording started successfully");

        } catch (err) {
            console.error("[Session] MediaRecorder start failed:", err);
            if (retryCount < 1) {
                if (streamRef.current) {
                    streamRef.current.getTracks().forEach(t => t.stop());
                }
                streamRef.current = null;
                return startRecording(retryCount + 1);
            }
            toast({
                title: "Recording Failed",
                description: `Error: ${err instanceof Error ? err.message : 'Unknown'}. Please try refreshing.`,
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

            const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() };
            setMessages(prev => [...prev, userMsg]);

            const newHistory = [...conversationHistory, { role: 'user', content: text } as GroqMessage];
            setConversationHistory(newHistory);

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
            const systemMsg = history[0];
            const recentHistory = history.slice(1).slice(-10);
            const optimizedHistory = [systemMsg, ...recentHistory];

            const aiText = await groqService.getChatCompletion(optimizedHistory);

            const aiMsg: Message = { id: Date.now().toString(), role: 'assistant', content: aiText, timestamp: new Date() };
            setMessages(prev => [...prev, aiMsg]);
            setConversationHistory([...history, { role: 'assistant', content: aiText }]);

            speakText(aiText);
        } catch (err) {
            console.error("AI Response error:", err);
            toast({
                title: "AI Response Failed",
                description: err instanceof Error ? err.message : "API failure",
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

        const voices = window.speechSynthesis.getVoices();
        // Prioritize professional "Lady HR" sounding natural voices
        const preferredVoice =
            voices.find(v => v.name === "Google UK English Female") ||
            voices.find(v => v.name === "Microsoft Libby Online (Natural) - English (United Kingdom)") ||
            voices.find(v => v.name === "Microsoft Sonia Online (Natural) - English (United Kingdom)") ||
            voices.find(v => v.name.includes("Natural") && v.name.toLowerCase().includes("female")) ||
            voices.find(v => v.name.includes("Libby")) ||
            voices.find(v => v.name.includes("Zira")) ||
            voices.find(v => v.name.includes("Samantha")) ||
            voices.find(v => v.name.toLowerCase().includes("female")) ||
            voices[0];
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
        if (isProcessing) return;

        setIsProcessing(true);
        toast({ title: "Analyzing Session", description: "Generating your performance report..." });

        try {
            const result = await groqService.evaluateInterview(conversationHistory);
            navigate('/interview/result', { state: { result } });
        } catch (error) {
            console.error("Evaluation error:", error);
            toast({ title: "Error", description: "Could not generate report.", variant: "destructive" });
            navigate('/interview');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="h-screen w-screen bg-black flex overflow-hidden">
            {/* Left: AI Avatar Section */}
            <div className="flex-1 relative">
                {/* Avatar Image */}
                <img
                    src="/ai_avatar.png"
                    alt="AI Interviewer"
                    className="w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30" />

                {/* AI Status */}
                <AIStatusIndicator isSpeaking={isAISpeaking} />

                {/* Control Buttons */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="flex items-center gap-4">
                        {/* Mic Button */}
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={isRecording ? stopRecording : () => startRecording(0)}
                            disabled={isProcessing}
                            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg ${isRecording
                                ? 'bg-red-500 hover:bg-red-600 ring-4 ring-red-500/30'
                                : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm'
                                }`}
                        >
                            {isRecording ? (
                                <MicOff className="w-7 h-7 text-white" />
                            ) : (
                                <Mic className="w-7 h-7 text-white" />
                            )}
                        </motion.button>

                        {/* End Call Button */}
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handleEndSession}
                            disabled={isProcessing}
                            className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center shadow-lg transition-all"
                        >
                            {isProcessing ? (
                                <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" />
                            ) : (
                                <PhoneOff className="w-6 h-6 text-white" />
                            )}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Right: Timer + Conversation Panel */}
            <div className="p-4 flex flex-col gap-4 h-full">
                {/* Timer */}
                <InterviewTimer elapsedTime={elapsedTime} />

                {/* Conversation */}
                <div className="flex-1 overflow-hidden">
                    <ConversationPanel messages={messages} isProcessing={isProcessing} />
                </div>
            </div>
        </div>
    );
};

// Error Boundary Component
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
                <div className="h-screen bg-black flex items-center justify-center">
                    <div className="text-center p-8">
                        <h2 className="text-xl font-bold text-red-500 mb-4">Something went wrong.</h2>
                        <p className="text-gray-400 mb-4">{this.state.error?.message}</p>
                        <Button onClick={() => window.location.reload()}>Reload Page</Button>
                    </div>
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
