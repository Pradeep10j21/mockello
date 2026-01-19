import { motion } from 'framer-motion';

interface VolumeDiagramProps {
  step: number;
  side?: number;
}

const VolumeDiagram = ({ step, side = 4 }: VolumeDiagramProps) => {
  const volume = side * side * side;

  return (
    <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-b from-blue-50 to-green-50 dark:from-green-900/20 dark:to-green-950/30 p-4">
      {/* 3D Cube */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120">
          {/* Back face */}
          <polygon points="45,15 105,15 105,75 45,75" fill="hsl(var(--secondary))" fillOpacity="0.3" stroke="hsl(var(--primary))" strokeWidth="2" />
          {/* Left face */}
          <polygon points="15,45 45,15 45,75 15,105" fill="hsl(var(--secondary))" fillOpacity="0.5" stroke="hsl(var(--primary))" strokeWidth="2" />
          {/* Top face */}
          <polygon points="15,45 45,15 105,15 75,45" fill="hsl(var(--secondary))" fillOpacity="0.7" stroke="hsl(var(--primary))" strokeWidth="2" />
          {/* Front face */}
          <polygon points="15,45 75,45 75,105 15,105" fill="hsl(var(--primary))" fillOpacity="0.2" stroke="hsl(var(--primary))" strokeWidth="2" />
          
          {/* Side label */}
          <text x="60" y="110" textAnchor="middle" className="text-xs font-bold fill-primary">{side} cm</text>
        </svg>
      </motion.div>

      {/* Formula Box */}
      <motion.div
        className="absolute top-4 left-4 p-3 rounded-lg bg-card/95 border border-border shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-xs font-semibold text-muted-foreground mb-1">Volume Formula</div>
        <div className="text-sm font-bold text-foreground">
          {step === 0 && 'V = side × side × side'}
          {step === 1 && `V = ${side} × ${side} × ${side}`}
          {step >= 2 && (
            <span className="text-primary">V = {volume} cm³ ✓</span>
          )}
        </div>
      </motion.div>

      {/* Visual */}
      {step >= 2 && (
        <motion.div
          className="absolute bottom-4 right-4 p-2 rounded-lg bg-card/95 border border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-sm text-center">
            <div className="font-bold text-primary text-lg">{volume} cm³</div>
            <div className="text-xs text-muted-foreground">{side}×{side}×{side} unit cubes</div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default VolumeDiagram;
