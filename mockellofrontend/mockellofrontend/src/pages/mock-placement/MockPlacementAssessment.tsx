import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../services/apiConfig';

import { ArrowRight, Clock, CheckCircle, Sparkles, Trophy, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AssessmentPhase, UserAnswer } from '@/types/assessment';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

// Define Question Interface as it comes from API
interface Question {
  _id: string;
  id: string;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

const MockPlacementAssessment = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<AssessmentPhase>('welcome');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [seconds, setSeconds] = useState(1800); // 30 minutes
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [showTabWarning, setShowTabWarning] = useState(false);

  // Fetch questions from API
  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/aptitude/test`);

      if (!response.ok) throw new Error('Failed to fetch questions');
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
      // Fallback or error handling could go here
    } finally {
      setIsLoading(false);
    }
  };

  const [tabSwitchCount, setTabSwitchCount] = useState(0);

  // Tab switch warning
  useEffect(() => {
    if (phase !== 'assessment') return;

    const handleTabSwitch = () => {
      setTabSwitchCount(prev => {
        const newCount = prev + 1;
        console.log(`[Assessment] Tab switch detected. Total: ${newCount}`);

        if (newCount > 5) {
          alert("Violated tab switch limit (5 times). The test will now submit.");
          handleSubmitAssessment();
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
      // Only handle blur if the document isn't already hidden (to avoid double counting)
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
  }, [phase]);

  const startTimer = () => {
    if (timerId) return;
    const id = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          handleSubmitAssessment();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    setTimerId(id);
  };

  const stopTimer = () => {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
  };

  const handleStartAssessment = async () => {
    await fetchQuestions();
    setPhase('assessment');
    startTimer();
  };

  const handleSelectAnswer = (index: number) => {
    setSelectedAnswer(index);
    // Save answer immediately or update local state
    setUserAnswers(prev => {
      const existing = prev.filter(a => a.questionId !== currentQuestion.id);
      const isCorrect = index === currentQuestion.correctAnswer;
      return [...existing, {
        questionId: currentQuestion.id,
        selectedAnswer: index,
        isCorrect: isCorrect, // We can calculate this locally for now since we have the data
        timeSpent: 0,
        attempts: 1,
        learningRecovery: false
      }];
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      // Restore previous answer if exists
      const prevAnswer = userAnswers.find(a => a.questionId === questions[currentQuestionIndex + 1].id);
      setSelectedAnswer(prevAnswer ? prevAnswer.selectedAnswer : null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      // Restore previous answer if exists
      const prevAnswer = userAnswers.find(a => a.questionId === questions[currentQuestionIndex - 1].id);
      setSelectedAnswer(prevAnswer ? prevAnswer.selectedAnswer : null);
    }
  }

  const handleSubmitAssessment = () => {
    stopTimer();

    // Calculate results
    const correctAnswers = userAnswers.filter(a => a.isCorrect).length;
    const accuracy = questions.length > 0 ? Math.round((correctAnswers / questions.length) * 100) : 0;

    const result = {
      accuracy,
      totalQuestions: questions.length,
      correctAnswers,
      timeSpent: 1800 - seconds,
      categoryBreakdown: questions.reduce((acc, q) => {
        const category = q.category;
        const isCorrect = userAnswers.find(a => a.questionId === q.id)?.isCorrect || false;
        if (!acc[category]) acc[category] = { correct: 0, total: 0 };
        acc[category].total++;
        if (isCorrect) acc[category].correct++;
        return acc;
      }, {} as { [key: string]: { correct: number; total: number } }),
      difficultyBreakdown: {} // simplified for now as we might not have difficulty in all generated questions
    };

    navigate('/mock-placement/results', { state: { result } });
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (phase === 'welcome') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <div className="max-w-2xl w-full text-center">
          <div className="w-20 h-20 rounded-2xl bg-primary mx-auto mb-6 flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4 text-gradient-forest">
            Aptitude Assessment
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            30 Questions • 30 Minutes • No Immediate Feedback
          </p>
          <Button size="lg" className="btn-forest" onClick={handleStartAssessment} disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Start Assessment <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <p className="mt-4 text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" /> 30 random questions from our pool
          </p>
          <Link to="/mock-placement" className="mt-6 inline-block text-sm text-primary hover:underline">
            ← Back to Overview
          </Link>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <AlertDialog open={showTabWarning} onOpenChange={setShowTabWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Warning: Tab Switch Detected</AlertDialogTitle>
            <AlertDialogDescription>
              You have switched tabs or minimized the window. Please stay on this page during the assessment.
              Multiple tab switches may result in disqualification.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowTabWarning(false)}>
              I Understand
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold">Aptitude Assessment</h1>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${seconds < 300 ? 'bg-destructive/10 border-destructive text-destructive' : 'bg-muted/50 border-border'}`}>
            <Clock className="w-4 h-4" />
            <span className="font-mono text-sm">{formatTime(seconds)}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="card-forest p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Question {currentQuestionIndex + 1} / {questions.length}</span>
            <span className="text-sm font-medium">{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }} />
          </div>
        </div>

        {/* Question */}
        <div className="card-forest p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium capitalize">
              {currentQuestion.category}
            </span>
          </div>
          <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${selectedAnswer === index ? 'border-primary bg-primary/10' :
                  'border-border hover:border-primary/50'
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-semibold ${selectedAnswer === index ? 'bg-primary text-primary-foreground' :
                    'bg-muted text-muted-foreground'
                    }`}>
                    {['A', 'B', 'C', 'D'][index]}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            )
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between mt-8">
            <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0} variant="outline">
              Previous
            </Button>

            {currentQuestionIndex < questions.length - 1 ? (
              <Button onClick={handleNext} className="btn-forest">
                Next <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmitAssessment} className="btn-forest bg-green-600 hover:bg-green-700">
                Submit Test <CheckCircle className="ml-2 w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockPlacementAssessment;
