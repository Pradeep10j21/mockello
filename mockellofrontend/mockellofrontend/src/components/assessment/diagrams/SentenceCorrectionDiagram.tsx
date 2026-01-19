import { motion } from 'framer-motion';

interface SentenceCorrectionDiagramProps {
  step: number;
}

const SentenceCorrectionDiagram = ({ step }: SentenceCorrectionDiagramProps) => {
  const options = [
    { text: "She don't like coffee", isCorrect: false },
    { text: "She doesn't likes coffee", isCorrect: false },
    { text: "She doesn't like coffee", isCorrect: true },
    { text: "She didn't likes coffee", isCorrect: false },
  ];

  return (
    <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-b from-indigo-50 to-green-50 dark:from-green-900/20 dark:to-green-950/30 p-4">
      {/* Grammar Rule */}
      <motion.div
        className="absolute top-4 left-1/2 -translate-x-1/2 p-2 rounded-lg bg-card border border-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-xs font-bold text-center">
          She/He/It + <span className="text-primary">doesn't</span> + base verb
        </div>
      </motion.div>

      {/* Options */}
      <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2">
        {options.map((opt, i) => (
          <motion.div
            key={i}
            className={`p-2 rounded-lg text-xs font-medium text-center ${
              step >= 2 && opt.isCorrect
                ? 'bg-secondary/20 border-2 border-secondary text-secondary'
                : step >= 2 && !opt.isCorrect
                ? 'bg-destructive/10 border border-destructive/30 text-muted-foreground line-through'
                : 'bg-muted/50 border border-border'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            {opt.text}
          </motion.div>
        ))}
      </div>

      {/* Formula Box */}
      <motion.div
        className="absolute top-16 left-4 p-2 rounded-lg bg-card/95 border border-border shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-xs font-bold text-foreground">
          {step === 0 && 'Check subject-verb agreement'}
          {step === 1 && '"She" needs "doesn\'t" (not don\'t)'}
          {step >= 2 && (
            <span className="text-primary">Correct: "doesn't like" ✓</span>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SentenceCorrectionDiagram;
