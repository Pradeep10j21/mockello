import { motion } from "framer-motion";
import { Lightbulb, Star, Target } from "lucide-react";

const tips = [
  {
    type: "tip",
    icon: Lightbulb,
    content: "Start with a definition of the topic to grab early points.",
    author: "Aditya, IIM-A '23",
  },
  {
    type: "review",
    icon: Star,
    content: "The AI fallback is surprisingly tough. Don't underestimate it.",
    author: "Priya, IIM-B '24",
  },
  {
    type: "strategy",
    icon: Target,
    content: "If the group is loud, be the one who summarizes.",
    author: "Rahul, IIM-C '23",
  },
  {
    type: "tip",
    icon: Lightbulb,
    content: "Use PREP: Point, Reason, Example, Point. Always structure.",
    author: "Sneha, ISB '24",
  },
  {
    type: "strategy",
    icon: Target,
    content: "First 2 minutes decide 60% of your impression. Start strong.",
    author: "Karthik, XLRI '23",
  },
  {
    type: "review",
    icon: Star,
    content: "Quality over quantity. 3 solid points beat 10 weak ones.",
    author: "Ananya, FMS '24",
  },
];

const SeniorTipsGrid = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <motion.h3
        className="font-display text-lg md:text-xl font-semibold text-forest-deep text-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Voice of the Seniors
      </motion.h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tips.map((tip, index) => (
          <motion.div
            key={index}
            className="card-forest p-4 hover-lift hover-glow cursor-default animate-breathe group"
            style={{ animationDelay: `${index * 0.5}s` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity overflow-hidden">
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
                style={{ backgroundSize: "200% 100%" }}
              />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  tip.type === "tip" 
                    ? "bg-gold/20" 
                    : tip.type === "review" 
                    ? "bg-forest-medium/20" 
                    : "bg-sage/30"
                }`}>
                  <tip.icon className={`w-4 h-4 ${
                    tip.type === "tip" 
                      ? "text-gold-warm" 
                      : tip.type === "review" 
                      ? "text-forest-medium" 
                      : "text-forest-deep"
                  }`} />
                </div>
                <span className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wide">
                  {tip.type}
                </span>
              </div>

              <p className="font-body text-sm text-foreground mb-3 leading-relaxed">
                "{tip.content}"
              </p>

              <p className="font-body text-xs text-muted-foreground">
                — {tip.author}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SeniorTipsGrid;




