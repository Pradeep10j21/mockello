import { motion } from 'framer-motion';

interface TrainDiagramProps {
  step: number;
  originalSpeed?: number;
  newSpeed?: number;
  distance?: number;
}

const TrainDiagram = ({ step, originalSpeed = 60, newSpeed = 80, distance = 240 }: TrainDiagramProps) => {
  return (
    <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-b from-sky-100 to-green-50 dark:from-green-900/20 dark:to-green-950/30">
      {/* Sun */}
      <motion.div
        className="absolute top-4 right-8 w-12 h-12 rounded-full bg-yellow-300"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ boxShadow: '0 0 30px rgba(250, 204, 21, 0.5)' }}
      />

      {/* Ground/Track */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-700 to-green-600" />

      {/* Railway Track */}
      <div className="absolute bottom-12 left-0 right-0 h-3 bg-gray-700">
        <div className="absolute inset-0 flex items-center justify-between px-2">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="w-1 h-4 bg-amber-800" />
          ))}
        </div>
      </div>

      {/* Distance Label */}
      <motion.div
        className="absolute bottom-28 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-16 bg-foreground/50" />
          <span className="px-3 py-1 rounded-full bg-card text-foreground text-sm font-bold border border-border">
            {distance} km
          </span>
          <div className="h-0.5 w-16 bg-foreground/50" />
        </div>
      </motion.div>

      {/* Train */}
      <motion.div
        className="absolute bottom-14"
        initial={{ left: '10%' }}
        animate={{ left: step >= 3 ? '75%' : step >= 1 ? '40%' : '10%' }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      >
        <svg width="80" height="50" viewBox="0 0 80 50">
          <rect x="5" y="15" width="60" height="25" rx="3" fill="hsl(var(--primary))" />
          <rect x="45" y="5" width="20" height="35" rx="3" fill="hsl(var(--primary))" className="opacity-80" />
          <rect x="10" y="20" width="10" height="10" rx="2" fill="hsl(var(--background))" />
          <rect x="25" y="20" width="10" height="10" rx="2" fill="hsl(var(--background))" />
          <circle cx="15" cy="42" r="6" fill="#374151" />
          <circle cx="35" cy="42" r="6" fill="#374151" />
          <circle cx="55" cy="42" r="6" fill="#374151" />
        </svg>

        <motion.div
          className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-accent text-accent-foreground text-xs font-bold whitespace-nowrap"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {step >= 2 ? `${newSpeed} km/h` : `${originalSpeed} km/h`}
        </motion.div>
      </motion.div>

      {/* Formula Box */}
      <motion.div
        className="absolute top-4 left-4 p-3 rounded-lg bg-card/95 border border-border shadow-lg"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="text-xs font-semibold text-muted-foreground mb-1">Formula</div>
        <div className="text-sm font-bold text-foreground">
          {step === 0 && 'Speed = Distance ÷ Time'}
          {step === 1 && `Speed = ${distance} ÷ 4 = ${originalSpeed} km/h`}
          {step === 2 && `New Speed = ${originalSpeed} + 20 = ${newSpeed} km/h`}
          {step >= 3 && `Time = ${distance} ÷ ${newSpeed} = 3 hours`}
        </div>
      </motion.div>
    </div>
  );
};

export default TrainDiagram;
