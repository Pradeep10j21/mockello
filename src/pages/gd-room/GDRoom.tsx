import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGDSession } from '@/hooks/useGDSession';
import { TopicHeader } from '@/components/gd/TopicHeader';
import { VideoGrid } from '@/components/gd/VideoGrid';
import { TranscriptPanel } from '@/components/gd/TranscriptPanel';
import { ControlBar } from '@/components/gd/ControlBar';
import { MessageInput } from '@/components/gd/MessageInput';
import { ReactionOverlay } from '@/components/gd/ReactionOverlay';

export default function GDRoom() {
  const navigate = useNavigate();
  const {
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
  } = useGDSession();

  const [reactionTrigger, setReactionTrigger] = useState<{ emoji: string; timestamp: number } | null>(null);

  const youParticipant = session.participants.find((p) => p.isYou);

  const handleReaction = useCallback((emoji: string) => {
    setReactionTrigger({ emoji, timestamp: Date.now() });
  }, []);

  const handleEndSession = useCallback(() => {
    endSession();
    navigate('/gd-portal/result', {
      state: {
        transcript: session.transcript,
        participants: session.participants,
        topic: session.topic,
      },
    });
  }, [endSession, navigate, session]);

  // Navigate to result when session ends naturally
  useEffect(() => {
    if (!isSessionActive && timeRemaining === 0) {
      navigate('/gd-portal/result', {
        state: {
          transcript: session.transcript,
          participants: session.participants,
          topic: session.topic,
        },
      });
    }
  }, [isSessionActive, timeRemaining, navigate, session]);

  return (
    <div className="h-screen w-screen overflow-hidden bg-background flex flex-col p-4 gap-3">
      {/* Reaction Overlay */}
      <ReactionOverlay trigger={reactionTrigger} />

      {/* Header with Topic and Timer */}
      <TopicHeader
        topic={session.topic}
        timeRemaining={timeRemaining}
        isRecording={session.isRecording}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex gap-3 min-h-0">
        {/* Video Grid - Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-1 bg-card rounded-2xl shadow-card overflow-hidden"
        >
          <VideoGrid participants={session.participants} />
        </motion.div>

        {/* Transcript Panel - Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="w-80 flex-shrink-0"
        >
          <TranscriptPanel messages={session.transcript} />
        </motion.div>
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center gap-3">
        {/* Message Input */}
        <div className="flex-1">
          <MessageInput
            onSendMessage={sendMessage}
            isMuted={youParticipant?.isMuted ?? true}
            onToggleMute={toggleMute}
          />
        </div>

        {/* Control Bar */}
        <ControlBar
          isMuted={youParticipant?.isMuted ?? true}
          isVideoOff={youParticipant?.isVideoOff ?? false}
          isHandRaised={youParticipant?.isHandRaised ?? false}
          isRecording={session.isRecording}
          isScreenSharing={session.isScreenSharing}
          onToggleMute={toggleMute}
          onToggleVideo={toggleVideo}
          onToggleHandRaise={toggleHandRaise}
          onToggleRecording={toggleRecording}
          onToggleScreenShare={toggleScreenShare}
          onEndSession={handleEndSession}
          onReaction={handleReaction}
        />
      </div>
    </div>
  );
}




