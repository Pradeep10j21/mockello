import { motion } from "framer-motion";
import { Users, Clock } from "lucide-react";

interface QueueStatusProps {
  currentCount: number;
  maxCount: number;
  remainingSeconds: number;
  totalSeconds: number;
}

const QueueStatus = ({ currentCount, maxCount, remainingSeconds, totalSeconds }: QueueStatusProps) => {
  const progress = (currentCount / maxCount) * 100;
  const timeProgress = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
  const isWarning = remainingSeconds <= 60;
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      className="flex flex-col md:flex-row items-center gap-4 w-full max-w-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Lobby Status Pill */}
      <div className="glass-forest rounded-full px-5 py-3 flex items-center gap-3 flex-1">
        <Users className="w-5 h-5 text-forest-medium" />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-body text-muted-foreground">Lobby Status</span>
            <span className="text-sm font-semibold text-foreground">
              {currentCount}/{maxCount}
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-forest-medium to-sage rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Timer Pill */}
      <div className={`glass-forest rounded-full px-5 py-3 flex items-center gap-3 ${isWarning ? "animate-pulse-soft" : ""}`}>
        <div className="relative">
          <Clock className={`w-5 h-5 ${isWarning ? "text-gold-warm" : "text-forest-medium"}`} />
          {/* Circular progress around clock */}
          <svg className="absolute -inset-1 w-7 h-7 -rotate-90">
            <circle
              cx="14"
              cy="14"
              r="12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-muted/30"
            />
            <motion.circle
              cx="14"
              cy="14"
              r="12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className={isWarning ? "text-gold-warm" : "text-forest-medium"}
              strokeDasharray={75.4}
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: 75.4 * (timeProgress / 100) }}
              transition={{ duration: 1, ease: "linear" }}
            />
          </svg>
        </div>
        <span className={`text-lg font-display font-bold tabular-nums ${isWarning ? "text-gold-warm" : "text-foreground"}`}>
          {formatTime(remainingSeconds)}
        </span>
      </div>
    </motion.div>
  );
};

export default QueueStatus;




