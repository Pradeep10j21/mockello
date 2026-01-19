import { motion } from 'framer-motion';

interface PuzzleDayDiagramProps {
  step: number;
  startDay?: string;
  daysToAdd?: number;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const PuzzleDayDiagram = ({ step, startDay = 'Monday', daysToAdd = 3 }: PuzzleDayDiagramProps) => {
  const startIndex = DAYS.findIndex(d => startDay.startsWith(d.substring(0, 3)));
  const endIndex = (startIndex + daysToAdd) % 7;

  return (
    <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-b from-purple-50 to-green-50 dark:from-green-900/20 dark:to-green-950/30 p-4">
      {/* Calendar Icon */}
      <motion.div
        className="absolute top-4 right-4 text-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        📅
      </motion.div>

      {/* Days of Week */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex gap-2">
          {DAYS.map((day, i) => (
            <motion.div
              key={day}
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold ${
                i === startIndex
                  ? 'bg-primary text-primary-foreground'
                  : i === endIndex && step >= 2
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              {day}
            </motion.div>
          ))}
        </div>
        
        {/* Arrow showing progression */}
        {step >= 1 && (
          <motion.div
            className="flex justify-center mt-4 text-primary font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Monday + {daysToAdd} days = Thursday
          </motion.div>
        )}
      </motion.div>

      {/* Formula Box */}
      <motion.div
        className="absolute top-4 left-4 p-3 rounded-lg bg-card/95 border border-border shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-xs font-semibold text-muted-foreground mb-1">Calendar Puzzle</div>
        <div className="text-sm font-bold text-foreground">
          {step === 0 && 'Count forward from today'}
          {step === 1 && 'Mon → Tue → Wed → Thu'}
          {step >= 2 && (
            <span className="text-primary">Answer: Thursday ✓</span>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PuzzleDayDiagram;
