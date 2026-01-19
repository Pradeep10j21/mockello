import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, AlertCircle, Sparkles, ChevronRight, Timer as TimerIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@/components/ui/alert-dialog';
import MockelloLogo from "@/components/MockelloLogo";

import Timer from "@/components/techprep/Timer";
import ProgressBar from "@/components/techprep/ProgressBar";
import QuestionCard from "@/components/techprep/QuestionCard";
import { TECH_PREP_QUESTIONS } from "@/data/techprepQuestions";

const TechPrepTest = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { department } = location.state || { department: 'CSE/IT' };

    // Filter questions for the selected department
    const filteredQuestions = useMemo(() => {
        return TECH_PREP_QUESTIONS.filter(q => q.department === department);
    }, [department]);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number | string>>({});
    const [tabSwitchCount, setTabSwitchCount] = useState(0);
    const [showTabWarning, setShowTabWarning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Tab switch warning logic
    useEffect(() => {
        const handleTabSwitch = () => {
            setTabSwitchCount(prev => {
                const newCount = prev + 1;
                if (newCount > 5) {
                    alert("Tab switch limit exceeded. Auto-submitting assessment.");
                    submitTest(answers);
                    return newCount;
                }
                setShowTabWarning(true);
                return newCount;
            });
        };

        const handleVisibilityChange = () => { if (document.hidden) handleTabSwitch(); };
        const handleBlur = () => { if (!document.hidden) handleTabSwitch(); };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('blur', handleBlur);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('blur', handleBlur);
        };
    }, [answers]);

    // Submit Logic
    const submitTest = async (finalAnswers: Record<number, number | string>, timedOut = false) => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        // Local processing since we moved questions to frontend
        let score = 0;
        const results = filteredQuestions.map(q => {
            const selected = finalAnswers[q.id];
            const isCorrect = q.type === 'programming' ? true : selected === q.correctAnswer;
            if (isCorrect && q.type !== 'programming') score++;
            return {
                id: q.id,
                question: q.question,
                section: q.section,
                selectedAnswer: selected,
                correctAnswer: q.correctAnswer,
                isCorrect,
                type: q.type
            };
        });

        const report = {
            totalQuestions: filteredQuestions.length,
            attempted: Object.keys(finalAnswers).length,
            score,
            results,
            department,
            timedOut
        };

        // Simulate a brief delay for a "processing" feel
        setTimeout(() => {
            navigate("/techprep/results", { state: report });
        }, 1500);
    };

    const handleAnswer = useCallback((answer: number | string) => {
        const q = filteredQuestions[currentQuestionIndex];
        if (!q) return;

        const updatedAnswers = { ...answers, [q.id]: answer };
        setAnswers(updatedAnswers);

        if (currentQuestionIndex === filteredQuestions.length - 1) {
            submitTest(updatedAnswers);
        } else {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    }, [answers, currentQuestionIndex, filteredQuestions]);

    if (!filteredQuestions.length) {
        return (
            <div className="min-h-screen bg-[#F2F6F0] flex items-center justify-center p-6 text-center">
                <div className="max-w-md">
                    <AlertCircle className="w-16 h-16 text-amber-600 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-green-primary mb-2 font-serif">No Questions Found</h2>
                    <p className="text-green-muted mb-6">We couldn't find questions for the {department} department.</p>
                    <Button onClick={() => navigate('/techprep/select')} className="bg-green-primary hover:bg-green-dark">
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    const currentQuestion = filteredQuestions[currentQuestionIndex];

    return (
        <div className="min-h-screen bg-[#F2F6F0] text-green-dark font-sans">
            <AnimatePresence>
                {isSubmitting && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-[100] bg-[#F2F6F0]/90 backdrop-blur-xl flex flex-col items-center justify-center"
                    >
                        <div className="w-20 h-20 border-4 border-green-primary/20 border-t-green-primary rounded-full animate-spin mb-6" />
                        <h2 className="text-2xl font-black text-green-primary tracking-tight uppercase italic font-serif">Calculating Score</h2>
                        <p className="text-green-muted font-bold text-xs uppercase tracking-[0.3em] mt-2">Personalizing your report...</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <AlertDialog open={showTabWarning} onOpenChange={setShowTabWarning}>
                <AlertDialogContent className="bg-[#E9F2EB] border-green-light text-green-primary">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2 font-serif">
                            <AlertCircle className="w-5 h-5 text-amber-600" />
                            Security Alert
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-green-muted font-medium">
                            Tab switch detected. This assessment is proctored. Persistent violations will lead to automatic submission.
                            Remaining attempts: {5 - tabSwitchCount}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setShowTabWarning(false)} className="bg-[#10B981] hover:bg-[#059669] text-white">
                            I Understand
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Header */}
            <div className="sticky top-0 z-40 bg-[#F2F6F0]/80 backdrop-blur-md border-b border-green-light/30">
                <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <MockelloLogo size="sm" />
                        <div className="h-8 w-px bg-green-light mx-1" />
                        <div>
                            <span className="text-[10px] font-bold text-green-muted uppercase tracking-widest block">In Progress</span>
                            <span className="text-sm font-black text-green-primary uppercase italic">{department}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#E9F2EB] rounded-xl border border-green-light/50 shadow-sm">
                            <TimerIcon className="w-4 h-4 text-green-dark" />
                            <Timer totalSeconds={1800} onTimeUp={() => submitTest(answers, true)} />
                        </div>
                        <div className="h-10 w-px bg-green-light hidden md:block" />
                        <div className="text-right font-serif">
                            <span className="text-[10px] font-bold text-green-muted uppercase tracking-widest block">Progress</span>
                            <span className="text-sm font-black text-green-primary">{currentQuestionIndex + 1} / {filteredQuestions.length}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-6 py-12">
                <div className="mb-12">
                    <ProgressBar
                        current={currentQuestionIndex}
                        total={filteredQuestions.length}
                        currentSection={currentQuestion.section as any}
                    />
                </div>

                <div className="relative">
                    <motion.div
                        key={currentQuestionIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <QuestionCard
                            question={currentQuestion}
                            onAnswer={handleAnswer}
                            isLast={currentQuestionIndex === filteredQuestions.length - 1}
                        />
                    </motion.div>

                    {/* Quick Info */}
                    <div className="mt-12 flex justify-between items-center px-4 py-4 bg-[#E9F2EB] rounded-2xl border border-green-light/50 text-[10px] font-bold uppercase tracking-widest text-green-muted shadow-sm">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-green-dark" />
                            <span>Module: {currentQuestion.section}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Auto-saving response</span>
                            <ChevronRight className="w-4 h-4 text-green-light" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TechPrepTest;
