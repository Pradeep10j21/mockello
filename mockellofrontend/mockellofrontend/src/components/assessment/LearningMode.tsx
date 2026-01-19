import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ArrowRight, Brain, Sparkles, CheckCircle, XCircle, SkipForward, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Question } from '@/types/assessment';
import TrainDiagram from './diagrams/TrainDiagram';
import TimeWorkDiagram from './diagrams/TimeWorkDiagram';
import ProfitLossDiagram from './diagrams/ProfitLossDiagram';
import PerimeterDiagram from './diagrams/PerimeterDiagram';
import VolumeDiagram from './diagrams/VolumeDiagram';
import BloodRelationDiagram from './diagrams/BloodRelationDiagram';
import PuzzleDayDiagram from './diagrams/PuzzleDayDiagram';
import SentenceCorrectionDiagram from './diagrams/SentenceCorrectionDiagram';
import ErrorSpottingDiagram from './diagrams/ErrorSpottingDiagram';
import SpeedConversionDiagram from './diagrams/SpeedConversionDiagram';

interface LearningModeProps {
  question: Question;
  selectedAnswer: number;
  onContinue: () => void;
}

const LearningMode = ({ question, selectedAnswer, onContinue }: LearningModeProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepsCompleted, setStepsCompleted] = useState(false);

  const steps = question.steps || [];
  const totalSteps = steps.length;

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setStepsCompleted(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderDiagram = () => {
    const questionId = question.id;

    if (questionId === 'q1') return <TrainDiagram step={currentStep} />;
    if (questionId === 'q2') return <TimeWorkDiagram step={currentStep} totalDays={12} />;
    if (questionId === 'q3') return <ProfitLossDiagram step={currentStep} costPrice={400} sellingPrice={500} />;
    if (questionId === 'q4') return <PerimeterDiagram step={currentStep} side={8} />;
    if (questionId === 'q5') return <VolumeDiagram step={currentStep} side={4} />;
    if (questionId === 'q6') return <BloodRelationDiagram step={currentStep} />;
    if (questionId === 'q7') return <PuzzleDayDiagram step={currentStep} startDay="Monday" daysToAdd={3} />;
    if (questionId === 'q8') return <SentenceCorrectionDiagram step={currentStep} />;
    if (questionId === 'q9') return <ErrorSpottingDiagram step={currentStep} />;
    if (questionId === 'q10') return <SpeedConversionDiagram step={currentStep} speedKmh={36} />;

    return null;
  };

  return (
    <motion.div
      className="p-6 mt-6 rounded-2xl bg-accent/10 border border-accent/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            className="relative w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Lightbulb className="w-6 h-6" />
          </motion.div>
          <div>
            <h3 className="font-semibold text-lg text-accent">Let's understand this concept</h3>
            <p className="text-sm text-muted-foreground">{question.concept}</p>
          </div>
        </div>
        <motion.button
          onClick={onContinue}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors text-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <SkipForward className="w-4 h-4" />
          Skip
        </motion.button>
      </div>

      {/* Visual Diagram */}
      {!stepsCompleted && (
        <motion.div className="mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {renderDiagram()}
        </motion.div>
      )}

      {/* Step Navigation */}
      {!stepsCompleted && steps.length > 0 && (
        <div className="mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              className="p-4 rounded-xl bg-card/80 border border-border"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{steps[currentStep]?.emoji || '💡'}</span>
                <div>
                  <h4 className="font-semibold text-foreground">Step {currentStep + 1}: {steps[currentStep]?.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{steps[currentStep]?.content}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-4">
            <button
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted'}`}
            >
              <ChevronLeft className="w-5 h-5" /> Previous
            </button>

            <div className="flex gap-2">
              {steps.map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all ${i === currentStep ? 'bg-primary w-6' : i < currentStep ? 'bg-secondary w-2' : 'bg-muted w-2'}`} />
              ))}
            </div>

            <button onClick={handleNextStep} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90">
              {currentStep < totalSteps - 1 ? <>Next <ChevronRight className="w-5 h-5" /></> : <>Got it! <CheckCircle className="w-5 h-5" /></>}
            </button>
          </div>
        </div>
      )}

      {/* Summary */}
      <AnimatePresence>
        {stepsCompleted && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 flex items-start gap-3">
                <XCircle className="w-5 h-5 text-destructive" />
                <div>
                  <p className="text-sm font-medium text-destructive">Your Answer</p>
                  <p className="text-foreground">{question.options[selectedAnswer]}</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/30 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-secondary" />
                <div>
                  <p className="text-sm font-medium text-secondary">Correct Answer</p>
                  <p className="text-foreground">{question.options[question.correctAnswer]}</p>
                </div>
              </div>
            </div>

            {question.funFact && (
              <div className="p-4 rounded-xl mb-4 border border-accent/30 bg-accent/5 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm font-medium text-accent">Fun Fact</p>
                  <p className="text-sm text-muted-foreground">{question.funFact}</p>
                </div>
              </div>
            )}

            <div className="p-4 rounded-xl mb-6 border border-primary/30 bg-primary/5 flex items-start gap-3">
              <Brain className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-primary">Pro Tip</p>
                <p className="text-sm text-muted-foreground">{question.tip}</p>
              </div>
            </div>

            <button onClick={onContinue} className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
              Continue to Next Question <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LearningMode;
