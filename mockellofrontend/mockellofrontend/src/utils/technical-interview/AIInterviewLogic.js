const domainQuestionBanks = {
  'CSE': {
    'Frontend (React)': [
      { question: 'Explain the Virtual DOM and how it improves performance.', category: 'Technical', difficulty: 'Intermediate' },
      { question: 'What are React Hooks? Explain useState and useEffect.', category: 'Technical', difficulty: 'Beginner' },
      { question: 'How do you handle state management in a large application?', category: 'System Design', difficulty: 'Advanced' },
      { question: 'Explain the difference between props and state.', category: 'Technical', difficulty: 'Beginner' },
      { question: 'How would you optimize a React app that is rendering slowly?', category: 'Performance', difficulty: 'Advanced' }
    ],
    'Backend (Node.js)': [
      { question: 'Explain the Event Loop in Node.js.', category: 'Technical', difficulty: 'Intermediate' },
      { question: 'How would you handle asynchronous operations in Node.js?', category: 'Technical', difficulty: 'Intermediate' },
      { question: 'Design a RESTful API for a user management system.', category: 'System Design', difficulty: 'Advanced' },
      { question: 'What is middleware in Express.js?', category: 'Technical', difficulty: 'Beginner' },
      { question: 'How do you handle database connections in a serverless environment?', category: 'System Design', difficulty: 'Advanced' }
    ],
    'Full Stack': [
      { question: 'Explain how you would architect a full-stack application from scratch.', category: 'System Design', difficulty: 'Advanced' },
      { question: 'How do you handle CORS issues?', category: 'Technical', difficulty: 'Intermediate' },
      { question: 'Compare SQL vs NoSQL. When would you use which?', category: 'Technical', difficulty: 'Intermediate' },
      { question: 'How does authentication work between a frontend and backend?', category: 'Security', difficulty: 'Intermediate' },
      { question: 'Explain the concept of microservices.', category: 'System Design', difficulty: 'Advanced' }
    ]
  },
  'IT': {
    'Network Administration': [
      { question: 'Explain the OSI model layers.', category: 'Technical', difficulty: 'Intermediate' },
      { question: 'What is the difference between TCP and UDP?', category: 'Technical', difficulty: 'Beginner' },
      { question: 'How do you troubleshoot a network connectivity issue?', category: 'Practical', difficulty: 'Intermediate' }
    ]
  }
};

// Generic Questions Generator if specific domain missing
function generateGenericQuestions(domain) {
  return [
    { question: `Tell me about your experience with ${domain}.`, category: 'Introduction', difficulty: 'Easy' },
    { question: `What are the key core concepts in ${domain}?`, category: 'Technical', difficulty: 'Medium' },
    { question: `Describe a challenging project related to ${domain}.`, category: 'Behavioral', difficulty: 'Medium' },
    { question: `How do you stay updated with trends in ${domain}?`, category: 'General', difficulty: 'Easy' },
    { question: `Explain a complex ${domain} concept to a beginner.`, category: 'Communication', difficulty: 'Hard' }
  ];
}

// Fallback questions if specific domain not found
const defaultQuestions = [
  { question: 'Tell me about yourself and your technical background.', category: 'Introduction', difficulty: 'Easy' },
  { question: 'Describe a challenging technical problem you solved.', category: 'Behavioral', difficulty: 'Medium' },
  { question: 'Where do you see yourself in 5 years?', category: 'General', difficulty: 'Easy' }
];

export function getQuestionsForDomain(department, domain, difficulty) {
  if (!department || !domain) return defaultQuestions;

  // Try to find specific questions
  if (domainQuestionBanks[department] && domainQuestionBanks[department][domain]) {
    return domainQuestionBanks[department][domain];
  }

  // Fallback: Generate generic questions for the domain
  return generateGenericQuestions(domain);
}

// Keep backward compatibility if needed, or just export dummy
export function getQuestionsForCompany(companyId) {
  return defaultQuestions;
}

export function analyzeAnswer(answerText, question) {
  if (!answerText || answerText.trim().length === 0) {
    return {
      communication: 0,
      confidence: 0,
      technicalClarity: 0,
      length: 0
    };
  }

  const text = answerText.trim();
  const wordCount = text.split(/\s+/).length;
  const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const charCount = text.length;

  const technicalKeywords = [
    'algorithm', 'data structure', 'optimization', 'scalability', 'performance',
    'architecture', 'design pattern', 'API', 'database', 'framework', 'library',
    'component', 'system', 'implementation', 'solution', 'approach', 'method',
    'technique', 'best practice', 'efficiency', 'complexity', 'async', 'sync',
    'cache', 'load', 'balance', 'microservice', 'container', 'deploy'
  ];

  const confidenceKeywords = [
    'I believe', 'I think', 'I would', 'I can', 'I have', 'I am confident',
    'definitely', 'certainly', 'absolutely', 'clearly', 'obviously'
  ];

  const hesitationWords = ['um', 'uh', 'like', 'you know', 'sort of', 'kind of'];

  const technicalScore = technicalKeywords.reduce((score, keyword) => {
    return score + (text.toLowerCase().includes(keyword.toLowerCase()) ? 1 : 0);
  }, 0);

  const confidenceScore = confidenceKeywords.reduce((score, keyword) => {
    return score + (text.toLowerCase().includes(keyword.toLowerCase()) ? 1 : 0);
  }, 0);

  const hesitationCount = hesitationWords.reduce((count, word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = text.match(regex);
    return count + (matches ? matches.length : 0);
  }, 0);

  let communicationScore = 70;
  if (wordCount < 20) communicationScore -= 20;
  else if (wordCount < 50) communicationScore -= 10;
  if (sentenceCount < 2) communicationScore -= 15;
  if (hesitationCount > 3) communicationScore -= 15;
  communicationScore = Math.max(0, Math.min(100, communicationScore));

  let confidenceScoreFinal = 50;
  if (confidenceScore > 0) confidenceScoreFinal += Math.min(30, confidenceScore * 5);
  if (hesitationCount > 2) confidenceScoreFinal -= hesitationCount * 5;
  if (wordCount > 30) confidenceScoreFinal += 10;
  confidenceScoreFinal = Math.max(0, Math.min(100, confidenceScoreFinal));

  let technicalScoreFinal = 50;
  if (technicalScore > 0) technicalScoreFinal += Math.min(40, technicalScore * 8);
  if (wordCount > 50) technicalScoreFinal += 10;
  if (question.category === 'Technical' || question.category === 'System Design') {
    if (technicalScore > 2) technicalScoreFinal += 10;
  }
  technicalScoreFinal = Math.max(0, Math.min(100, technicalScoreFinal));

  return {
    communication: Math.round(communicationScore),
    confidence: Math.round(confidenceScoreFinal),
    technicalClarity: Math.round(technicalScoreFinal),
    length: charCount,
    wordCount,
    sentenceCount
  };
}

