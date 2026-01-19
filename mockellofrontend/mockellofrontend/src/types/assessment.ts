export interface DiagramContent {
  type: string;
  content: string;
}

export interface ExplanationStep {
  title: string;
  content: string;
  emoji?: string;
  diagram?: DiagramContent;
}

export interface Question {
  id: string;
  category: 'quantitative' | 'logical' | 'verbal' | 'analytical';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  concept: string;
  tip: string;
  difficulty: 'easy' | 'medium' | 'hard';
  steps: ExplanationStep[];
  gifUrl?: string;
  funFact?: string;
  reinforcementQuestion?: Question;
}

export interface UserAnswer {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
  attempts: number;
  learningRecovery: boolean;
}

export interface CategoryScore {
  correct: number;
  total: number;
  percentage: number;
}

export interface AssessmentResult {
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  learningEfficiency: number;
  totalTime: number;
  categoryScores: {
    [key: string]: CategoryScore;
  };
  strengths: string[];
  improvements: string[];
}

export type AssessmentPhase = 'welcome' | 'instructions' | 'assessment' | 'summary';

export type FeedbackState = 'none' | 'correct' | 'incorrect' | 'learning';
