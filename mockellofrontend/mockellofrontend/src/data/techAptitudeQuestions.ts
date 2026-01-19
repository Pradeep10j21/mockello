
export interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number; // Index of the correct option
    section: string; // e.g., 'DBMS', 'Circuit Theory', 'Thermodynamics'
    department: string; // 'CSE', 'ECE', 'MECH', etc.
}

export const TECH_APTITUDE_QUESTIONS: Record<string, Question[]> = {
    'CSE': [
        // DBMS
        { id: 1, question: "What is the primary key in a database?", options: ["A key that uniquely identifies a record", "A key that links two tables", "A key that allows duplicate values", "A key used for encryption"], correctAnswer: 0, section: "DBMS", department: "CSE" },
        { id: 2, question: "Which SQL command is used to retrieve data?", options: ["UPDATE", "DELETE", "SELECT", "INSERT"], correctAnswer: 2, section: "DBMS", department: "CSE" },
        { id: 3, question: "What does ACID stand for in databases?", options: ["Atomicity, Consistency, Isolation, Durability", "Accuracy, Consistency, Isolation, Data", "Atomicity, Clarity, Isolation, Durability", "Atomicity, Consistency, Integrity, Durability"], correctAnswer: 0, section: "DBMS", department: "CSE" },

        // OS
        { id: 4, question: "What is a deadlock?", options: ["A situation where two processes are waiting for each other", "A process that never terminates", "A system crash", "A security breach"], correctAnswer: 0, section: "Operating Systems", department: "CSE" },
        { id: 5, question: "Which scheduling algorithm is non-preemptive?", options: ["Round Robin", "FCFS", "SRTF", "Priority Scheduling"], correctAnswer: 1, section: "Operating Systems", department: "CSE" },

        // Networking
        { id: 6, question: "Which layer of the OSI model does IP work on?", options: ["Transport", "Network", "Data Link", "Physical"], correctAnswer: 1, section: "Networking", department: "CSE" },
        { id: 7, question: "What is the port number for HTTP?", options: ["21", "22", "80", "443"], correctAnswer: 2, section: "Networking", department: "CSE" },

        // DSA
        { id: 8, question: "What is the time complexity of binary search?", options: ["O(n)", "O(n^2)", "O(log n)", "O(1)"], correctAnswer: 2, section: "DSA", department: "CSE" },
        { id: 9, question: "Which data structure follows LIFO?", options: ["Queue", "Stack", "List", "Tree"], correctAnswer: 1, section: "DSA", department: "CSE" },
    ],
    'ECE': [
        // Digital Electronics
        { id: 101, question: "Which gate is known as the universal gate?", options: ["AND", "OR", "NAND", "XOR"], correctAnswer: 2, section: "Digital Electronics", department: "ECE" },
        { id: 102, question: "Number of bits in a nibble is?", options: ["4", "8", "16", "32"], correctAnswer: 0, section: "Digital Electronics", department: "ECE" },

        // Signals
        { id: 103, question: "Fourier transform converts time domain to?", options: ["Frequency Domain", "Time Domain", "Phase Domain", "Complex Domain"], correctAnswer: 0, section: "Signals & Systems", department: "ECE" },

        // Analog
        { id: 104, question: "An ideal Op-Amp has infinite what?", options: ["Gain", "Output Impedance", "Noise", "Cost"], correctAnswer: 0, section: "Analog Circuits", department: "ECE" },
    ],
    'Mechanical': [
        // Thermodynamics
        { id: 201, question: "First law of thermodynamics deals with?", options: ["Conservation of Mass", "Conservation of Energy", "Entropy", "Heat Transfer"], correctAnswer: 1, section: "Thermodynamics", department: "Mechanical" },

        // SOM
        { id: 202, question: "Hooke's law holds good up to?", options: ["Yield point", "Elastic limit", "Plastic limit", "Breaking point"], correctAnswer: 1, section: "Strength of Materials", department: "Mechanical" },
    ],
    'Civil': [
        { id: 301, question: "Specific gravity of cement is?", options: ["3.15", "2.5", "1.5", "4.0"], correctAnswer: 0, section: "Building Materials", department: "Civil" },
    ],
    'Electrical': [
        { id: 401, question: "Unit of capacitance is?", options: ["Farad", "Henry", "Ohm", "Watt"], correctAnswer: 0, section: "Circuits", department: "Electrical" },
    ]
};
