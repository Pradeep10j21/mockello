import { motion } from 'framer-motion';

interface SpeedConversionDiagramProps {
  step: number;
  speedKmh?: number;
}

const SpeedConversionDiagram = ({ step, speedKmh = 36 }: SpeedConversionDiagramProps) => {
  const speedMs = (speedKmh * 5) / 18;

  return (
    <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-b from-sky-100 to-green-50 dark:from-green-900/20 dark:to-green-950/30 p-4">
      {/* Sun */}
      <motion.div
        className="absolute top-4 right-8 w-10 h-10 rounded-full bg-yellow-300"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Track */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-green-700 to-green-600" />
      <div className="absolute bottom-10 left-0 right-0 h-2 bg-gray-700" />

      {/* Train */}
      <motion.div
        className="absolute bottom-12 left-1/4 text-4xl"
        animate={{ x: [0, 100, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      >
        🚂
      </motion.div>

      {/* Conversion visualization */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center gap-4 p-3 rounded-xl bg-card/95 border border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{speedKmh}</div>
            <div className="text-xs text-muted-foreground">km/h</div>
          </div>
          
          {step >= 1 && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-lg"
              >
                × 5/18 =
              </motion.div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">{speedMs}</div>
                <div className="text-xs text-muted-foreground">m/s</div>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Formula Box */}
      <motion.div
        className="absolute top-4 left-4 p-2 rounded-lg bg-card/95 border border-border shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-xs font-bold text-foreground">
          {step === 0 && 'km/h to m/s: multiply by 5/18'}
          {step === 1 && `${speedKmh} × 5/18 = ${speedKmh * 5}/18`}
          {step >= 2 && (
            <span className="text-primary">{speedKmh} km/h = {speedMs} m/s ✓</span>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SpeedConversionDiagram;
