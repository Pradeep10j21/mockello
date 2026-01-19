import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Reaction {
  id: string;
  emoji: string;
  x: number;
}

interface ReactionOverlayProps {
  trigger: { emoji: string; timestamp: number } | null;
}

export function ReactionOverlay({ trigger }: ReactionOverlayProps) {
  const [reactions, setReactions] = useState<Reaction[]>([]);

  useEffect(() => {
    if (trigger) {
      const newReaction: Reaction = {
        id: `${Date.now()}-${Math.random()}`,
        emoji: trigger.emoji,
        x: 20 + Math.random() * 60, // Random position between 20% and 80%
      };

      setReactions((prev) => [...prev, newReaction]);

      // Remove reaction after animation
      setTimeout(() => {
        setReactions((prev) => prev.filter((r) => r.id !== newReaction.id));
      }, 2000);
    }
  }, [trigger]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      <AnimatePresence>
        {reactions.map((reaction) => (
          <motion.div
            key={reaction.id}
            initial={{ opacity: 0, y: 100, scale: 0 }}
            animate={{ opacity: 1, y: -200, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            style={{ left: `${reaction.x}%` }}
            className="absolute bottom-20 text-4xl"
          >
            {reaction.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}




