import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import MockelloLogo from '@/components/MockelloLogo';
import {
    ArrowRight,
    ArrowLeft,
    Clock,
    AlertCircle,
    CheckCircle2,
    XCircle,
    Monitor,
    Wifi,
    BookOpen,
    Database,
    Cpu,
    Globe,
    Zap,
    Scale,
    PieChart,
    Users,
    TrendingUp
} from 'lucide-react';
import { TOPICS_BY_DEPARTMENT } from '@/data/techprepQuestions';

const TechPrepInstructions = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { department } = location.state || { department: 'CSE/IT' };

    const rules = [
        { icon: Clock, text: 'Total time: 30 minutes for the assessment', type: 'info' },
        { icon: AlertCircle, text: 'You cannot go back once a question is answered', type: 'warning' },
        { icon: CheckCircle2, text: 'Multiple choice format with single correct answer', type: 'info' },
        { icon: XCircle, text: 'Test auto-submits when time expires', type: 'warning' },
        { icon: Monitor, text: 'Tab switching is strictly monitored (max 5)', type: 'info' },
        { icon: Wifi, text: 'Stable internet connection is required', type: 'info' },
    ];

    const getIconForTopic = (topic: string) => {
        const lower = topic.toLowerCase();
        if (lower.includes('dbms') || lower.includes('database')) return Database;
        if (lower.includes('os') || lower.includes('operating')) return Cpu;
        if (lower.includes('network')) return Globe;
        if (lower.includes('account') || lower.includes('tax')) return Scale;
        if (lower.includes('manage') || lower.includes('hr')) return Users;
        if (lower.includes('market') || lower.includes('trend')) return TrendingUp;
        if (lower.includes('eco') || lower.includes('finance')) return PieChart;
        return BookOpen;
    };

    const topics = TOPICS_BY_DEPARTMENT[department] || ["General Aptitude", "Logic", "Communication"];

    return (
        <div className="min-h-screen bg-[#F2F6F0] text-green-dark font-sans selection:bg-green-soft/30">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-green-light/20 blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-green-muted/10 blur-[100px]" />
            </div>

            {/* Header */}
            <header className="relative z-50 border-b border-green-light/30 bg-[#F2F6F0]/80 backdrop-blur-md sticky top-0">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <MockelloLogo size="sm" />
                        <div className="h-6 w-px bg-green-light mx-2" />
                        <span className="text-sm font-bold tracking-tight text-green-primary uppercase italic">
                            TechPrep <span className="text-green-muted font-normal">| {department}</span>
                        </span>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/techprep/select')}
                        className="text-green-muted hover:text-green-primary hover:bg-green-light/20"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                </div>
            </header>

            <main className="relative z-10 container mx-auto px-6 py-12 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-black text-green-primary mb-4 tracking-tight font-serif">
                            Critical <span className="text-green-dark italic">Instructions</span>
                        </h1>
                        <p className="text-green-muted text-lg font-medium">Please review the structure and guidelines before you begin.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Section 1: Structure */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-green-primary/80 mb-2">
                                <div className="h-px flex-1 bg-green-light/50" />
                                Curriculum Overview
                                <div className="h-px flex-1 bg-green-light/50" />
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {topics.map((topic, i) => {
                                    const Icon = getIconForTopic(topic);
                                    return (
                                        <motion.div
                                            key={topic}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="p-5 rounded-2xl bg-[#E9F2EB] border border-green-light/50 flex items-center gap-4 group hover:shadow-sm transition-all"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-green-soft/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Icon className="w-6 h-6 text-green-dark" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-green-primary text-lg">{topic}</h3>
                                                <p className="text-xs text-green-muted font-medium tracking-wide">Standard Industry Module</p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            <div className="p-6 rounded-2xl bg-green-primary/5 border border-green-light/50">
                                <div className="flex items-start gap-4">
                                    <AlertCircle className="w-6 h-6 text-green-dark shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-green-primary mb-1">Time Awareness</h4>
                                        <p className="text-sm text-green-muted leading-relaxed font-medium">
                                            The assessment is designed to be challenging under time pressure. Pace yourself accordingly.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Rules */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-600/80 mb-2">
                                <div className="h-px flex-1 bg-amber-600/20" />
                                Proctored Rules
                                <div className="h-px flex-1 bg-amber-600/20" />
                            </div>

                            <div className="space-y-3">
                                {rules.map((rule, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-start gap-4 p-4 rounded-xl border ${rule.type === 'warning'
                                            ? 'bg-amber-500/5 border-amber-600/20'
                                            : 'bg-[#E9F2EB] border-green-light/50 shadow-sm'
                                            }`}
                                    >
                                        <rule.icon className={`w-5 h-5 mt-0.5 shrink-0 ${rule.type === 'warning' ? 'text-amber-600' : 'text-green-dark'
                                            }`} />
                                        <span className="text-sm font-semibold text-green-muted">{rule.text}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Button
                                        size="lg"
                                        onClick={() => navigate('/techprep/test', { state: { department } })}
                                        className="w-full h-16 bg-[#0F2C1F] hover:bg-[#1a402d] text-white font-black text-xl rounded-2xl shadow-xl shadow-green-900/20 transition-all group"
                                    >
                                        BEGIN ASSESSMENT
                                        <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </motion.div>
                                <p className="text-center text-[10px] uppercase font-bold tracking-[0.3em] text-green-muted mt-6">
                                    Secure Connection Active
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default TechPrepInstructions;
