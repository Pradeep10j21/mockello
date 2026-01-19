import { useState, useCallback, useEffect, useRef } from 'react';
import { Participant, TranscriptMessage, GDSession } from '@/types/gd';

const AI_PARTICIPANTS: Omit<Participant, 'isSpeaking'>[] = [
  { id: '1', name: 'Arjun Sharma', isYou: false, isMuted: false, isVideoOff: false, isHandRaised: false },
  { id: '2', name: 'Priya Patel', isYou: false, isMuted: false, isVideoOff: false, isHandRaised: false },
  { id: '3', name: 'Rahul Verma', isYou: false, isMuted: false, isVideoOff: true, isHandRaised: false },
  { id: '4', name: 'Sneha Gupta', isYou: false, isMuted: true, isVideoOff: false, isHandRaised: false },
  { id: '5', name: 'Vikram Singh', isYou: false, isMuted: false, isVideoOff: false, isHandRaised: false },
];

const AI_RESPONSES = [
  "I believe AI presents more opportunities than threats for fresh graduates. It's creating new job roles that didn't exist before.",
  "While I agree there are opportunities, we can't ignore that AI automation is displacing many entry-level positions.",
  "The key is adaptability. Fresh graduates who learn to work alongside AI will thrive in this new landscape.",
  "I think the education system needs to evolve. We should be teaching AI literacy from an early stage.",
  "Let's not forget the entrepreneurial opportunities. AI tools are making it easier to start businesses with minimal resources.",
  "However, the skill gap is real. Many graduates aren't prepared for AI-integrated workplaces.",
  "I see AI as a great equalizer. It gives graduates from smaller cities access to world-class resources.",
  "The threat perception often comes from resistance to change. Those who embrace AI will find more doors opening.",
  "We should focus on developing skills that AI can't replicate - creativity, emotional intelligence, and critical thinking.",
  "The job market is definitely shifting. Traditional roles are evolving, not disappearing entirely.",
];

const GD_TOPIC = "Is AI a threat or an opportunity for fresh graduates?";
const SESSION_DURATION = 20 * 60; // 20 minutes in seconds

export function useGDSession() {
  const [session, setSession] = useState<GDSession>({
    topic: GD_TOPIC,
    duration: SESSION_DURATION,
    participants: [
      { id: 'you', name: 'You', isYou: true, isMuted: true, isVideoOff: false, isHandRaised: false, isSpeaking: false },
      ...AI_PARTICIPANTS.map(p => ({ ...p, isSpeaking: false })),
    ],
    transcript: [],
    startTime: new Date(),
    isRecording: false,
    isScreenSharing: false,
  });

  const [timeRemaining, setTimeRemaining] = useState(SESSION_DURATION);
  const [isSessionActive, setIsSessionActive] = useState(true);
  const aiResponseIndex = useRef(0);
  const aiIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Timer countdown
  useEffect(() => {
    if (!isSessionActive) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsSessionActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSessionActive]);

  // AI participants sending messages
  useEffect(() => {
    if (!isSessionActive) return;

    const sendAIMessage = () => {
      const aiParticipants = session.participants.filter(p => !p.isYou);
      const randomParticipant = aiParticipants[Math.floor(Math.random() * aiParticipants.length)];
      
      const message: TranscriptMessage = {
        id: Date.now().toString(),
        participantId: randomParticipant.id,
        participantName: randomParticipant.name,
        content: AI_RESPONSES[aiResponseIndex.current % AI_RESPONSES.length],
        timestamp: new Date(),
        isYou: false,
      };

      aiResponseIndex.current += 1;

      setSession(prev => ({
        ...prev,
        transcript: [...prev.transcript, message],
        participants: prev.participants.map(p => ({
          ...p,
          isSpeaking: p.id === randomParticipant.id,
        })),
      }));

      // Reset speaking state after 3 seconds
      setTimeout(() => {
        setSession(prev => ({
          ...prev,
          participants: prev.participants.map(p => ({
            ...p,
            isSpeaking: p.id === randomParticipant.id ? false : p.isSpeaking,
          })),
        }));
      }, 3000);
    };

    // Send initial AI message after 5 seconds
    const initialTimeout = setTimeout(sendAIMessage, 5000);

    // Then send messages every 15-25 seconds
    aiIntervalRef.current = setInterval(() => {
      if (isSessionActive) {
        sendAIMessage();
      }
    }, 15000 + Math.random() * 10000);

    return () => {
      clearTimeout(initialTimeout);
      if (aiIntervalRef.current) {
        clearInterval(aiIntervalRef.current);
      }
    };
  }, [isSessionActive]);

  const toggleMute = useCallback(() => {
    setSession(prev => ({
      ...prev,
      participants: prev.participants.map(p =>
        p.isYou ? { ...p, isMuted: !p.isMuted } : p
      ),
    }));
  }, []);

  const toggleVideo = useCallback(() => {
    setSession(prev => ({
      ...prev,
      participants: prev.participants.map(p =>
        p.isYou ? { ...p, isVideoOff: !p.isVideoOff } : p
      ),
    }));
  }, []);

  const toggleHandRaise = useCallback(() => {
    setSession(prev => ({
      ...prev,
      participants: prev.participants.map(p =>
        p.isYou ? { ...p, isHandRaised: !p.isHandRaised } : p
      ),
    }));
  }, []);

  const toggleRecording = useCallback(() => {
    setSession(prev => ({
      ...prev,
      isRecording: !prev.isRecording,
    }));
  }, []);

  const toggleScreenShare = useCallback(() => {
    setSession(prev => ({
      ...prev,
      isScreenSharing: !prev.isScreenSharing,
    }));
  }, []);

  const sendMessage = useCallback((content: string) => {
    if (!content.trim()) return;

    const message: TranscriptMessage = {
      id: Date.now().toString(),
      participantId: 'you',
      participantName: 'You',
      content: content.trim(),
      timestamp: new Date(),
      isYou: true,
    };

    setSession(prev => ({
      ...prev,
      transcript: [...prev.transcript, message],
    }));
  }, []);

  const endSession = useCallback(() => {
    setIsSessionActive(false);
    if (aiIntervalRef.current) {
      clearInterval(aiIntervalRef.current);
    }
  }, []);

  return {
    session,
    timeRemaining,
    isSessionActive,
    toggleMute,
    toggleVideo,
    toggleHandRaise,
    toggleRecording,
    toggleScreenShare,
    sendMessage,
    endSession,
  };
}




