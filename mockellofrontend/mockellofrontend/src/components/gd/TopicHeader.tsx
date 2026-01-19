import { motion } from 'framer-motion';
import { MessageSquare, Clock, Circle } from 'lucide-react';

interface TopicHeaderProps {
  topic: string;
  timeRemaining: number;
  isRecording: boolean;
}

export function TopicHeader({ topic, timeRemaining, isRecording }: TopicHeaderProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeRemaining < 120; // Less than 2 minutes

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between p-4 bg-card rounded-2xl shadow-card"
    >
      {/* Topic */}
      <div className="flex items-center gap-3 flex-1">
        <div className="p-2 rounded-xl bg-primary/10">
          <MessageSquare className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-xs text-[#0F2C1F] dark:text-[#2d5a3d] font-medium uppercase tracking-wide">Discussion Topic</p>
          <h2 className="font-display text-lg font-semibold text-foreground">{topic}</h2>
        </div>
      </div>

      {/* Timer & Recording */}
      <div className="flex items-center gap-4">
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-3 py-1.5 bg-destructive/10 rounded-full"
          >
            <Circle className="w-3 h-3 fill-destructive text-destructive animate-pulse" />
            <span className="text-sm font-medium text-destructive">Recording</span>
          </motion.div>
        )}
        
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
          isLowTime ? 'bg-destructive/10 text-destructive' : 'bg-soft/50 text-foreground'
        }`}>
          <Clock className="w-4 h-4" />
          <span className="font-mono font-semibold text-lg">{formatTime(timeRemaining)}</span>
        </div>
      </div>
    </motion.div>
  );
}




