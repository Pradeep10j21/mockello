import { useEffect, useState } from "react";

interface CountdownTimerProps {
  totalSeconds: number;
  remainingSeconds: number;
  isWarning?: boolean;
}

const CountdownTimer = ({ totalSeconds, remainingSeconds, isWarning = false }: CountdownTimerProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const progress = (remainingSeconds / totalSeconds) * 100;
  const circumference = 2 * Math.PI * 120; // radius = 120
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const timeDisplay = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className={`relative w-64 h-64 md:w-72 md:h-72 ${mounted ? "animate-fade-up" : "opacity-0"}`}>
      {/* Glow effect */}
      <div 
        className={`absolute inset-4 rounded-full transition-all duration-500 ${
          isWarning 
            ? "bg-gold-warm/20 shadow-[0_0_60px_hsl(var(--gold-warm)/0.4)]" 
            : "bg-forest-medium/10 shadow-[0_0_60px_hsl(var(--forest-medium)/0.3)]"
        } animate-pulse-soft`} 
      />
      
      {/* SVG Ring */}
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 280 280">
        {/* Background ring */}
        <circle
          cx="140"
          cy="140"
          r="120"
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="8"
          className="opacity-30"
        />
        
        {/* Progress ring */}
        <circle
          cx="140"
          cy="140"
          r="120"
          fill="none"
          stroke={isWarning ? "hsl(var(--gold-warm))" : "hsl(var(--forest-medium))"}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-linear"
        />
        
        {/* Inner decorative ring */}
        <circle
          cx="140"
          cy="140"
          r="100"
          fill="none"
          stroke="hsl(var(--sage))"
          strokeWidth="1"
          className="opacity-40"
          strokeDasharray="8 8"
        />
      </svg>
      
      {/* Time display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span 
          className={`font-display text-5xl md:text-6xl font-bold transition-colors duration-500 ${
            isWarning ? "text-gold-warm" : "text-forest-deep"
          }`}
        >
          {timeDisplay}
        </span>
        <span className="text-sm text-muted-foreground mt-2 font-body">
          {isWarning ? "Almost there..." : "Time remaining"}
        </span>
      </div>
    </div>
  );
};

export default CountdownTimer;




