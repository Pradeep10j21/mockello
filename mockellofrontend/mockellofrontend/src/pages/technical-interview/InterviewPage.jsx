import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import VideoInterview from '../../components/technical-interview/VideoInterview';
import AIQuestionPanel from '../../components/technical-interview/AIQuestionPanel';
import { useInterviewLogic } from '../../hooks/technical-interview/useInterviewLogic';
import './InterviewPage.css';

function InterviewPage() {
  const { companyId } = useParams(); // Keep for legacy/fallback
  const navigate = useNavigate();
  const location = useLocation();

  // Get State from navigation
  const { department, domain, difficulty } = location.state || {};

  const {
    currentQuestionIndex,
    questions,
    answers,
    isInterviewActive,
    startInterview,
    stopInterview,
    skipQuestion,
    saveAnswer,
    getResults
  } = useInterviewLogic(department, domain, difficulty);

  const [transcript, setTranscript] = useState('');
  const [showCompleteButton, setShowCompleteButton] = useState(false);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);

  const handleAnswerComplete = useCallback((answerText) => {
    if (answerText && answerText.trim().length > 0 && questions && questions.length > 0) {
      // Save answer for current question index
      const currentIndex = currentQuestionIndex;
      saveAnswer(currentIndex, answerText);
      setTranscript('');

      // Check if this was the last question
      if (currentIndex >= questions.length - 1) {
        setTimeout(() => {
          setAllQuestionsAnswered(true);
          setShowCompleteButton(true);
          stopInterview();
        }, 2000);
      }
    }
  }, [currentQuestionIndex, questions, saveAnswer, stopInterview]);

  const handleCompleteTest = useCallback(() => {
    const results = getResults();
    navigate('/technical-interview/result', { state: { results, companyId } });
  }, [getResults, navigate, companyId]);

  const handleStopInterview = useCallback(() => {
    stopInterview();
    // Get results and navigate to result page
    const results = getResults();
    navigate('/technical-interview/result', { state: { results, companyId } });
  }, [stopInterview, getResults, navigate, companyId]);

  useEffect(() => {
    // Check if all questions are answered
    if (questions && answers && answers.length === questions.length && questions.length > 0 && !allQuestionsAnswered) {
      setAllQuestionsAnswered(true);
      setShowCompleteButton(true);
    }
  }, [answers, questions, allQuestionsAnswered]);

  return (
    <div className="interview-page">
      {showCompleteButton && (
        <div className="complete-test-overlay">
          <div className="complete-test-modal">
            <div className="complete-icon">✅</div>
            <h2>All Questions Completed!</h2>
            <p>You have answered all {questions ? questions.length : 0} questions. Click below to view your results.</p>
            <button className="complete-test-btn" onClick={handleCompleteTest}>
              Complete Test & View Results
            </button>
          </div>
        </div>
      )}
      <div className="interview-container">
        <div className="interview-left">
          <VideoInterview
            isActive={isInterviewActive}
            isAISpeaking={isAISpeaking}
            currentQuestionIndex={currentQuestionIndex}
            onStart={startInterview}
            onStop={handleStopInterview}
            onTranscriptUpdate={setTranscript}
            onAnswerComplete={handleAnswerComplete}
            canProceed={questions && questions.length > 0 && currentQuestionIndex < questions.length}
          />
        </div>

        <div className="interview-right">
          <AIQuestionPanel
            currentQuestion={questions && questions.length > 0 ? questions[currentQuestionIndex] : null}
            questionNumber={questions && questions.length > 0 ? currentQuestionIndex + 1 : 0}
            totalQuestions={questions ? questions.length : 0}
            isInterviewActive={isInterviewActive}
            allAnswered={allQuestionsAnswered}
            onSkipQuestion={skipQuestion}
            onSpeechStatusChange={setIsAISpeaking}
            canSkip={isInterviewActive && questions && questions.length > 0 && currentQuestionIndex < questions.length - 1}
          />
        </div>
      </div>
    </div>
  );
}

export default InterviewPage;

