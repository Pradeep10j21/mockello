import { useState, useEffect } from 'react';

export function useInterviewLogic(department, domain, difficulty) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [evaluating, setEvaluating] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      if (!department || !domain) return;
      try {
        setLoading(true);
        // Determine the base URL inside the effect or import it
        // We'll dynamic import to avoid circular dependency issues if any
        const { TECHNICAL_QUESTIONS_URL } = await import('@/services/apiConfig');

        // Construct query params
        const url = new URL(TECHNICAL_QUESTIONS_URL);
        url.searchParams.append('department', department);
        url.searchParams.append('domain', domain);

        const res = await fetch(url.toString());
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            // Convert strings to object format expected by UI if needed, 
            // or UI might expect objects directly. 
            // The backend returns ["q1", "q2"] string array.
            // Existing UI expects objects probably, let's check InterviewPage.
            // Actually InterviewPage accesses question directly. 
            // Let's normalize it to { question: "text" } if UI needs objects
            setQuestions(data.map(q => ({ question: q, category: 'Technical' })));
          } else {
            console.warn("No questions received from backend, falling back to defaults.");
            setQuestions([
              { question: "Tell me about your technical background.", category: "General" },
              { question: "Describe a challenging project you worked on.", category: "Behavioral" }
            ]);
          }
        }
      } catch (e) {
        console.error("Failed to fetch technical questions", e);
        // Fallback
        setQuestions([
          { question: "Tell me about your technical background.", category: "General" },
          { question: "Describe a challenging project you worked on.", category: "Behavioral" }
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
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
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const saveAnswer = (questionIndex, answerText) => {
    if (!questions || questions.length === 0) return;
    const question = questions[questionIndex];
    if (!question || !answerText || answerText.trim().length === 0) return;

    // We no longer analyze locally (or we do a basic one for UI feedback if needed, but the real score comes from backend)
    // For now, save the raw answer.

    const answer = {
      questionIndex,
      question: question.question || question, // handle string or object
      answer: answerText
    };

    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = answer;
      return newAnswers;
    });

    if (questionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 2000);
    }
  };

  // Convert getResults to async as it now fetches from backend
  const getResults = async () => {
    setEvaluating(true);
    try {
      const { TECHNICAL_EVALUATE_URL } = await import('@/services/apiConfig');

      const payload = {
        department: department || "CSE",
        domain: domain || "General",
        answers: answers.map(a => ({
          question: a.question,
          answer: a.answer
        }))
      };

      const res = await fetch(TECHNICAL_EVALUATE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error("Evaluation failed");
      }

      const data = await res.json();
      // Backend returns: { overall_score, skill_breakdown, strengths, improvements, detailed_feedback }
      // We need to map it to what the ResultPage expects

      // ResultPage expects:
      // { overallScore, skillBreakdown, strengths, improvements, answers: [ { question, answer, analysis: {...} } ] }

      // Map detailed_feedback back to answers structure
      const enrichedAnswers = answers.map(a => {
        const feedback = data.detailed_feedback?.find(f => f.question === a.question);
        return {
          ...a,
          analysis: {
            // Spread local analysis if available or use backend feedback
            communication: data.skill_breakdown.communication, // approximate per-question if not granular
            confidence: data.skill_breakdown.confidence,
            technicalClarity: data.skill_breakdown.technicalClarity,
            feedback: feedback?.feedback,
            score: feedback?.score
          }
        };
      });

      return {
        overallScore: data.overall_score,
        skillBreakdown: data.skill_breakdown,
        strengths: data.strengths,
        improvements: data.improvements,
        answers: enrichedAnswers,
        suggsetions: [] // optional
      };

    } catch (e) {
      console.error("AI Evaluation error", e);
      // Fallback mock result
      return {
        overallScore: 0,
        skillBreakdown: { communication: 0, confidence: 0, technicalClarity: 0 },
        strengths: ["Evaluation failed"],
        improvements: ["Please retry"],
        answers: answers
      };
    } finally {
      setEvaluating(false);
    }
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
    getResults,
    loading,
    evaluating
  };
}
