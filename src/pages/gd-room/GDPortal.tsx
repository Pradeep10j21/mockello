import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Wrench, ArrowRight } from "lucide-react";
import LeafParticles from "@/components/waiting-room/LeafParticles";

const GDPortal = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero animate-gradient-shift overflow-hidden relative">
      {/* Background elements */}
      <LeafParticles />

      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-center max-w-6xl mx-auto">
          {/* Logo Removed */}
        </div>
      </motion.header>

      {/* Hero Section - Maintenance Message */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-canopy" />

        {/* SVG Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="leaf-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M30 5 Q45 20 30 35 Q15 20 30 5" fill="currentColor" className="text-primary-foreground" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-8 pt-24">
          <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
            {/* Maintenance Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <div className="absolute inset-0 rounded-full bg-gold/20 animate-pulse-soft" />
                <div className="absolute inset-4 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center">
                  <Wrench className="w-16 h-16 md:w-20 md:h-20 text-gold" strokeWidth={1.5} />
                </div>
              </div>
            </motion.div>

            {/* Maintenance Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gold mb-4 uppercase tracking-wider">
                Under Maintenance
              </h2>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                GD Room Temporarily Unavailable
              </h1>
              <p className="font-body text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                We're currently working on improving the GD Room experience. 
                Please check back soon for updates. In the meantime, you can try our AI Interview module.
              </p>
              
              {/* Button to AI Interview */}
              <motion.button
                onClick={() => navigate("/interview")}
                className="btn-gold text-lg md:text-xl shadow-glow-gold inline-flex items-center gap-3 px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try AI Interview Module
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GDPortal;




