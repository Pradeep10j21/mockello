import { motion } from 'framer-motion';

interface PerimeterDiagramProps {
  step: number;
  side?: number;
}

const PerimeterDiagram = ({ step, side = 8 }: PerimeterDiagramProps) => {
  const perimeter = side * 4;

  return (
    <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-green-50 dark:from-green-900/20 dark:to-green-950/30 p-4">
      {/* Square */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <svg width="140" height="140" viewBox="0 0 140 140">
          <motion.rect
            x="20" y="20" width="100" height="100"
            fill="hsl(var(--secondary))" fillOpacity="0.3"
            stroke="hsl(var(--primary))"
            strokeWidth="4"
          />
          {/* Side labels */}
          <text x="70" y="15" textAnchor="middle" className="text-sm font-bold fill-primary">{side} cm</text>
          <text x="125" y="75" textAnchor="middle" className="text-sm font-bold fill-primary">{side}</text>
          <text x="70" y="135" textAnchor="middle" className="text-sm font-bold fill-primary">{side}</text>
          <text x="10" y="75" textAnchor="middle" className="text-sm font-bold fill-primary">{side}</text>
        </svg>
      </motion.div>

      {/* Formula Box */}
      <motion.div
        className="absolute top-4 left-4 p-3 rounded-lg bg-card/95 border border-border shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-xs font-semibold text-muted-foreground mb-1">Perimeter Formula</div>
        <div className="text-sm font-bold text-foreground">
          {step === 0 && 'P = 4 × side'}
          {step === 1 && `P = 4 × ${side}`}
          {step >= 2 && (
            <span className="text-primary">P = {perimeter} cm ✓</span>
          )}
        </div>
      </motion.div>

      {/* Visual breakdown */}
      {step >= 2 && (
        <motion.div
          className="absolute bottom-4 right-4 p-2 rounded-lg bg-card/95 border border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center gap-1 text-sm">
            <span className="px-2 py-1 bg-secondary/30 rounded">{side}</span>
            <span>+</span>
            <span className="px-2 py-1 bg-secondary/30 rounded">{side}</span>
            <span>+</span>
            <span className="px-2 py-1 bg-secondary/30 rounded">{side}</span>
            <span>+</span>
            <span className="px-2 py-1 bg-secondary/30 rounded">{side}</span>
            <span>=</span>
            <span className="px-2 py-1 bg-primary text-primary-foreground rounded font-bold">{perimeter}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PerimeterDiagram;
