import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../services/apiConfig";

import Timer from "@/components/techprep/Timer";
import ProgressBar from "@/components/techprep/ProgressBar";
import QuestionCard from "@/components/techprep/QuestionCard";
import { Code2, AlertCircle } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';


interface Question {
    id: number;
    question: string;
    options: string[];
    section: string;
}

const TechPrepTest = () => {
    const navigate = useNavigate();

    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [loading, setLoading] = useState(true);
    const [tabSwitchCount, setTabSwitchCount] = useState(0);
    const [showTabWarning, setShowTabWarning] = useState(false);


    // Fetch Questions
    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/techprep/questions`);

                const data = await res.json();
                console.log("QUESTIONS LOADED:", data);
                setQuestions(data);
            } catch (err) {
                console.error("Failed loading questions", err);
            } finally {
                setLoading(false);
            }
        };

        loadQuestions();
    }, []);

    // Tab switch warning
    useEffect(() => {
        if (loading || questions.length === 0) return;

        const handleTabSwitch = () => {
            setTabSwitchCount(prev => {
                const newCount = prev + 1;
                console.log(`[TechPrep] Tab switch detected. Total: ${newCount}`);

                if (newCount > 5) {
                    alert("Violated tab switch limit (5 times). The test will now submit.");
                    submitTest(answers);
                    return newCount;
                }
                setShowTabWarning(true);
                return newCount;
            });
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                handleTabSwitch();
            }
        };

        const handleBlur = () => {
            if (!document.hidden) {
                handleTabSwitch();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('blur', handleBlur);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('blur', handleBlur);
        };
    }, [loading, questions, answers]);

    // Submit Test
    const submitTest = async (
        finalAnswers: Record<number, number>,
        timedOut = false
    ) => {
        try {
            const payloadAnswers = Object.fromEntries(
                Object.entries(finalAnswers).map(([k, v]) => [String(k), v])
            );

            const res = await fetch(`${API_BASE_URL}/techprep/submit`, {

                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    answers: payloadAnswers,
                    timedOut,
                }),
            });

            const data = await res.json();
            console.log("SUBMIT RESPONSE:", data);

            navigate("/techprep/results", { state: data });
        } catch (err) {
            console.error("Submit failed", err);
        }
    };

    // Handle Answer
    const handleAnswer = useCallback(
        (selectedOption: number) => {
            const q = questions[currentQuestionIndex];
            if (!q) return;

            const updatedAnswers: Record<number, number> = {
                ...answers,
                [q.id]: selectedOption,
            };

            setAnswers(updatedAnswers);

            if (currentQuestionIndex === questions.length - 1) {
                submitTest(updatedAnswers);
            } else {
                setCurrentQuestionIndex((prev) => prev + 1);
            }
        },
        [answers, currentQuestionIndex, questions]
    );

    const handleTimeUp = () => {
        submitTest(answers, true);
    };

    // UI States
    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center text-slate-600 bg-slate-50">
                Loading questions...
            </div>
        );

    if (!questions.length)
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500 bg-slate-50">
                No questions found. Make sure the backend is running.
            </div>
        );

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="min-h-screen bg-slate-50">
            <AlertDialog open={showTabWarning} onOpenChange={setShowTabWarning}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Warning: Tab Switch Detected</AlertDialogTitle>
                        <AlertDialogDescription>
                            You have switched tabs or minimized the window. Please stay on this page during the assessment.
                            Multiple tab switches may result in automatic submission.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setShowTabWarning(false)}>
                            I Understand
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Header */}
            <div className="sticky top-0 bg-white border-b z-10">
                <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
                            <Code2 className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-semibold text-slate-800">TechPrep Assessment</span>
                    </div>
                    <Timer totalSeconds={1800} onTimeUp={handleTimeUp} />
                </div>
            </div>

            {/* Main */}
            <main className="max-w-3xl mx-auto px-4 py-8">
                <ProgressBar
                    current={currentQuestionIndex}
                    total={questions.length}
                    currentSection={currentQuestion.section as 'DBMS' | 'OS' | 'Networking' | 'DSA'}
                />

                <div className="mt-6">
                    <QuestionCard
                        question={currentQuestion}
                        onAnswer={handleAnswer}
                        isLast={currentQuestionIndex === questions.length - 1}
                    />
                </div>
            </main>
        </div>
    );
};

export default TechPrepTest;
