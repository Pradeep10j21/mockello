const questionBanks = {
  google: [
    {
      question: 'Tell me about yourself and why you want to work at Google.',
      category: 'Introduction',
      difficulty: 'Easy'
    },
    {
      question: 'Explain how you would optimize a slow database query.',
      category: 'Technical',
      difficulty: 'Hard'
    },
    {
      question: 'Describe a challenging project you worked on and how you overcame obstacles.',
      category: 'Behavioral',
      difficulty: 'Medium'
    },
    {
      question: 'How would you design a scalable system to handle millions of requests?',
      category: 'System Design',
      difficulty: 'Hard'
    },
    {
      question: 'What is your approach to debugging a complex issue?',
      category: 'Problem Solving',
      difficulty: 'Medium'
    }
  ],
  microsoft: [
    {
      question: 'Why are you interested in working at Microsoft?',
      category: 'Introduction',
      difficulty: 'Easy'
    },
    {
      question: 'Explain the difference between REST and GraphQL.',
      category: 'Technical',
      difficulty: 'Medium'
    },
    {
      question: 'Tell me about a time you had to work with a difficult team member.',
      category: 'Behavioral',
      difficulty: 'Medium'
    },
    {
      question: 'How would you implement authentication and authorization in a web application?',
      category: 'Security',
      difficulty: 'Hard'
    },
    {
      question: 'Describe your experience with cloud platforms like Azure.',
      category: 'Technical',
      difficulty: 'Medium'
    }
  ],
  amazon: [
    {
      question: 'What do you know about Amazon\'s leadership principles?',
      category: 'Company Culture',
      difficulty: 'Easy'
    },
    {
      question: 'Explain how you would implement a caching strategy.',
      category: 'Technical',
      difficulty: 'Medium'
    },
    {
      question: 'Tell me about a time you had to meet a tight deadline.',
      category: 'Behavioral',
      difficulty: 'Medium'
    },
    {
      question: 'How would you design a recommendation system?',
      category: 'System Design',
      difficulty: 'Hard'
    },
    {
      question: 'What is your experience with microservices architecture?',
      category: 'Technical',
      difficulty: 'Hard'
    }
  ],
  meta: [
    {
      question: 'Why do you want to work at Meta?',
      category: 'Introduction',
      difficulty: 'Easy'
    },
    {
      question: 'Explain React hooks and when to use them.',
      category: 'Technical',
      difficulty: 'Medium'
    },
    {
      question: 'Describe a project where you had to learn a new technology quickly.',
      category: 'Behavioral',
      difficulty: 'Medium'
    },
    {
      question: 'How would you optimize a React application for performance?',
      category: 'Technical',
      difficulty: 'Hard'
    },
    {
      question: 'What is your approach to state management in large applications?',
      category: 'Technical',
      difficulty: 'Hard'
    }
  ],
  apple: [
    {
      question: 'What attracts you to Apple as a company?',
      category: 'Introduction',
      difficulty: 'Easy'
    },
    {
      question: 'Explain memory management in iOS development.',
      category: 'Technical',
      difficulty: 'Hard'
    },
    {
      question: 'Tell me about a time you had to balance user experience with technical constraints.',
      category: 'Behavioral',
      difficulty: 'Medium'
    },
    {
      question: 'How would you design a smooth scrolling list with thousands of items?',
      category: 'Performance',
      difficulty: 'Hard'
    },
    {
      question: 'What is your experience with Swift and Objective-C?',
      category: 'Technical',
      difficulty: 'Medium'
    }
  ],
  netflix: [
    {
      question: 'Why are you interested in working at Netflix?',
      category: 'Introduction',
      difficulty: 'Easy'
    },
    {
      question: 'Explain how you would handle high-traffic scenarios.',
      category: 'Technical',
      difficulty: 'Hard'
    },
    {
      question: 'Describe a time you had to make a critical decision under pressure.',
      category: 'Behavioral',
      difficulty: 'Medium'
    },
    {
      question: 'How would you design a video streaming platform?',
      category: 'System Design',
      difficulty: 'Hard'
    },
    {
      question: 'What is your approach to handling large-scale data processing?',
      category: 'Technical',
      difficulty: 'Hard'
    }
  ]
};

export function getQuestionsForCompany(companyId) {
  if (!companyId) {
    return questionBanks.google || [];
  }
  return questionBanks[companyId] || questionBanks.google || [];
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

