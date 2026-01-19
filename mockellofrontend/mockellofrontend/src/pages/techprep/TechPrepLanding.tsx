import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import MockelloLogo from '@/components/MockelloLogo';
import {
    ArrowRight,
    ChevronRight,
    CheckCircle2,
    Code2,
    Terminal,
    Braces,
    Sparkles
} from 'lucide-react';

const TechPrepLanding = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#F2F6F0] text-[#0F2C1F] overflow-hidden font-sans selection:bg-green-soft/30 flex flex-col items-center justify-center relative">
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 z-0 bg-grid-green/10 animate-grid-pulse pointer-events-none opacity-20" />

            {/* Subtle Glow Effects */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-green-light/20 blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-green-muted/10 blur-[100px]" />
            </div>

            <main className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center justify-center text-center py-12">
                {/* Floating Elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <motion.div
                        animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[20%] left-[10%] opacity-10"
                    >
                        <Code2 className="w-16 h-16 text-green-dark" />
                    </motion.div>
                    <motion.div
                        animate={{ y: [0, 20, 0], x: [0, -10, 0], rotate: [0, -5, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-[30%] right-[10%] opacity-10"
                    >
                        <Braces className="w-16 h-16 text-green-dark" />
                    </motion.div>
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[40%] right-[20%] opacity-5"
                    >
                        <Terminal className="w-24 h-24 text-green-dark" />
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
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-900/5 border border-green-900/10 mb-8"
                >
                    <Sparkles className="w-4 h-4 text-green-dark" />
                    <span className="text-xs font-bold text-green-dark flex items-center gap-1.5 uppercase tracking-wider">
                        Trusted by 10,000+ Developers <CheckCircle2 className="w-3.5 h-3.5" />
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
                        Technical MCQ <br /> <span className="text-green-dark italic">Assessment</span>
                    </h1>

                    <h2 className="text-xl md:text-2xl text-green-muted font-medium mb-10 tracking-[0.2em] uppercase italic">
                        Challenge Your Knowledge|
                    </h2>

                    <p className="text-lg text-green-muted mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                        Put your technical knowledge to the test with our comprehensive MCQ assessment.
                        28 carefully crafted questions, 30 minutes, and advanced proctoring to ensure fair evaluation.
                    </p>

                    {/* CTA Button */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <Button
                            size="lg"
                            onClick={() => navigate('/techprep/select')}
                            className="h-20 px-16 text-2xl font-black bg-[#0F2C1F] hover:bg-[#1a402d] text-white rounded-2xl shadow-[0_25px_60px_-15px_rgba(15,44,31,0.4)] transition-all duration-300 flex items-center gap-4 group"
                        >
                            START TEST NOW
                            <ArrowRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Subtle Stats */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold font-serif">28</span>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-green-muted">Items</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold font-serif">30</span>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-green-muted">Minutes</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold font-serif">AI</span>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-green-muted">Proctored</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold font-serif">PDF</span>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-green-muted">Report</span>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TechPrepLanding;
