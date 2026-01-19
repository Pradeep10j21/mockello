import { motion } from 'framer-motion';

interface BloodRelationDiagramProps {
  step: number;
}

const BloodRelationDiagram = ({ step }: BloodRelationDiagramProps) => {
  return (
    <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-br from-purple-50 to-green-50 dark:from-green-900/20 dark:to-green-950/30 p-4">
      {/* Family Tree */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <svg width="280" height="120" viewBox="0 0 280 120">
          {/* Connection lines */}
          <motion.line
            x1="60" y1="60" x2="140" y2="60"
            stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: step >= 1 ? 1 : 0 }}
          />
          <motion.line
            x1="140" y1="60" x2="220" y2="60"
            stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: step >= 2 ? 1 : 0 }}
          />

          {/* Person A */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <circle cx="60" cy="60" r="25" fill="hsl(var(--primary))" />
            <text x="60" y="65" textAnchor="middle" className="text-lg font-bold fill-primary-foreground">A</text>
            <text x="60" y="100" textAnchor="middle" className="text-xs font-bold fill-foreground">Brother</text>
          </motion.g>

          {/* Person B */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: step >= 1 ? 1 : 0.3 }}>
            <circle cx="140" cy="60" r="25" fill="hsl(var(--secondary))" />
            <text x="140" y="65" textAnchor="middle" className="text-lg font-bold fill-secondary-foreground">B</text>
            <text x="140" y="100" textAnchor="middle" className="text-xs font-bold fill-foreground">Sister</text>
          </motion.g>

          {/* Person C */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: step >= 2 ? 1 : 0.3 }}>
            <circle cx="220" cy="60" r="25" fill="hsl(var(--accent))" />
            <text x="220" y="65" textAnchor="middle" className="text-lg font-bold fill-accent-foreground">C</text>
            <text x="220" y="100" textAnchor="middle" className="text-xs font-bold fill-foreground">Sibling</text>
          </motion.g>
        </svg>
      </motion.div>

      {/* Formula Box */}
      <motion.div
        className="absolute top-4 left-4 p-3 rounded-lg bg-card/95 border border-border shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-xs font-semibold text-muted-foreground mb-1">Blood Relation</div>
        <div className="text-sm font-bold text-foreground">
          {step === 0 && 'A is brother of B'}
          {step === 1 && 'B is sister of C'}
          {step >= 2 && (
            <span className="text-primary">A is brother of C ✓</span>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default BloodRelationDiagram;
