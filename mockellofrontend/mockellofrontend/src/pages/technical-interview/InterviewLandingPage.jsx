import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Mic,
  Video,
  Shield,
  Cpu,
  ArrowRight,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Database,
  Network
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import MockelloLogo from '@/components/MockelloLogo';

function InterviewLandingPage() {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/technical-interview/select');
  };

  return (
    <div className="min-h-screen bg-[#F2F6F0] text-[#0F2C1F] overflow-hidden font-sans selection:bg-green-soft/30 flex flex-col items-center justify-center relative">
      {/* Ambient Background Grid */}
      <div className="absolute inset-0 z-0 bg-grid-green/10 animate-grid-pulse pointer-events-none opacity-20" />

      {/* Subtle Glow Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-green-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-600/10 blur-[150px]" />
      </div>

      <main className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center justify-center text-center py-12">
        {/* Floating Elements (Circuit/Data Theme) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ y: [0, -30, 0], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[30%] left-[15%] opacity-10"
          >
            <Cpu className="w-20 h-20 text-green-600" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 30, 0], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[20%] right-[15%] opacity-10"
          >
            <Network className="w-20 h-20 text-emerald-600" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] right-[25%] opacity-5"
          >
            <Database className="w-24 h-24 text-green-600" />
          </motion.div>
        </div>

        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-3 rounded-2xl bg-white shadow-xl shadow-green-900/5 ring-1 ring-green-900/5"
        >
          <MockelloLogo size="md" />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-600/5 border border-green-600/10 mb-8 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-green-600" />
          <span className="text-xs font-bold text-green-600 flex items-center gap-1.5 uppercase tracking-wider">
            AI-Powered Voice Integration <CheckCircle2 className="w-3.5 h-3.5" />
          </span>
        </motion.div>

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-8xl font-black text-green-primary mb-4 tracking-tight leading-[1] font-serif">
            Technical Voice <br /> <span className="text-green-600 italic">Simulation</span>
          </h1>

          <h2 className="text-xl md:text-2xl text-green-600/60 font-medium mb-10 tracking-[0.2em] uppercase italic">
            Real-time AI Evaluation|
          </h2>

          <p className="text-lg text-green-muted mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Experience a realistic technical interview with our AI interviewer.
            Real-time transcription, sentiment analysis, and detailed technical feedback to sharpen your skills.
          </p>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Button
              size="lg"
              onClick={handleStartTest}
              className="h-20 px-16 text-2xl font-black bg-[#0F2C1F] hover:bg-[#1a402d] text-white rounded-2xl shadow-[0_25px_60px_-15px_rgba(15,44,31,0.4)] transition-all duration-300 flex items-center gap-4 group"
            >
              START INTERVIEW NOW
              <ArrowRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Icons Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-12 opacity-60">
          <div className="flex flex-col items-center gap-2">
            <Mic className="w-8 h-8 text-green-600" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-green-muted">Voice Analytics</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Video className="w-8 h-8 text-green-600" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-green-muted">Video Stream</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Shield className="w-8 h-8 text-green-600" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-green-muted">Secure Room</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ArrowRight className="w-8 h-8 text-green-600" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-green-muted">Direct Start</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default InterviewLandingPage;

