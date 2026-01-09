import { Question } from '@/types/assessment';

export const questions: Question[] = [
  {
    id: 'q1',
    category: 'quantitative',
    question: 'A train travels 240 km in 4 hours. If it increases its speed by 20 km/h, how long will it take to travel the same distance?',
    options: [
      '2.5 hours',
      '3 hours',
      '3.5 hours',
      '4 hours'
    ],
    correctAnswer: 1,
    explanation: 'Original speed = 240/4 = 60 km/h. New speed = 60 + 20 = 80 km/h. New time = 240/80 = 3 hours.',
    concept: 'Speed, Distance, and Time',
    tip: 'Always find the original speed first, then apply changes. Remember: Time = Distance ÷ Speed',
    difficulty: 'easy',
    steps: [
      {
        title: 'Understand the Formula',
        content: 'The fundamental relationship is: Speed = Distance ÷ Time. We can rearrange this to find any variable.',
        emoji: '📐'
      },
      {
        title: 'Calculate Original Speed',
        content: 'Using the formula: Speed = Distance ÷ Time = 240 ÷ 4 = 60 km/h',
        emoji: '🚂'
      },
      {
        title: 'Calculate New Speed',
        content: 'The train increases its speed by 20 km/h. New Speed = 60 + 20 = 80 km/h',
        emoji: '⚡'
      },
      {
        title: 'Find New Time',
        content: 'Time = Distance ÷ Speed = 240 ÷ 80 = 3 hours',
        emoji: '⏱️'
      }
    ],
    funFact: 'The fastest train in the world, the Shanghai Maglev, travels at 460 km/h!'
  },
  {
    id: 'q2',
    category: 'quantitative',
    question: 'A can complete a work in 12 days. How much work does he do in 1 day?',
    options: [
      '1/6',
      '1/12',
      '1/24',
      '12'
    ],
    correctAnswer: 1,
    explanation: 'If A completes work in 12 days, in 1 day he does 1/12 of the work.',
    concept: 'Time and Work',
    tip: 'If work is done in N days, 1 day\'s work = 1/N of total work',
    difficulty: 'easy',
    steps: [
      {
        title: 'Understand the Concept',
        content: 'Total work is considered as 1 unit. If someone takes N days to complete it, they do 1/N work each day.',
        emoji: '📐'
      },
      {
        title: 'Apply the Formula',
        content: 'A takes 12 days to complete the work. So in 1 day, A does 1/12 of the total work.',
        emoji: '🔧'
      },
      {
        title: 'Verify the Logic',
        content: 'If A does 1/12 work daily, in 12 days: 12 × (1/12) = 1 (complete work). This confirms our answer!',
        emoji: '✅'
      }
    ],
    funFact: 'This concept is used in project management to calculate man-hours and team productivity!'
  },
  {
    id: 'q3',
    category: 'quantitative',
    question: 'Cost price = ₹400, Selling price = ₹500. Find profit %.',
    options: [
      '20%',
      '25%',
      '30%',
      '100%'
    ],
    correctAnswer: 1,
    explanation: 'Profit = SP - CP = 500 - 400 = ₹100. Profit% = (Profit/CP) × 100 = (100/400) × 100 = 25%',
    concept: 'Profit and Loss',
    tip: 'Profit % is always calculated on Cost Price, not Selling Price!',
    difficulty: 'easy',
    steps: [
      {
        title: 'Identify Given Values',
        content: 'Cost Price (CP) = ₹400, Selling Price (SP) = ₹500',
        emoji: '💰'
      },
      {
        title: 'Calculate Profit',
        content: 'Profit = Selling Price - Cost Price = ₹500 - ₹400 = ₹100',
        emoji: '📈'
      },
      {
        title: 'Calculate Profit Percentage',
        content: 'Profit% = (Profit ÷ Cost Price) × 100 = (100 ÷ 400) × 100 = 25%',
        emoji: '✅'
      }
    ],
    funFact: 'Retail businesses typically aim for 25-50% profit margins on products!'
  },
  {
    id: 'q4',
    category: 'quantitative',
    question: 'Find the perimeter of a square of side 8 cm.',
    options: [
      '16 cm',
      '24 cm',
      '32 cm',
      '64 cm'
    ],
    correctAnswer: 2,
    explanation: 'Perimeter of a square = 4 × side = 4 × 8 = 32 cm',
    concept: 'Area and Perimeter',
    tip: 'A square has 4 equal sides, so perimeter = 4 × side length',
    difficulty: 'easy',
    steps: [
      {
        title: 'Understand the Shape',
        content: 'A square has 4 equal sides. The perimeter is the total length around the shape.',
        emoji: '📐'
      },
      {
        title: 'Apply the Formula',
        content: 'Perimeter of Square = 4 × side = 4 × 8 cm = 32 cm',
        emoji: '📏'
      },
      {
        title: 'Verify',
        content: 'Adding all sides: 8 + 8 + 8 + 8 = 32 cm ✓',
        emoji: '✅'
      }
    ],
    funFact: 'The word "perimeter" comes from Greek: "peri" (around) + "metron" (measure)!'
  },
  {
    id: 'q5',
    category: 'quantitative',
    question: 'Find the volume of a cube with side 4 cm.',
    options: [
      '16 cm³',
      '48 cm³',
      '64 cm³',
      '256 cm³'
    ],
    correctAnswer: 2,
    explanation: 'Volume of a cube = side³ = 4³ = 4 × 4 × 4 = 64 cm³',
    concept: 'Surface Area and Volume',
    tip: 'For a cube, Volume = side × side × side = side³',
    difficulty: 'easy',
    steps: [
      {
        title: 'Understand the Shape',
        content: 'A cube has all sides equal. Volume measures how much space it occupies.',
        emoji: '📦'
      },
      {
        title: 'Apply the Formula',
        content: 'Volume of Cube = side × side × side = 4 × 4 × 4 = 64 cm³',
        emoji: '🧮'
      },
      {
        title: 'Visualize',
        content: 'Think of filling the cube with 1cm³ unit cubes: 4 layers × 4 rows × 4 columns = 64 cubes',
        emoji: '✅'
      }
    ],
    funFact: 'A standard Rubik\'s Cube is approximately 5.7 cm on each side!'
  },
  {
    id: 'q6',
    category: 'logical',
    question: 'A is the brother of B. B is the sister of C. How is A related to C?',
    options: [
      'Sister',
      'Brother',
      'Father',
      'Cannot be determined'
    ],
    correctAnswer: 1,
    explanation: 'A is B\'s brother (so A is male). B is C\'s sister. This means A and C are siblings, and since A is male, A is C\'s brother.',
    concept: 'Blood Relations',
    tip: 'Draw a family tree diagram to visualize relationships clearly!',
    difficulty: 'easy',
    steps: [
      {
        title: 'Analyze First Statement',
        content: 'A is the brother of B. This tells us A is male and A & B are siblings.',
        emoji: '👨'
      },
      {
        title: 'Analyze Second Statement',
        content: 'B is the sister of C. This tells us B is female and B & C are siblings.',
        emoji: '👩'
      },
      {
        title: 'Connect the Relations',
        content: 'If A is B\'s sibling and B is C\'s sibling, then A and C are also siblings. Since A is male, A is C\'s brother.',
        emoji: '✅'
      }
    ],
    funFact: 'Blood relation puzzles are a favorite in competitive exams across the world!'
  },
  {
    id: 'q7',
    category: 'logical',
    question: 'If today is Monday, what day will it be after 3 days?',
    options: [
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ],
    correctAnswer: 1,
    explanation: 'Monday + 3 days = Tuesday (1), Wednesday (2), Thursday (3). So the answer is Thursday.',
    concept: 'Calendar Puzzles',
    tip: 'Count the days forward from the current day, not including the current day!',
    difficulty: 'easy',
    steps: [
      {
        title: 'Identify Starting Point',
        content: 'Today is Monday. We need to count 3 days forward.',
        emoji: '📅'
      },
      {
        title: 'Count Forward',
        content: 'Day 1: Tuesday, Day 2: Wednesday, Day 3: Thursday',
        emoji: '➡️'
      },
      {
        title: 'Confirm Answer',
        content: 'After 3 days from Monday, it will be Thursday.',
        emoji: '✅'
      }
    ],
    funFact: 'The 7-day week has been used for over 4,000 years, originating in ancient Babylon!'
  },
  {
    id: 'q8',
    category: 'verbal',
    question: 'Choose the correct sentence:',
    options: [
      'She don\'t like coffee',
      'She doesn\'t likes coffee',
      'She doesn\'t like coffee',
      'She didn\'t likes coffee'
    ],
    correctAnswer: 2,
    explanation: 'With third person singular (she/he/it), we use "doesn\'t" + base form of verb (like, not likes).',
    concept: 'Sentence Correction',
    tip: 'Remember: doesn\'t/don\'t is already the helping verb, so the main verb stays in base form!',
    difficulty: 'easy',
    steps: [
      {
        title: 'Identify the Subject',
        content: '"She" is third person singular, so we need "doesn\'t" (not "don\'t").',
        emoji: '👤'
      },
      {
        title: 'Apply Grammar Rule',
        content: 'After doesn\'t/don\'t, the main verb stays in base form (like), not "likes".',
        emoji: '📝'
      },
      {
        title: 'Verify Each Option',
        content: 'A) Wrong - "don\'t" with she. B) Wrong - "likes" after doesn\'t. C) Correct! D) Wrong - "likes" after didn\'t.',
        emoji: '✅'
      }
    ],
    funFact: 'English is one of the few languages where verbs change based on the subject!'
  },
  {
    id: 'q9',
    category: 'verbal',
    question: '"He go to school every day." Which part has the error?',
    options: [
      'He',
      'go',
      'to school',
      'every day'
    ],
    correctAnswer: 1,
    explanation: 'With third person singular "He", the verb should be "goes" not "go". Correct: He goes to school every day.',
    concept: 'Error Spotting',
    tip: 'Third person singular subjects (he/she/it) require -s/-es ending on present tense verbs!',
    difficulty: 'easy',
    steps: [
      {
        title: 'Identify the Subject',
        content: '"He" is third person singular. This affects the verb form.',
        emoji: '👤'
      },
      {
        title: 'Check Subject-Verb Agreement',
        content: 'Present tense with he/she/it requires the verb to have -s/-es ending. "go" should be "goes".',
        emoji: '🔍'
      },
      {
        title: 'Correct the Sentence',
        content: '"He goes to school every day." The error is in part B (go).',
        emoji: '✅'
      }
    ],
    funFact: 'Subject-verb agreement errors are among the most common mistakes in English!'
  },
  {
    id: 'q10',
    category: 'quantitative',
    question: 'A train runs at 36 km/h. Convert into m/s.',
    options: [
      '5 m/s',
      '10 m/s',
      '15 m/s',
      '36 m/s'
    ],
    correctAnswer: 1,
    explanation: 'To convert km/h to m/s, multiply by 5/18. So 36 × 5/18 = 10 m/s.',
    concept: 'Speed Conversion',
    tip: 'km/h to m/s: multiply by 5/18. m/s to km/h: multiply by 18/5.',
    difficulty: 'easy',
    steps: [
      {
        title: 'Understand the Conversion',
        content: '1 km = 1000 m, 1 hour = 3600 seconds. So 1 km/h = 1000/3600 = 5/18 m/s.',
        emoji: '📐'
      },
      {
        title: 'Apply the Formula',
        content: 'Speed in m/s = Speed in km/h × (5/18) = 36 × 5/18 = 180/18 = 10 m/s',
        emoji: '🧮'
      },
      {
        title: 'Verify',
        content: '10 m/s × 3600 seconds = 36,000 m = 36 km per hour ✓',
        emoji: '✅'
      }
    ],
    funFact: 'Usain Bolt\'s top speed of 44.72 km/h equals about 12.4 m/s!'
  }
];

export const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    quantitative: 'Quantitative Aptitude',
    logical: 'Logical Reasoning',
    verbal: 'Verbal Ability',
    analytical: 'Analytical Ability'
  };
  return labels[category] || category;
};

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    quantitative: 'from-primary to-secondary',
    logical: 'from-secondary to-accent',
    verbal: 'from-accent to-primary',
    analytical: 'from-primary to-accent'
  };
  return colors[category] || 'from-gray-500 to-gray-600';
};

export const getDifficultyColor = (difficulty: string): string => {
  const colors: Record<string, string> = {
    easy: 'text-secondary',
    medium: 'text-accent',
    hard: 'text-destructive'
  };
  return colors[difficulty] || 'text-muted-foreground';
};
