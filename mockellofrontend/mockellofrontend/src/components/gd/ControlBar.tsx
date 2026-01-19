import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  Hand,
  Circle,
  Phone,
  Smile,
  ThumbsUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface ControlBarProps {
  isMuted: boolean;
  isVideoOff: boolean;
  isHandRaised: boolean;
  isRecording: boolean;
  isScreenSharing: boolean;
  onToggleMute: () => void;
  onToggleVideo: () => void;
  onToggleHandRaise: () => void;
  onToggleRecording: () => void;
  onToggleScreenShare: () => void;
  onEndSession: () => void;
  onReaction: (emoji: string) => void;
}

const REACTIONS = ['👍', '👏', '😊', '🎉', '❤️', '🤔'];

export function ControlBar({
  isMuted,
  isVideoOff,
  isHandRaised,
  isRecording,
  isScreenSharing,
  onToggleMute,
  onToggleVideo,
  onToggleHandRaise,
  onToggleRecording,
  onToggleScreenShare,
  onEndSession,
  onReaction,
}: ControlBarProps) {
  const [showReactions, setShowReactions] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-2 p-3 bg-card rounded-2xl shadow-elevated"
    >
      {/* Mic */}
      <button
        onClick={onToggleMute}
        className={`control-btn ${isMuted ? 'active' : ''}`}
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      </button>

      {/* Video */}
      <button
        onClick={onToggleVideo}
        className={`control-btn ${isVideoOff ? 'active' : ''}`}
        title={isVideoOff ? 'Turn on video' : 'Turn off video'}
      >
        {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
      </button>

      {/* Screen Share */}
      <button
        onClick={onToggleScreenShare}
        className={`control-btn ${isScreenSharing ? 'bg-accent text-accent-foreground' : ''}`}
        title={isScreenSharing ? 'Stop sharing' : 'Share screen'}
      >
        <Monitor className="w-5 h-5" />
      </button>

      {/* Hand Raise */}
      <button
        onClick={onToggleHandRaise}
        className={`control-btn ${isHandRaised ? 'bg-yellow-500 text-primary' : ''}`}
        title={isHandRaised ? 'Lower hand' : 'Raise hand'}
      >
        <Hand className="w-5 h-5" />
      </button>

      {/* Reactions */}
      <Popover open={showReactions} onOpenChange={setShowReactions}>
        <PopoverTrigger asChild>
          <button className="control-btn" title="Reactions">
            <Smile className="w-5 h-5" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2" side="top">
          <div className="flex gap-1">
            {REACTIONS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => {
                  onReaction(emoji);
                  setShowReactions(false);
                }}
                className="p-2 text-xl hover:bg-accent/30 rounded-lg transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Record */}
      <button
        onClick={onToggleRecording}
        className={`control-btn ${isRecording ? 'bg-destructive text-destructive-foreground' : ''}`}
        title={isRecording ? 'Stop recording' : 'Start recording'}
      >
        <Circle className={`w-5 h-5 ${isRecording ? 'fill-current' : ''}`} />
      </button>

      {/* End Call */}
      <button
        onClick={onEndSession}
        className="control-btn end-call"
        title="End discussion"
      >
        <Phone className="w-5 h-5 rotate-[135deg]" />
        <span className="ml-2 font-medium text-sm">End GD</span>
      </button>
    </motion.div>
  );
}




