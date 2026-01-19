import { motion } from 'framer-motion';

interface TimeWorkDiagramProps {
  step: number;
  totalDays?: number;
}

const TimeWorkDiagram = ({ step, totalDays = 12 }: TimeWorkDiagramProps) => {
  return (
    <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-b from-sky-100 to-green-50 dark:from-green-900/20 dark:to-green-950/30 p-4">
      {/* Worker Icon */}
      <motion.div
        className="absolute left-8 top-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl">
          👷
        </div>
        <div className="text-center text-xs font-bold mt-1">Person A</div>
      </motion.div>

      {/* Days Grid */}
      <motion.div
        className="absolute right-4 top-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-sm font-semibold mb-2">Total Work = 1 Unit</div>
        <div className="grid grid-cols-4 gap-1">
          {Array.from({ length: totalDays }).map((_, i) => (
            <motion.div
              key={i}
              className={`w-7 h-7 rounded flex items-center justify-center text-xs font-bold ${
                step >= 2 && i === 0 ? 'bg-primary text-primary-foreground' : 'bg-secondary/30 text-secondary-foreground'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.05 * i }}
            >
              {i + 1}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Formula Box */}
      <motion.div
        className="absolute bottom-4 left-4 p-3 rounded-lg bg-card/95 border border-border shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-xs font-semibold text-muted-foreground mb-1">Time & Work Formula</div>
        <div className="text-sm font-bold text-foreground">
          {step === 0 && 'Work per day = 1 ÷ Total days'}
          {step === 1 && `A takes ${totalDays} days → Work per day = ?`}
          {step >= 2 && (
            <span className="text-primary">Work per day = 1/{totalDays} ✓</span>
          )}
        </div>
      </motion.div>

      {/* Pie Chart */}
      {step >= 2 && (
        <motion.div
          className="absolute bottom-4 right-4"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="25" fill="hsl(var(--secondary))" opacity="0.3" />
            <path d="M 30 30 L 30 5 A 25 25 0 0 1 50 44 Z" fill="hsl(var(--primary))" />
            <text x="30" y="33" textAnchor="middle" className="text-xs font-bold fill-foreground">1/{totalDays}</text>
          </svg>
        </motion.div>
      )}
    </div>
  );
};

export default TimeWorkDiagram;
