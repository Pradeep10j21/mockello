import { motion } from 'framer-motion';

interface ProfitLossDiagramProps {
  step: number;
  costPrice?: number;
  sellingPrice?: number;
}

const ProfitLossDiagram = ({ step, costPrice = 400, sellingPrice = 500 }: ProfitLossDiagramProps) => {
  const profit = sellingPrice - costPrice;
  const profitPercent = (profit / costPrice) * 100;

  return (
    <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-b from-amber-50 to-green-50 dark:from-green-900/20 dark:to-green-950/30 p-4">
      {/* Shop Icon */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-4 text-4xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🏪
      </motion.div>

      {/* Price boxes */}
      <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-8">
        <motion.div
          className="p-3 rounded-xl bg-card border-2 border-muted shadow-lg text-center"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="text-xs text-muted-foreground mb-1">Cost Price (CP)</div>
          <div className="text-2xl font-bold text-foreground">₹{costPrice}</div>
        </motion.div>

        {step >= 1 && (
          <motion.div
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-2xl">→</div>
            <div className="text-sm font-bold text-primary">+₹{profit}</div>
          </motion.div>
        )}

        <motion.div
          className="p-3 rounded-xl bg-card border-2 border-primary shadow-lg text-center"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="text-xs text-muted-foreground mb-1">Selling Price (SP)</div>
          <div className="text-2xl font-bold text-primary">₹{sellingPrice}</div>
        </motion.div>
      </div>

      {/* Formula Box */}
      <motion.div
        className="absolute top-4 left-4 p-3 rounded-lg bg-card/95 border border-border shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-xs font-semibold text-muted-foreground mb-1">Profit Formula</div>
        <div className="text-sm font-bold text-foreground">
          {step === 0 && 'Profit% = (Profit/CP) × 100'}
          {step === 1 && `Profit = ${sellingPrice} - ${costPrice} = ₹${profit}`}
          {step >= 2 && (
            <span className="text-primary">Profit% = {profitPercent}% ✓</span>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProfitLossDiagram;
