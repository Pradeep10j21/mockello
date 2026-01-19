import { motion, AnimatePresence } from "framer-motion";
import { Bot, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AIFallbackModalProps {
  open: boolean;
  onContinue: () => void;
}

const AIFallbackModal = ({ open, onContinue }: AIFallbackModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />

          {/* Modal */}
          <motion.div
            className="relative glass-forest rounded-3xl p-8 max-w-md w-full text-center"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Icon */}
            <motion.div
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold to-gold-warm flex items-center justify-center"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-10 h-10 text-primary-foreground" />
            </motion.div>

            {/* Title */}
            <h3 className="font-display text-2xl font-bold text-foreground mb-3">
              Peers Unavailable
            </h3>

            {/* Description */}
            <p className="text-muted-foreground font-body mb-6">
              No worries! We're activating intelligent practice opponents to help you sharpen your skills.
            </p>

            {/* Features */}
            <div className="flex items-center justify-center gap-4 mb-8">
              {["Realistic", "Adaptive", "Challenging"].map((feature, i) => (
                <motion.span
                  key={feature}
                  className="px-3 py-1 bg-muted rounded-full text-xs font-body text-muted-foreground"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  {feature}
                </motion.span>
              ))}
            </div>

            {/* Continue Button */}
            <Button
              onClick={onContinue}
              className="btn-forest w-full flex items-center justify-center gap-2"
            >
              <Bot className="w-5 h-5" />
              Continue to Practice Room
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIFallbackModal;




