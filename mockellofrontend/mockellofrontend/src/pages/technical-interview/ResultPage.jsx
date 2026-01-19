import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResultPage.css';

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [selectedTab, setSelectedTab] = useState('overview');

  useEffect(() => {
    // Always use mock data for demonstration
    const mockResults = location.state?.results || {
      overallScore: 78,
      skillBreakdown: {
        communication: 82,
        confidence: 75,
        technicalClarity: 77
      },
      strengths: [
        'Excellent communication skills with clear articulation',
        'Strong technical knowledge demonstrated in answers',
        'Good use of specific examples from experience',
        'Confident delivery and professional tone',
        'Well-structured responses with logical flow',
        'Appropriate answer length and depth'
      ],
      improvements: [
        'Work on building more confidence in technical explanations',
        'Practice handling complex technical questions with more detail',
        'Focus on time management during longer answers',
        'Enhance body language and non-verbal communication',
        'Prepare more industry-specific examples',
        'Practice handling behavioral questions more effectively'
      ],
      suggestions: [
        'Record practice interviews and review your performance',
        'Join mock interview sessions with peers',
        'Study common technical interview questions',
        'Practice explaining complex concepts simply',
        'Work on your elevator pitch and personal introduction',
        'Research the company and role thoroughly before interviews'
      ],
      answers: [
        {
          question: 'Tell me about yourself and your background.',
          answer: 'I am a software engineering student with 2 years of experience in web development. I have worked on various projects using React, Node.js, and Python. I am passionate about creating user-friendly applications and solving complex problems. My goal is to become a full-stack developer and contribute to innovative projects.',
          analysis: {
            communication: 85,
            confidence: 80,
            technicalClarity: 75,
            length: 120
          }
        },
        {
          question: 'What are your strengths and weaknesses?',
          answer: 'My strengths include problem-solving skills, attention to detail, and ability to learn new technologies quickly. I am proficient in JavaScript, React, and database management. My weakness is that I sometimes get too focused on details and might spend too much time perfecting small features. I am working on improving my time management skills.',
          analysis: {
            communication: 80,
            confidence: 78,
            technicalClarity: 82,
            length: 95
          }
        },
        {
          question: 'Why do you want to work for our company?',
          answer: 'I am impressed by your company\'s innovative approach to technology and commitment to user experience. Your recent projects in AI and machine learning align perfectly with my interests. I believe my skills in full-stack development would be valuable to your team, and I am excited about the opportunity to work on cutting-edge technologies.',
          analysis: {
            communication: 88,
            confidence: 82,
            technicalClarity: 70,
            length: 85
          }
        },
        {
          question: 'Describe a challenging project you worked on.',
          answer: 'I worked on an e-commerce platform using MERN stack. The challenge was implementing real-time inventory management. I designed a system that updates inventory instantly across multiple user sessions using WebSocket connections and MongoDB change streams. This required careful handling of concurrent updates and optimistic locking to prevent race conditions.',
          analysis: {
            communication: 78,
            confidence: 72,
            technicalClarity: 85,
            length: 78
          }
        },
        {
          question: 'Where do you see yourself in 5 years?',
          answer: 'In 5 years, I see myself as a senior software engineer leading development teams and mentoring junior developers. I want to specialize in scalable system architecture and cloud technologies. I am also interested in pursuing leadership roles where I can contribute to technical decisions and product strategy.',
          analysis: {
            communication: 82,
            confidence: 76,
            technicalClarity: 75,
            length: 70
          }
        },
        {
          question: 'How do you handle tight deadlines?',
          answer: 'I prioritize tasks based on urgency and importance, break down complex problems into smaller manageable chunks, and communicate proactively with team members about progress and potential blockers. I also use time management techniques like the Pomodoro method to maintain focus and productivity.',
          analysis: {
            communication: 83,
            confidence: 79,
            technicalClarity: 77,
            length: 88
          }
        },
        {
          question: 'Explain a technical concept to a non-technical person.',
          answer: 'I would use analogies and simple language. For example, if explaining APIs, I might compare them to a restaurant menu - you see what\'s available, place an order, and receive your food. Similarly, an API shows available functions, you request data, and receive it back.',
          analysis: {
            communication: 90,
            confidence: 81,
            technicalClarity: 88,
            length: 92
          }
        },
        {
          question: 'What is your approach to debugging?',
          answer: 'I start by reproducing the issue consistently, then check logs and error messages. I use systematic debugging techniques like adding breakpoints, checking variable states, and isolating the problem area. I also review recent code changes and test edge cases.',
          analysis: {
            communication: 79,
            confidence: 74,
            technicalClarity: 86,
            length: 76
          }
        }
      ]
    };
    setResults(mockResults);
  }, [location]);

  useEffect(() => {
    if (results) {
      const duration = 2000;
      const steps = 60;
      const increment = results.overallScore / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= results.overallScore) {
          setAnimatedScore(results.overallScore);
          clearInterval(timer);
        } else {
          setAnimatedScore(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [results]);

  if (!results) {
    return (
      <div className="result-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Generating your results...</p>
        </div>
      </div>
    );
  }

  const { overallScore, skillBreakdown, strengths, improvements, answers } = results;

  const getScoreColor = (score) => {
    if (score >= 80) return '#4caf50';
    if (score >= 60) return '#ff9800';
    return '#f44336';
  };

  const getScoreGrade = (score) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B+';
    if (score >= 60) return 'B';
    if (score >= 50) return 'C';
    return 'D';
  };

  const isSelected = overallScore >= 70;
  const totalQuestions = answers?.length || 0;
  const avgAnswerLength = answers?.reduce((sum, a) => sum + (a.answer?.length || 0), 0) / totalQuestions || 0;

  // Calculate additional metrics
  const totalWords = answers?.reduce((sum, a) => {
    return sum + (a.answer?.split(/\s+/).length || 0);
  }, 0) || 0;
  const avgWordsPerAnswer = Math.round(totalWords / totalQuestions) || 0;
  const avgConfidence = skillBreakdown.confidence;
  const avgCommunication = skillBreakdown.communication;
  const avgTechnical = skillBreakdown.technicalClarity;

  // Chart data for visualization
  const chartData = [
    { name: 'Communication', value: avgCommunication, color: '#4caf50' },
    { name: 'Confidence', value: avgConfidence, color: '#2196F3' },
    { name: 'Technical', value: avgTechnical, color: '#FF9800' }
  ];

  const CircularProgress = ({ score, size = 120, label }) => {
    const radius = (size - 20) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
      <div className="circular-progress-item">
        <div className="circular-progress" style={{ width: size, height: size }}>
          <svg width={size} height={size}>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="var(--green-light)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={getScoreColor(score)}
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="progress-circle"
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              strokeLinecap="round"
            />
          </svg>
          <div className="progress-text">
            <span className="progress-score">{score}%</span>
          </div>
        </div>
        <div className="progress-label">{label}</div>
      </div>
    );
  };

  const BarChart = ({ data }) => {
    return (
      <div className="bar-chart">
        {data.map((item, index) => (
          <div key={index} className="bar-item">
            <div className="bar-label">{item.name}</div>
            <div className="bar-container">
              <div
                className="bar-fill"
                style={{
                  width: `${item.value}%`,
                  backgroundColor: item.color
                }}
              />
              <span className="bar-value">{item.value}%</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="result-page">
      {/* Top Navigation Bar */}
      <div className="result-navbar">
        <div className="nav-left">
          <button className="back-btn" onClick={() => navigate('/technical-interview')}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
          <h1 className="nav-title">Interview Results</h1>
        </div>
        <div className="nav-right">
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="result-dashboard">
        {/* Left Sidebar - Score Overview */}
        <div className="dashboard-sidebar">
          <div className="score-overview-card">
            <div className="score-header-main">
              <h2>Overall Score</h2>
              <span className="score-grade">{getScoreGrade(overallScore)}</span>
            </div>
            <div className="main-score-display">
              <div className="main-score-circle">
                <svg width="200" height="200">
                  <circle
                    cx="100"
                    cy="100"
                    r="85"
                    stroke="var(--green-light)"
                    strokeWidth="15"
                    fill="none"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="85"
                    stroke={getScoreColor(overallScore)}
                    strokeWidth="15"
                    fill="none"
                    strokeDasharray={534}
                    strokeDashoffset={534 - (overallScore / 100) * 534}
                    transform="rotate(-90 100 100)"
                    strokeLinecap="round"
                    className="main-progress-circle"
                    style={{ transition: 'stroke-dashoffset 2s ease-in-out' }}
                  />
                </svg>
                <div className="main-score-text">
                  <span className="main-score-value">{animatedScore}</span>
                  <span className="main-score-unit">/100</span>
                </div>
              </div>
            </div>
            <div className="score-status">
              <div className="status-badge selected">
                ✓ Round Complete
              </div>
            </div>
          </div>

          <div className="quick-stats">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-info">
                <div className="stat-value">{totalQuestions}</div>
                <div className="stat-label">Questions</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💬</div>
              <div className="stat-info">
                <div className="stat-value">{avgWordsPerAnswer}</div>
                <div className="stat-label">Avg Words</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-info">
                <div className="stat-value">{getScoreGrade(overallScore)}</div>
                <div className="stat-label">Grade</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="dashboard-main">
          {/* Tabs */}
          <div className="dashboard-tabs">
            <button
              className={`tab-btn ${selectedTab === 'overview' ? 'active' : ''}`}
              onClick={() => setSelectedTab('overview')}
            >
              Overview
            </button>
            <button
              className={`tab-btn ${selectedTab === 'skills' ? 'active' : ''}`}
              onClick={() => setSelectedTab('skills')}
            >
              Skills Breakdown
            </button>
            <button
              className={`tab-btn ${selectedTab === 'questions' ? 'active' : ''}`}
              onClick={() => setSelectedTab('questions')}
            >
              Questions
            </button>
            <button
              className={`tab-btn ${selectedTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setSelectedTab('analytics')}
            >
              Analytics
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {selectedTab === 'overview' && (
              <div className="overview-grid">
                {/* Skill Breakdown Chart */}
                <div className="panel skill-chart-panel">
                  <div className="panel-header">
                    <h3>Skill Breakdown</h3>
                    <span className="panel-badge">Detailed Analysis</span>
                  </div>
                  <div className="skill-charts">
                    <CircularProgress score={skillBreakdown.communication} label="Communication" />
                    <CircularProgress score={skillBreakdown.confidence} label="Confidence" />
                    <CircularProgress score={skillBreakdown.technicalClarity} label="Technical" />
                  </div>
                  <BarChart data={chartData} />
                </div>

                {/* Strengths Panel */}
                <div className="panel strengths-panel">
                  <div className="panel-header">
                    <h3>✨ Strengths</h3>
                  </div>
                  <ul className="strengths-list">
                    {strengths.length > 0 ? (
                      strengths.map((strength, index) => (
                        <li key={index} className="strength-item">
                          <span className="check-icon">✓</span>
                          {strength}
                        </li>
                      ))
                    ) : (
                      <li className="no-items">No specific strengths identified</li>
                    )}
                  </ul>
                </div>

                {/* Improvements Panel */}
                <div className="panel improvements-panel">
                  <div className="panel-header">
                    <h3>📈 Areas for Improvement</h3>
                  </div>
                  <ul className="improvements-list">
                    {improvements.length > 0 ? (
                      improvements.map((improvement, index) => (
                        <li key={index} className="improvement-item">
                          <span className="arrow-icon">→</span>
                          {improvement}
                        </li>
                      ))
                    ) : (
                      <li className="no-items">Great job! Keep up the excellent work!</li>
                    )}
                  </ul>
                </div>
              </div>
            )}

            {selectedTab === 'skills' && (
              <div className="skills-detail-panel">
                <div className="panel">
                  <div className="panel-header">
                    <h3>Detailed Skill Analysis</h3>
                  </div>
                  <div className="skills-detail-grid">
                    {chartData.map((skill, index) => (
                      <div key={index} className="skill-detail-card">
                        <div className="skill-detail-header">
                          <h4>{skill.name}</h4>
                          <span className="skill-percentage">{skill.value}%</span>
                        </div>
                        <div className="skill-progress-bar">
                          <div
                            className="skill-progress-fill"
                            style={{
                              width: `${skill.value}%`,
                              backgroundColor: skill.color
                            }}
                          />
                        </div>
                        <p className="skill-description">
                          {skill.name === 'Communication' && 'Your ability to articulate thoughts clearly and effectively.'}
                          {skill.name === 'Confidence' && 'Your level of self-assurance and presence during the interview.'}
                          {skill.name === 'Technical' && 'Your technical knowledge and clarity in explanations.'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'questions' && (
              <div className="questions-panel">
                <div className="panel">
                  <div className="panel-header">
                    <h3>Question List</h3>
                    <span className="panel-info">All {totalQuestions} questions answered</span>
                  </div>
                  <div className="questions-list">
                    {answers && answers.map((answer, index) => (
                      <div key={index} className="question-item">
                        <div className="question-number-badge">{index + 1}</div>
                        <div className="question-content-item">
                          <div className="question-text-item">{answer.question}</div>
                          <div className="answer-preview">
                            {answer.answer.substring(0, 100)}...
                          </div>
                          <div className="question-score">
                            <span>Score: </span>
                            <span className="score-value">
                              {Math.round((answer.analysis?.communication + answer.analysis?.confidence + answer.analysis?.technicalClarity) / 3)}%
                            </span>
                          </div>
                        </div>
                        <div className="question-status">
                          <span className="status-dot completed"></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'analytics' && (
              <div className="analytics-panel">
                <div className="panel">
                  <div className="panel-header">
                    <h3>Performance Analytics</h3>
                    <span className="panel-info">Detailed insights from your interview</span>
                  </div>
                  <div className="analytics-grid">
                    <div className="analytics-card">
                      <h4>Answer Length Analysis</h4>
                      <div className="analytics-value">{Math.round(avgAnswerLength)}</div>
                      <div className="analytics-label">Average characters per answer</div>
                      <div className="analytics-bar">
                        <div className="analytics-fill" style={{ width: `${Math.min(100, (avgAnswerLength / 200) * 100)}%` }}></div>
                      </div>
                    </div>
                    <div className="analytics-card">
                      <h4>Total Words Spoken</h4>
                      <div className="analytics-value">{totalWords}</div>
                      <div className="analytics-label">Words across all answers</div>
                      <div className="analytics-trend">+{Math.round(totalWords * 0.15)} from average</div>
                    </div>
                    <div className="analytics-card">
                      <h4>Response Time</h4>
                      <div className="analytics-value">2.3s</div>
                      <div className="analytics-label">Average response time</div>
                      <div className="analytics-bar">
                        <div className="analytics-fill" style={{ width: '75%', backgroundColor: '#0F2C1F' }}></div>
                      </div>
                    </div>
                    <div className="analytics-card">
                      <h4>Keyword Usage</h4>
                      <div className="analytics-value">87%</div>
                      <div className="analytics-label">Relevant keywords used</div>
                      <div className="keyword-tags">
                        <span className="keyword-tag">teamwork</span>
                        <span className="keyword-tag">leadership</span>
                        <span className="keyword-tag">problem-solving</span>
                      </div>
                    </div>
                    <div className="analytics-card">
                      <h4>Sentiment Analysis</h4>
                      <div className="analytics-value">Positive</div>
                      <div className="analytics-label">Overall tone detected</div>
                      <div className="sentiment-indicator">
                        <div className="sentiment-bar">
                          <div className="sentiment-fill positive" style={{ width: '82%' }}></div>
                        </div>
                        <div className="sentiment-labels">
                          <span>Negative</span>
                          <span>Neutral</span>
                          <span>Positive</span>
                        </div>
                      </div>
                    </div>
                    <div className="analytics-card">
                      <h4>Performance Trend</h4>
                      <div className="trend-indicator">
                        {overallScore >= 70 ? '📈 Improving' : '📉 Needs Work'}
                      </div>
                      <div className="analytics-label">Overall performance level</div>
                      <div className="trend-chart">
                        <div className="trend-points">
                          <div className="trend-point" style={{ height: '40%' }}></div>
                          <div className="trend-point" style={{ height: '60%' }}></div>
                          <div className="trend-point" style={{ height: '75%' }}></div>
                          <div className="trend-point" style={{ height: '85%' }}></div>
                          <div className="trend-point" style={{ height: '90%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Analytics Section */}
                  <div className="detailed-analytics">
                    <h4>Communication Patterns</h4>
                    <div className="pattern-grid">
                      <div className="pattern-item">
                        <div className="pattern-label">Questions Asked Back</div>
                        <div className="pattern-value">3</div>
                        <div className="pattern-desc">Good engagement level</div>
                      </div>
                      <div className="pattern-item">
                        <div className="pattern-label">Pause Frequency</div>
                        <div className="pattern-value">Low</div>
                        <div className="pattern-desc">Confident delivery</div>
                      </div>
                      <div className="pattern-item">
                        <div className="pattern-label">Structure Score</div>
                        <div className="pattern-value">8.5/10</div>
                        <div className="pattern-desc">Well-organized answers</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="action-btn shortlist-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M16 2L6 12l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Shortlist
            </button>
            <button className="action-btn reject-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Reject
            </button>
            <button className="action-btn primary-btn" onClick={() => navigate('/ai-interview')}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L3 7v11h14V7l-7-5z" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
              Proceed to AI Interview
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ResultPage;

