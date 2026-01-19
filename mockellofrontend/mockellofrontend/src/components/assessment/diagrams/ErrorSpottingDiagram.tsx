import { motion } from 'framer-motion';

interface ErrorSpottingDiagramProps {
  step: number;
}

const ErrorSpottingDiagram = ({ step }: ErrorSpottingDiagramProps) => {
  const parts = [
    { text: 'He', label: 'A', hasError: false },
    { text: 'go', label: 'B', hasError: true },
    { text: 'to school', label: 'C', hasError: false },
    { text: 'every day', label: 'D', hasError: false },
  ];

  return (
    <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-b from-rose-50 to-green-50 dark:from-green-900/20 dark:to-green-950/30 p-4">
      {/* Magnifying glass */}
      <motion.div
        className="absolute top-4 right-4 text-3xl"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        🔍
      </motion.div>

      {/* Sentence parts */}
      <motion.div
        className="absolute top-12 left-1/2 -translate-x-1/2 p-4 rounded-xl bg-card border-2 border-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex gap-3 flex-wrap justify-center">
          {parts.map((part, i) => (
            <motion.div
              key={i}
              className={`px-3 py-2 rounded-lg text-center ${
                step >= 2 && part.hasError
                  ? 'bg-destructive/20 border-2 border-destructive'
                  : 'bg-muted/50 border border-border'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="text-xs text-muted-foreground mb-1">{part.label}</div>
              <div className={`font-bold ${step >= 2 && part.hasError ? 'text-destructive' : ''}`}>
                {part.text}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Correction */}
      {step >= 2 && (
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 p-3 rounded-xl bg-secondary/20 border border-secondary"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-sm font-bold text-center">
            <span className="text-destructive line-through">go</span>
            <span className="mx-2">→</span>
            <span className="text-secondary">goes</span>
            <span className="ml-2 text-primary">✓</span>
          </div>
        </motion.div>
      )}

      {/* Formula Box */}
      <motion.div
        className="absolute top-4 left-4 p-2 rounded-lg bg-card/95 border border-border shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-xs font-bold text-foreground">
          {step === 0 && 'Find the grammatical error'}
          {step === 1 && '"He" is 3rd person singular'}
          {step >= 2 && (
            <span className="text-primary">Error in part B ✓</span>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorSpottingDiagram;
