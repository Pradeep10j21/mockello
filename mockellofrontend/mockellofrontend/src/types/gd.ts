export interface Participant {
  id: string;
  name: string;
  isYou: boolean;
  isMuted: boolean;
  isVideoOff: boolean;
  isHandRaised: boolean;
  isSpeaking: boolean;
}

export interface TranscriptMessage {
  id: string;
  participantId: string;
  participantName: string;
  content: string;
  timestamp: Date;
  isYou: boolean;
}

export interface Reaction {
  id: string;
  emoji: string;
  participantId: string;
  timestamp: Date;
}

export interface GDResult {
  participantId: string;
  participantName: string;
  score: number;
  rank: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  relevance: number;
  communication: number;
  confidence: number;
  participation: number;
  logicalFlow: number;
}

export interface GDSession {
  topic: string;
  duration: number; // in seconds
  participants: Participant[];
  transcript: TranscriptMessage[];
  startTime: Date;
  isRecording: boolean;
  isScreenSharing: boolean;
}




