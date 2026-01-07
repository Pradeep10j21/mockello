import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Trophy, Target, TrendingUp, Lightbulb, Sparkles, CheckCircle, XCircle, RefreshCw, Lock } from "lucide-react";
import { toast } from "sonner";

interface ResultItem {
    id: number;
    question: string;
    section: string;
    selectedAnswer: number;
    correctAnswer: number;
    isCorrect: boolean;
}

interface ResultState {
    score: number;
    totalQuestions: number;
    results: ResultItem[];
}

const PASS_THRESHOLD = 60; // 60% required to pass

const TechPrepResults = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as ResultState;
    const [proceedClicks, setProceedClicks] = useState(0);

    if (!state) {
        navigate("/techprep");
        return null;
    }

    const { score, totalQuestions, results } = state;
    const percentage = Math.round((score / totalQuestions) * 100);

    const sections = ["DBMS", "OS", "Networking", "DSA"];

    const getSectionScore = (section: string) => {
        const sectionResults = results.filter((r) => r.section === section);
        const correct = sectionResults.filter((r) => r.isCorrect).length;
        return { correct, total: sectionResults.length };
    };

    // Personalized feedback based on score
    const getPersonalizedMessage = () => {
        if (percentage >= 90) return { title: "Outstanding! 🌟", message: "You've demonstrated exceptional mastery of technical fundamentals. You're well-prepared for advanced technical interviews!", icon: Trophy, color: "text-yellow-500" };
        if (percentage >= 75) return { title: "Great Job! 💪", message: "Your technical foundation is strong. Focus on the weaker sections to become even more competitive.", icon: TrendingUp, color: "text-emerald-500" };
        if (percentage >= 50) return { title: "Good Effort! 📚", message: "You're on the right track. Consistent practice in fundamentals will significantly boost your score.", icon: Target, color: "text-blue-500" };
        return { title: "Keep Learning! 🎯", message: "Don't be discouraged! Every expert was once a beginner. Review the basics and practice regularly.", icon: Lightbulb, color: "text-orange-500" };
    };

    const getWeakestSection = () => {
        let weakest = { section: "", percent: 100 };
        sections.forEach(section => {
            const { correct, total } = getSectionScore(section);
            const percent = total ? (correct / total) * 100 : 0;
            if (percent < weakest.percent) {
                weakest = { section, percent };
            }
        });
        return weakest.section;
    };

    const getStrongestSection = () => {
        let strongest = { section: "", percent: 0 };
        sections.forEach(section => {
            const { correct, total } = getSectionScore(section);
            const percent = total ? (correct / total) * 100 : 0;
            if (percent > strongest.percent) {
                strongest = { section, percent };
            }
        });
        return strongest.section;
    };

    const personalized = getPersonalizedMessage();
    const PersonalizedIcon = personalized.icon;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
            {/* Header */}
            <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-slate-800">Technical Assessment Result</span>
                        </div>
                        <span className="text-sm text-slate-400">Mockello</span>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-10">
                <div className="max-w-4xl mx-auto space-y-8">

                    {/* PERSONALIZED HERO CARD */}
                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 flex flex-col md:flex-row items-center gap-8">
                        {/* Score Circle */}
                        <div className="relative w-44 h-44 flex-shrink-0">
                            <svg className="w-full h-full -rotate-90">
                                <circle cx="88" cy="88" r="76" stroke="#e2e8f0" strokeWidth="14" fill="none" />
                                <circle
                                    cx="88"
                                    cy="88"
                                    r="76"
                                    stroke={percentage >= 75 ? "#10b981" : percentage >= 50 ? "#3b82f6" : "#f59e0b"}
                                    strokeWidth="14"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeDasharray={`${(percentage / 100) * 478} 478`}
                                    className="transition-all duration-1000"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-5xl font-black text-slate-800">{score}</span>
                                <span className="text-sm text-slate-500">of {totalQuestions}</span>
                            </div>
                        </div>

                        {/* Personalized Message */}
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                                <PersonalizedIcon className={`w-8 h-8 ${personalized.color}`} />
                                <h1 className="text-3xl font-bold text-slate-800">{personalized.title}</h1>
                            </div>
                            <p className="text-lg text-slate-600 mb-4">{personalized.message}</p>
                            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
                                    <CheckCircle className="w-4 h-4" /> Strongest: {getStrongestSection()}
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-medium">
                                    <XCircle className="w-4 h-4" /> Needs Work: {getWeakestSection()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* SECTION BREAKDOWN */}
                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
                        <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                            <Target className="w-5 h-5 text-emerald-600" /> Section Breakdown
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {sections.map((section) => {
                                const { correct, total } = getSectionScore(section);
                                const percent = total ? Math.round((correct / total) * 100) : 0;
                                const isStrong = percent >= 70;

                                return (
                                    <div key={section} className={`rounded-2xl p-5 text-center border transition-all ${isStrong ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-100'}`}>
                                        <span className={`text-sm font-semibold ${isStrong ? 'text-emerald-700' : 'text-slate-600'}`}>{section}</span>

                                        <div className={`mt-3 text-2xl font-bold ${isStrong ? 'text-emerald-600' : 'text-slate-700'}`}>
                                            {correct}/{total}
                                        </div>

                                        <div className="mt-3 h-2 bg-slate-200 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-700 ${isStrong ? 'bg-emerald-500' : 'bg-slate-400'}`}
                                                style={{ width: `${percent}%` }}
                                            />
                                        </div>
                                        <span className="text-xs text-slate-400 mt-1 block">{percent}%</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* TIPS CARD */}
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 text-white shadow-xl">
                        <div className="flex items-start gap-4">
                            <Lightbulb className="w-8 h-8 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold mb-2">Pro Tip for Your Next Round</h3>
                                <p className="text-emerald-100">
                                    {percentage >= 70
                                        ? "You're ready for the Group Discussion! Focus on communicating your ideas clearly and listening actively to others."
                                        : `Before proceeding, we recommend reviewing ${getWeakestSection()} concepts. Strong fundamentals will give you confidence in technical discussions.`
                                    }
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex flex-wrap justify-center gap-4 pt-4">
                        <Button variant="outline" size="lg" onClick={() => navigate("/student/dashboard")} className="rounded-xl">
                            <Home className="w-4 h-4 mr-2" />
                            Back to Dashboard
                        </Button>

                        <Button
                            variant="secondary"
                            size="lg"
                            className="rounded-xl"
                            onClick={() => navigate("/techprep")}
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Retake Test
                        </Button>

                        <Button
                            size="lg"
                            className={`rounded-xl shadow-lg transition-all ${percentage >= PASS_THRESHOLD || proceedClicks >= 5
                                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200'
                                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                                }`}
                            onClick={() => {
                                if (percentage >= PASS_THRESHOLD || proceedClicks >= 5) {
                                    navigate("/gd-portal/waiting-room");
                                } else {
                                    const newClicks = proceedClicks + 1;
                                    setProceedClicks(newClicks);
                                    if (newClicks >= 5) {
                                        toast.success("Access granted! Proceeding to GD Room...");
                                    } else {
                                        toast.error(`You need ${PASS_THRESHOLD}% to proceed. (${5 - newClicks} clicks to override)`);
                                    }
                                }
                            }}
                        >
                            {percentage >= PASS_THRESHOLD || proceedClicks >= 5 ? (
                                <>
                                    Proceed to GD Room
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </>
                            ) : (
                                <>
                                    <Lock className="w-4 h-4 mr-2" />
                                    Proceed (Locked)
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechPrepResults;
