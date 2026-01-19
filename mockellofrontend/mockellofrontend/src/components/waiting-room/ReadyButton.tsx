import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Check } from "lucide-react";

interface ReadyButtonProps {
  isReady: boolean;
  isRoomReady: boolean;
  onReady: () => void;
  onEnter: () => void;
}

interface Confetti {
  id: number;
  x: number;
  rotation: number;
  color: string;
}

const ReadyButton = ({ isReady, isRoomReady, onReady, onEnter }: ReadyButtonProps) => {
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [ripple, setRipple] = useState(false);

  const handleReadyClick = () => {
    if (isReady) return;
    
    // Trigger ripple
    setRipple(true);
    setTimeout(() => setRipple(false), 600);
    
    // Create confetti
    const colors = ["#40916C", "#95D5B2", "#D4A574", "#1B4332"];
    const newConfetti: Confetti[] = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 200,
      rotation: Math.random() * 720,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 1000);
    
    onReady();
  };

  if (isRoomReady) {
    return (
      <motion.button
        onClick={onEnter}
        className="btn-forest flex items-center gap-3 text-lg shadow-glow"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
        animate={{ boxShadow: ["0 0 20px hsl(145 50% 41% / 0.3)", "0 0 40px hsl(145 50% 41% / 0.5)", "0 0 20px hsl(145 50% 41% / 0.3)"] }}
        transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
      >
        <Sparkles className="w-5 h-5" />
        Enter GD Room
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    );
  }

  return (
    <div className="relative">
      {/* Confetti particles */}
      <AnimatePresence>
        {confetti.map((c) => (
          <motion.div
            key={c.id}
            className="absolute top-1/2 left-1/2 w-3 h-3 rounded-sm pointer-events-none"
            style={{ backgroundColor: c.color }}
            initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
            animate={{ x: c.x, y: -120, rotate: c.rotation, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      <motion.button
        onClick={handleReadyClick}
        disabled={isReady}
        className={`relative overflow-hidden font-body font-semibold px-10 py-5 rounded-2xl text-lg transition-all duration-300 ${
          isReady
            ? "bg-forest-medium text-primary-foreground cursor-default"
            : "bg-gradient-to-r from-forest-medium to-forest-deep text-primary-foreground hover:shadow-glow"
        }`}
        whileHover={!isReady ? { scale: 1.05, y: -2 } : {}}
        whileTap={!isReady ? { scale: 0.98 } : {}}
        animate={!isReady ? { scale: [1, 1.02, 1] } : {}}
        transition={!isReady ? { scale: { duration: 2, repeat: Infinity } } : {}}
      >
        {/* Ripple effect */}
        <AnimatePresence>
          {ripple && (
            <motion.div
              className="absolute inset-0 bg-white/30 rounded-2xl"
              initial={{ scale: 0.8, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          )}
        </AnimatePresence>

        <span className="relative z-10 flex items-center gap-3">
          {isReady ? (
            <>
              <Check className="w-5 h-5" />
              You're Ready!
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              I'm Ready
            </>
          )}
        </span>
      </motion.button>

      {isReady && !isRoomReady && (
        <motion.p
          className="text-center text-sm text-muted-foreground mt-3 font-body"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Waiting for other warriors to join...
        </motion.p>
      )}
    </div>
  );
};

export default ReadyButton;




