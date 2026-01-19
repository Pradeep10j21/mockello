import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star } from "lucide-react";

const seniorTips = [
  { text: "Don't interrupt, just interject!", author: "Rahul, IIM-A '23" },
  { text: "Structure your thoughts > Volume", author: "Priya, ISB '22" },
  { text: "Listen actively. Half the battle is won.", author: "Arjun, XLRI '23" },
  { text: "Quality over quantity. Always.", author: "Sneha, IIM-B '22" },
  { text: "Build on others' points diplomatically", author: "Vikram, FMS '23" },
  { text: "Stay calm. Panic kills clarity.", author: "Ananya, IIM-C '22" },
  { text: "Eye contact matters even virtually", author: "Karthik, SP Jain '23" },
  { text: "Summarize to show leadership", author: "Divya, MDI '22" },
  { text: "Use data points when possible", author: "Rohan, IIFT '23" },
  { text: "First impressions last. Start strong!", author: "Meera, NMIMS '22" },
];

interface Bubble {
  id: number;
  tip: typeof seniorTips[0];
  left: number;
  size: "sm" | "md" | "lg";
  delay: number;
}

const FloatingVoices = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    const createBubble = () => {
      const id = Date.now();
      const randomTip = seniorTips[Math.floor(Math.random() * seniorTips.length)];
      const sizes: ("sm" | "md" | "lg")[] = ["sm", "md", "lg"];
      const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
      
      const newBubble: Bubble = {
        id,
        tip: randomTip,
        left: 5 + Math.random() * 25, // Left side only (5-30%)
        size: randomSize,
        delay: 0,
      };

      setBubbles((prev) => [...prev.slice(-4), newBubble]);
    };

    // Initial bubbles
    const initialBubbles: Bubble[] = seniorTips.slice(0, 3).map((tip, i) => ({
      id: i,
      tip,
      left: 5 + (i * 10),
      size: (["sm", "md", "lg"] as const)[i % 3],
      delay: i * 2,
    }));
    setBubbles(initialBubbles);

    // Add new bubbles periodically
    const interval = setInterval(createBubble, 5000);
    return () => clearInterval(interval);
  }, []);

  const getSizeClasses = (size: "sm" | "md" | "lg") => {
    switch (size) {
      case "sm":
        return "w-40 md:w-48 p-3";
      case "md":
        return "w-48 md:w-56 p-4";
      case "lg":
        return "w-56 md:w-64 p-4";
    }
  };

  return (
    <div className="fixed left-0 bottom-0 w-1/3 h-full overflow-hidden pointer-events-none z-10">
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className={`absolute glass-bubble rounded-2xl cursor-pointer pointer-events-auto ${getSizeClasses(bubble.size)} ${
              hoveredId === bubble.id ? "z-50" : "z-10"
            }`}
            style={{ left: `${bubble.left}%` }}
            initial={{ y: "100vh", opacity: 0, scale: 0.8 }}
            animate={{
              y: hoveredId === bubble.id ? "40vh" : "-120vh",
              opacity: hoveredId === bubble.id ? 1 : 0.9,
              scale: hoveredId === bubble.id ? 1.15 : 1,
            }}
            exit={{ opacity: 0 }}
            transition={{
              y: { duration: hoveredId === bubble.id ? 0 : 18, delay: bubble.delay },
              scale: { duration: 0.3 },
            }}
            onMouseEnter={() => setHoveredId(bubble.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="flex items-start gap-2">
              <Quote className="w-4 h-4 text-forest-medium shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-body text-foreground/90 leading-snug">
                  "{bubble.tip.text}"
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="w-3 h-3 text-gold-warm fill-gold-warm" />
                  <span className="text-xs text-muted-foreground">
                    — {bubble.tip.author}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingVoices;




