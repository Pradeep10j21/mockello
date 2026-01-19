import { useState, useEffect } from 'react';
import { getQuestionsForDomain, analyzeAnswer } from '../../utils/technical-interview/AIInterviewLogic';

export function useInterviewLogic(department, domain, difficulty) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [isInterviewActive, setIsInterviewActive] = useState(false);

  useEffect(() => {
    // Fetch questions based on Department and Domain
    const domainQuestions = getQuestionsForDomain(department, domain, difficulty);
    setQuestions(domainQuestions);
  }, [department, domain, difficulty]);

  const startInterview = () => {
    setIsInterviewActive(true);
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const stopInterview = () => {
    setIsInterviewActive(false);
  };

  const skipQuestion = () => {
    if (!questions || questions.length === 0) return;
    // Move to next question if not at the last question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const saveAnswer = (questionIndex, answerText) => {
    if (!questions || questions.length === 0) return;
    const question = questions[questionIndex];
    if (!question || !answerText || answerText.trim().length === 0) return;

    const analysis = analyzeAnswer(answerText, question);

    const answer = {
      questionIndex,
      question: question.question,
      answer: answerText,
      analysis
    };

    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = answer;
      return newAnswers;
    });

    // Only move to next question if we haven't already answered it
    // and we're not at the last question
    if (questionIndex < questions.length - 1) {
      const nextIndex = questionIndex + 1;
      // Use functional update to ensure we're using the latest state
      setTimeout(() => {
        setCurrentQuestionIndex(nextIndex);
      }, 2000);
    }
  };

  const getResults = () => {
    const allAnalyses = answers.map(a => a.analysis).filter(Boolean);

    if (allAnalyses.length === 0) {
      return {
        overallScore: 0,
        skillBreakdown: {
          communication: 0,
          confidence: 0,
          technicalClarity: 0
        },
        strengths: [],
        improvements: [],
        suggestions: []
      };
    }

    const avgCommunication = allAnalyses.reduce((sum, a) => sum + a.communication, 0) / allAnalyses.length;
    const avgConfidence = allAnalyses.reduce((sum, a) => sum + a.confidence, 0) / allAnalyses.length;
    const avgTechnical = allAnalyses.reduce((sum, a) => sum + a.technicalClarity, 0) / allAnalyses.length;

    const overallScore = Math.round((avgCommunication + avgConfidence + avgTechnical) / 3);

    const strengths = [];
    const improvements = [];

    if (avgCommunication >= 70) {
      strengths.push('Clear and articulate communication');
    } else {
      improvements.push('Work on speaking more clearly and structuring your thoughts');
    }

    if (avgConfidence >= 70) {
      strengths.push('Confident delivery and presence');
    } else {
      improvements.push('Practice speaking with more confidence and conviction');
    }

    if (avgTechnical >= 70) {
      strengths.push('Strong technical understanding');
    } else {
      improvements.push('Enhance technical depth in your explanations');
    }

    if (allAnalyses.every(a => a.length >= 50)) {
      strengths.push('Comprehensive and detailed answers');
    } else {
      improvements.push('Provide more detailed and complete answers');
    }

    const suggestions = [
      'Practice answering common interview questions out loud',
      'Record yourself and review your delivery',
      'Prepare specific examples from your experience',
      'Focus on clear, concise communication',
      'Take time to think before answering'
    ];

    return {
      overallScore,
      skillBreakdown: {
        communication: Math.round(avgCommunication),
        confidence: Math.round(avgConfidence),
        technicalClarity: Math.round(avgTechnical)
      },
      strengths,
      improvements,
      suggestions,
      answers
    };
  };

  return {
    currentQuestionIndex,
    questions,
    answers,
    isInterviewActive,
    startInterview,
    stopInterview,
    skipQuestion,
    saveAnswer,
    getResults
  };
}

