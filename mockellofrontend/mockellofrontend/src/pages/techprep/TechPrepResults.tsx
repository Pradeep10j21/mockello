import { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import MockelloLogo from "@/components/MockelloLogo";
import {
    ArrowRight,
    Home,
    Trophy,
    Target,
    TrendingUp,
    Lightbulb,
    Sparkles,
    CheckCircle,
    XCircle,
    Lock,
    Zap,
    ChevronRight,
    Award
} from "lucide-react";
import { toast } from "sonner";
import { TOPICS_BY_DEPARTMENT } from "@/data/techprepQuestions";

interface ResultItem {
    id: number;
    question: string;
    section: string;
    selectedAnswer: number | string;
    correctAnswer: number;
    isCorrect: boolean;
    type?: 'mcq' | 'programming';
}

interface ResultState {
    score: number;
    totalQuestions: number;
    results: ResultItem[];
    department: string;
}

const PASS_THRESHOLD = 60;

const TechPrepResults = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as ResultState;
    const [proceedClicks, setProceedClicks] = useState(0);

    if (!state) {
        navigate("/techprep");
        return null;
    }

    const { score, totalQuestions, results, department } = state;
    const percentage = Math.round((score / totalQuestions) * 100);

    // Get sections based on department or fallback to default
    const sections = useMemo(() => {
        return TOPICS_BY_DEPARTMENT[department] || Array.from(new Set(results.map(r => r.section)));
    }, [department, results]);

    const getSectionScore = (section: string) => {
        const sectionResults = results.filter((r) => r.section === section);
        const correct = sectionResults.filter((r) => r.isCorrect).length;
        return { correct, total: sectionResults.length };
    };

    const getPersonalizedMessage = () => {
        if (percentage >= 90) return { title: "Elite Performance! 🏆", message: "You have achieved a mastery level score. Your technical grasp is exceptional and industry-ready.", icon: Trophy, color: "text-green-primary", bg: "from-green-primary/10 to-transparent" };
        if (percentage >= 75) return { title: "High Competence! 🎖️", message: "Great work! You have a solid foundation. A few refinements will make you a top-tier candidate.", icon: Award, color: "text-green-dark", bg: "from-green-dark/10 to-transparent" };
        if (percentage >= 50) return { title: "Solid Effort! 📈", message: "You've crossed most benchmarks. Focused review on your weaker areas will yield great results.", icon: TrendingUp, color: "text-green-muted", bg: "from-green-muted/10 to-transparent" };
        return { title: "Growth Mindset! 🎯", message: "Every assessment is a learning step. Re-visit the core modules to build a stronger base.", icon: Lightbulb, color: "text-amber-600", bg: "from-amber-600/10 to-transparent" };
    };

    const getWeakestSection = () => {
        let weakest = { section: "General", percent: 101 };
        sections.forEach(section => {
            const { correct, total } = getSectionScore(section);
            if (total === 0) return;
            const percent = (correct / total) * 100;
            if (percent < weakest.percent) {
                weakest = { section, percent };
            }
        });
        return weakest.section;
    };

    const getStrongestSection = () => {
        let strongest = { section: "General", percent: -1 };
        sections.forEach(section => {
            const { correct, total } = getSectionScore(section);
            if (total === 0) return;
            const percent = (correct / total) * 100;
            if (percent > strongest.percent) {
                strongest = { section, percent };
            }
        });
        return strongest.section;
    };

    const personalized = getPersonalizedMessage();
    const PersonalizedIcon = personalized.icon;

    return (
        <div className="min-h-screen bg-[#F2F6F0] text-green-dark font-sans selection:bg-green-soft/30">
            {/* Ambient Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className={`absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-green-light/20 blur-[120px]`} />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-green-muted/10 blur-[120px]" />
            </div>

            {/* Header */}
            <header className="relative z-50 border-b border-green-light/30 bg-[#F2F6F0]/80 backdrop-blur-md sticky top-0">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <MockelloLogo size="sm" />
                        <div className="h-8 w-px bg-green-light mx-1" />
                        <span className="text-xl font-black uppercase italic text-green-primary tracking-tight font-serif">Report <span className="text-green-dark">Hub</span></span>
                    </div>
                    <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-green-primary/5 border border-green-light/50 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-green-primary animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-green-muted">{department} Spec</span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 container mx-auto px-6 py-12 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    {/* Hero Score Card */}
                    <div className="relative group overflow-hidden bg-[#E9F2EB] border border-green-light/50 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
                        <div className={`absolute inset-0 bg-gradient-to-br ${personalized.bg} opacity-50 group-hover:opacity-70 transition-opacity`} />

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                            {/* Visual Score */}
                            <div className="relative w-48 h-48 md:w-56 md:h-56">
                                <svg className="w-full h-full -rotate-90">
                                    <circle cx="50%" cy="50%" r="44%" stroke="rgba(15, 44, 31, 0.05)" strokeWidth="12" fill="none" />
                                    <motion.circle
                                        cx="50%"
                                        cy="50%"
                                        r="44%"
                                        stroke="url(#scoreGradient)"
                                        strokeWidth="12"
                                        fill="none"
                                        strokeLinecap="round"
                                        initial={{ strokeDasharray: "0 1000" }}
                                        animate={{ strokeDasharray: `${(percentage / 100) * 100 * 2.76} 1000` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                    />
                                    <defs>
                                        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#0F2C1F" />
                                            <stop offset="100%" stopColor="#39634E" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <motion.span
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="text-6xl md:text-7xl font-black text-green-primary font-serif"
                                    >
                                        {percentage}<span className="text-2xl text-green-dark font-bold font-sans">%</span>
                                    </motion.span>
                                    <span className="text-[10px] font-bold text-green-muted uppercase tracking-[0.2em] mt-1">Total Score</span>
                                </div>
                            </div>

                            {/* Message Container */}
                            <div className="flex-1 text-center md:text-left">
                                <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                                    <div className={`p-3 rounded-2xl bg-white/50 border border-green-light/50 shadow-sm ${personalized.color}`}>
                                        <PersonalizedIcon className="w-8 h-8" />
                                    </div>
                                    <h1 className="text-3xl md:text-5xl font-black text-green-primary tracking-tight leading-none uppercase italic font-serif">
                                        {personalized.title}
                                    </h1>
                                </div>
                                <p className="text-lg md:text-xl text-green-muted mb-8 max-w-xl font-medium leading-relaxed">
                                    {personalized.message}
                                </p>

                                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                    <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-green-primary/10 border border-green-primary/20 text-green-primary text-sm font-bold shadow-sm">
                                        <CheckCircle className="w-4 h-4" /> Strongest: {getStrongestSection()}
                                    </div>
                                    <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-600/20 text-amber-700 text-sm font-bold shadow-sm">
                                        <XCircle className="w-4 h-4" /> Improve: {getWeakestSection()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Breakdown Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Modules */}
                        <div className="bg-[#E9F2EB] border border-green-light/50 rounded-[2rem] p-8 shadow-sm">
                            <h2 className="text-sm font-black text-green-muted uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                                <Target className="w-4 h-4 text-green-primary" /> Module Performance
                            </h2>
                            <div className="space-y-6">
                                {sections.map((section) => {
                                    const { correct, total } = getSectionScore(section);
                                    if (total === 0) return null;
                                    const percent = Math.round((correct / total) * 100);
                                    return (
                                        <div key={section} className="space-y-2">
                                            <div className="flex justify-between items-end px-1">
                                                <span className="text-sm font-bold text-green-primary">{section}</span>
                                                <span className="text-xs font-bold text-green-muted">{correct} / {total}</span>
                                            </div>
                                            <div className="h-3 w-full bg-green-light/20 rounded-full overflow-hidden border border-green-light/30 shadow-inner">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${percent}%` }}
                                                    transition={{ duration: 1, delay: 0.5 }}
                                                    className={`h-full rounded-full bg-gradient-to-r ${percent >= 70 ? 'from-green-primary to-green-dark' :
                                                        percent >= 40 ? 'from-green-dark to-green-muted' : 'from-amber-600 to-amber-500'
                                                        }`}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Summary & Stats */}
                        <div className="bg-[#E9F2EB] border border-green-light/50 rounded-[2rem] p-8 shadow-sm flex flex-col justify-between">
                            <div className="space-y-8">
                                <h2 className="text-sm font-black text-green-muted uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-green-primary" /> Executive Summary
                                </h2>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F2F6F0] border border-green-light/30 transition-shadow hover:shadow-sm">
                                        <span className="text-sm font-bold text-green-muted">Total Questions</span>
                                        <span className="text-xl font-black text-green-primary font-serif">{totalQuestions}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F2F6F0] border border-green-light/30 transition-shadow hover:shadow-sm">
                                        <span className="text-sm font-bold text-green-muted">Correct Answers</span>
                                        <span className="text-xl font-black text-green-primary font-serif">{score}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F2F6F0] border border-green-light/30 transition-shadow hover:shadow-sm">
                                        <span className="text-sm font-bold text-green-muted">Department Rank</span>
                                        <span className="text-xl font-black text-green-dark font-serif">TOP 15%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Hub */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-green-primary/5 rounded-[2.5rem] border border-green-primary/20 shadow-sm">
                        <div className="text-center md:text-left px-4">
                            <h3 className="text-xl font-black text-green-primary uppercase italic tracking-tight font-serif">Assessment Complete!</h3>
                            <p className="text-green-muted text-sm font-medium mt-1">Great effort! You can now proceed to the Group Discussion round.</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => navigate("/student/dashboard")}
                                className="h-14 rounded-2xl border-green-light/50 bg-transparent text-green-muted hover:bg-green-light/10 shadow-sm"
                            >
                                <Home className="w-4 h-4 mr-2" /> Dashboard
                            </Button>

                            <Button
                                size="lg"
                                className="h-14 px-8 rounded-2xl font-black text-lg transition-all bg-[#10B981] text-white shadow-lg shadow-emerald-500/20 hover:bg-[#059669]"
                                onClick={() => navigate("/gd-portal")}
                            >
                                Proceed to GD <ChevronRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default TechPrepResults;
