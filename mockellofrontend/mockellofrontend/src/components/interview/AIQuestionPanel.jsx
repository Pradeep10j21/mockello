import React, { useEffect, useState, useRef } from 'react';
import './AIQuestionPanel.css';

function AIQuestionPanel({ currentQuestion, questionNumber, totalQuestions, isInterviewActive, allAnswered, onSkipQuestion, canSkip }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (currentQuestion && isInterviewActive) {
      setIsTyping(true);
      setDisplayedText('');
      
      const questionText = currentQuestion.question;
      let index = 0;
      
      // Text-to-speech for question
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(questionText);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;
        speechSynthesis.speak(utterance);
      }
      
      const typingInterval = setInterval(() => {
        if (index < questionText.length) {
          setDisplayedText(questionText.substring(0, index + 1));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, 30);

      return () => {
        clearInterval(typingInterval);
        if ('speechSynthesis' in window) {
          speechSynthesis.cancel();
        }
      };
    }
  }, [currentQuestion, isInterviewActive]);

  if (allAnswered) {
    return (
      <div className="ai-question-panel">
        <div className="question-placeholder completed">
          <div className="completed-icon">✅</div>
          <h2>All Questions Completed!</h2>
          <p>You have answered all {totalQuestions} questions. Click "Complete Test" to view your results.</p>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="ai-question-panel">
        <div className="question-placeholder">
          <p>Waiting for interview to start...</p>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Hard':
        return '#d32f2f';
      case 'Medium':
        return '#f57c00';
      case 'Easy':
        return '#388e3c';
      default:
        return 'var(--green-muted)';
    }
  };

  return (
    <div className="ai-question-panel">
      <div className="question-header">
        <div className="question-number">
          Question {questionNumber} of {totalQuestions}
        </div>
        <div className="header-right">
          {canSkip && (
            <button 
              className="skip-question-btn"
              onClick={onSkipQuestion}
              title="Move to next question"
            >
              Next Question →
            </button>
          )}
          <span 
            className="difficulty-badge"
            style={{ backgroundColor: getDifficultyColor(currentQuestion.difficulty) }}
          >
            {currentQuestion.difficulty}
          </span>
        </div>
      </div>

      <div className="question-status">
        <span className="status-label">Current Question</span>
      </div>

      <div className="question-content">
        <h2 className="question-title">{currentQuestion.category}</h2>
        <p className="question-text">{displayedText}</p>
        {isTyping && <span className="cursor">|</span>}
      </div>

      <div className="question-tips">
        <div className="tips-header">
          <div className="ai-avatar-container">
            <div className="ai-avatar">
              <div className="ai-face">
                <div className="ai-eye left-eye"></div>
                <div className="ai-eye right-eye"></div>
                <div className="ai-mouth"></div>
              </div>
            </div>
          </div>
          <p className="tips-title">💡 Tips:</p>
        </div>
        <ul>
          <li>Speak clearly and at a moderate pace</li>
          <li>Take your time to think before answering</li>
          <li>Provide specific examples when possible</li>
        </ul>
      </div>
    </div>
  );
}

export default AIQuestionPanel;

