export interface InterviewSettings {
    department: string;
    domain: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Message {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
}

export interface InterviewState {
    isRecording: boolean;
    isProcessing: boolean;
    isSpeaking: boolean;
    transcript: string;
    messages: Message[];
    error: string | null;
}
