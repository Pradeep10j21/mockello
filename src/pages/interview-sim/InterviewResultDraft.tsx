import React from 'react';
import { motion } from 'framer-motion';
import {
    Trophy, Home, RefreshCw, Target, Brain, Zap,
    CheckCircle, Share2, Download, Sparkles, ChevronRight,
    TrendingUp, Award, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const InterviewResultDraft = () => {
    // MOCK DATA FOR PREVIEW
    const mockResult = {
        structureScore: 85,
        clarityScore: 72,
        confidenceScore: 94,
        overallScore: 84,
        feedback: "You demonstrated strong technical knowledge and maintained excellent composure throughout. However, some answers lacked a structured introduction and conclusion.",
        improvements: [
            "Use the STAR method for behavioral questions.",
            "Avoid diving too deep into technical implementation details unless asked.",
            "Pause briefly before answering to structure your thoughts."
        ]
    };

    const getGrade = (score: number) => {
        if (score >= 90) return { label: 'S+', color: 'text-emerald-400', title: 'Legendary' };
        if (score >= 80) return { label: 'A', color: 'text-emerald-300', title: 'Excellent' };
        if (score >= 60) return { label: 'B', color: 'text-teal-300', title: 'Good' };
        if (score >= 40) return { label: 'C', color: 'text-amber-300', title: 'Average' };
        return { label: 'D', color: 'text-rose-400', title: 'Needs Work' };
    };

    const grade = getGrade(mockResult.overallScore);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="min-h-screen bg-[#05110d] text-[#e0e7e3] font-sans selection:bg-emerald-500/30">

            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]" />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-7xl mx-auto p-6 md:p-10"
            >
                {/* Navbar / Header */}
                <header className="flex justify-between items-center mb-12 border-b border-white/5 pb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-white">Analysis Report</h1>
                            <p className="text-sm text-emerald-400/60 font-medium">Session ID: #8821X • {new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-emerald-100">
                            <Download className="w-4 h-4 mr-2" /> Export PDF
                        </Button>
                        <Button className="bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
                            <Share2 className="w-4 h-4 mr-2" /> Share Profile
                        </Button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Primary Stats Column */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* Hero Score Card */}
                        <motion.div variants={itemVariants} className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0F2C1F] to-[#081a12] border border-white/5 p-8 md:p-12 shadow-2xl">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
                                <Trophy className="w-64 h-64" />
                            </div>

                            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-10">
                                {/* Big Grade Display */}
                                <div className="flex flex-col items-center">
                                    <div className="relative">
                                        <svg className="w-48 h-48 transform -rotate-90">
                                            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-emerald-900/30" />
                                            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={552} strokeDashoffset={552 - (552 * mockResult.overallScore) / 100} className="text-emerald-500 transition-all duration-1000 ease-out" strokeLinecap="round" />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-6xl font-black text-white tracking-tighter">{mockResult.overallScore}</span>
                                            <span className="text-sm font-bold uppercase tracking-widest text-emerald-500/80">Score</span>
                                        </div>
                                    </div>
                                    <div className={`mt-4 px-4 py-1.5 rounded-full border ${grade.color.replace('text', 'border')} bg-white/5`}>
                                        <span className={`font-bold ${grade.color}`}>Grade {grade.label}</span>
                                    </div>
                                </div>

                                {/* Text Summary */}
                                <div className="flex-1 text-center md:text-left">
                                    <h2 className="text-3xl font-bold text-white mb-2">{grade.title} Performance!</h2>
                                    <p className="text-lg text-emerald-100/70 leading-relaxed mb-6">
                                        You're performing better than <span className="text-white font-bold">84%</span> of candidates in this domain. Your technical foundations are solid, but refining your delivery structure could push you to the top tier.
                                    </p>

                                    <div className="grid grid-cols-3 gap-4">
                                        {[
                                            { label: "Structure", score: mockResult.structureScore, icon: Target },
                                            { label: "Clarity", score: mockResult.clarityScore, icon: Brain },
                                            { label: "Confidence", score: mockResult.confidenceScore, icon: Zap }
                                        ].map((stat, i) => (
                                            <div key={i} className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:bg-white/10 transition-colors">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <stat.icon className="w-4 h-4 text-emerald-400" />
                                                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-200/60">{stat.label}</span>
                                                </div>
                                                <div className="text-2xl font-bold text-white">{stat.score}%</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Detailed Metrics */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <motion.div variants={itemVariants} className="bg-[#0b1f17] rounded-3xl p-6 border border-white/5">
                                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
                                    <Brain className="w-5 h-5 text-emerald-500" /> Technical Analysis
                                </h3>
                                <div className="space-y-6">
                                    {[
                                        { label: "Answer Accuracy", val: 88, color: "bg-emerald-500" },
                                        { label: "Terminology Usage", val: 92, color: "bg-teal-500" },
                                        { label: "Problem Solving", val: 75, color: "bg-amber-500" }
                                    ].map((item, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="font-medium text-emerald-100/70">{item.label}</span>
                                                <span className="font-bold text-white">{item.val}%</span>
                                            </div>
                                            {/* Custom Progress Bar since ShadCN default doesn't support color props well */}
                                            <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
                                                <div className={`h-full ${item.color}`} style={{ width: `${item.val}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="bg-[#0b1f17] rounded-3xl p-6 border border-white/5">
                                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
                                    <Zap className="w-5 h-5 text-yellow-500" /> Soft Skills
                                </h3>
                                <div className="space-y-6">
                                    {[
                                        { label: "Communication Flow", val: 82, color: "bg-blue-500" },
                                        { label: "Confidence Level", val: 94, color: "bg-purple-500" },
                                        { label: "Conciseness", val: 68, color: "bg-rose-500" }
                                    ].map((item, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="font-medium text-emerald-100/70">{item.label}</span>
                                                <span className="font-bold text-white">{item.val}%</span>
                                            </div>
                                            <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
                                                <div className={`h-full ${item.color}`} style={{ width: `${item.val}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Sidebar / Improvements */}
                    <div className="lg:col-span-4 space-y-6">
                        <motion.div variants={itemVariants} className="h-full bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-3xl p-8 flex flex-col shadow-xl">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-emerald-400" />
                                Action Plan
                            </h3>

                            <div className="space-y-6 flex-1">
                                <div className="p-4 rounded-2xl bg-emerald-900/10 border border-emerald-500/20">
                                    <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <Award className="w-4 h-4" /> Strongest Points
                                    </h4>
                                    <ul className="space-y-3">
                                        <li className="flex gap-3 text-sm text-emerald-100/80">
                                            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                                            Excellent command over core concepts.
                                        </li>
                                        <li className="flex gap-3 text-sm text-emerald-100/80">
                                            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                                            Clear and confident voice tone.
                                        </li>
                                    </ul>
                                </div>

                                <div className="p-4 rounded-2xl bg-amber-900/10 border border-amber-500/20">
                                    <h4 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4" /> Needs Focus
                                    </h4>
                                    <ul className="space-y-4">
                                        {mockResult.improvements.map((imp, i) => (
                                            <li key={i} className="flex gap-3 text-sm text-emerald-100/80">
                                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                                {imp}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5">
                                <Button className="w-full h-12 text-lg font-semibold bg-white text-black hover:bg-gray-200">
                                    Start Practice Drill <ChevronRight className="w-5 h-5 ml-2" />
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default InterviewResultDraft;
