import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Wrench, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const GDPortal = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1b4d3e] via-[#2d5a3d] to-[#1b4d3e] flex items-center justify-center p-6 relative overflow-hidden leaf-pattern">

      {/* Background patterns could be handled by the 'leaf-pattern' class or SVG overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="leaf-pattern-gd" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 5 Q45 20 30 35 Q15 20 30 5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leaf-pattern-gd)" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl w-full text-center"
      >
        {/* Wrench Icon Circle */}
        <div className="mx-auto w-32 h-32 mb-12 relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm border border-white/20" />
          <div className="relative w-20 h-20 rounded-full bg-black/20 flex items-center justify-center border border-white/10">
            <Wrench className="w-10 h-10 text-[#d4a373]" strokeWidth={1.5} />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[#d4a373] font-bold tracking-[0.2em] text-sm uppercase"
          >
            Under Maintenance
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight"
          >
            GD Coming Soon
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium"
          >
            We're currently working on improving the GD Room experience. Please check back soon for updates. In the meantime, you can try our Technical Interview module.
          </motion.p>
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <Button
            onClick={() => navigate('/technical-interview')}
            className="bg-[#d4a373] hover:bg-[#c49363] text-[#1b4d3e] font-bold px-10 py-7 text-lg rounded-none shadow-2xl transition-all group"
          >
            Try Technical Interview Module
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GDPortal;
