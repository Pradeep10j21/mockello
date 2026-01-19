export interface Question {
    id: number;
    department: string;
    section: string;
    question: string;
    options: string[];
    correctAnswer: number;
    type?: 'mcq' | 'programming';
}

export const TECH_PREP_QUESTIONS: Question[] = [
    // --- CSE / IT ---
    {
        id: 1,
        department: "CSE/IT",
        section: "DBMS",
        question: "What does ACID stand for in database transactions?",
        options: [
            "Atomicity, Consistency, Isolation, Durability",
            "Association, Consistency, Integrity, Durability",
            "Atomicity, Concurrency, Isolation, Data",
            "Association, Concurrency, Integrity, Data"
        ],
        correctAnswer: 0
    },
    {
        id: 2,
        department: "CSE/IT",
        section: "DBMS",
        question: "Which normal form eliminates transitive dependency?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        correctAnswer: 2
    },
    {
        id: 3,
        department: "CSE/IT",
        section: "OS",
        question: "What is a deadlock in OS?",
        options: [
            "A situation where two processes wait for each other",
            "When a process finishes execution",
            "When the system is idling",
            "A type of memory allocation"
        ],
        correctAnswer: 0
    },
    {
        id: 4,
        department: "CSE/IT",
        section: "Networking",
        question: "Which layer of the OSI model is responsible for routing?",
        options: ["Transport Layer", "Network Layer", "Data Link Layer", "Physical Layer"],
        correctAnswer: 1
    },
    {
        id: 5,
        department: "CSE/IT",
        section: "DSA",
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        correctAnswer: 1
    },
    {
        id: 6,
        department: "CSE/IT",
        section: "DBMS",
        question: "What is a primary key?",
        options: ["A key that can be null", "A unique identifier for a row", "A key used for encryption", "A type of foreign key"],
        correctAnswer: 1
    },
    {
        id: 7,
        department: "CSE/IT",
        section: "OS",
        question: "What is virtual memory?",
        options: ["RAM that is physically removable", "Memory used by a virtual machine", "Technique using hardware and software to allow a computer to compensate for physical memory shortages", "A type of cache"],
        correctAnswer: 2
    },
    {
        id: 8,
        department: "CSE/IT",
        section: "Networking",
        question: "What is the purpose of HTTP?",
        options: ["Transferring mail", "Transferring hypertext", "Transferring large files", "Network management"],
        correctAnswer: 1
    },
    {
        id: 9,
        department: "CSE/IT",
        section: "DSA",
        question: "What is a linked list?",
        options: ["A collection of elements stored at contiguous memory locations", "A linear data structure where each element is a separate object", "A type of tree", "A sorted array"],
        correctAnswer: 1
    },
    // --- ECE ---
    {
        id: 101,
        department: "ECE",
        section: "Digital Electronics",
        question: "How many flip-flops are required to construct a mod-10 counter?",
        options: ["3", "4", "5", "10"],
        correctAnswer: 1
    },
    {
        id: 102,
        department: "ECE",
        section: "Microprocessors",
        question: "Which of the following is an 8-bit microprocessor?",
        options: ["Intel 8085", "Intel 8086", "Intel 80386", "Pentium"],
        correctAnswer: 0
    },
    {
        id: 103,
        department: "ECE",
        section: "Communication Systems",
        question: "What is the bandwidth of a signal whose frequency ranges from 40 kHz to 100 kHz?",
        options: ["40 kHz", "140 kHz", "60 kHz", "100 kHz"],
        correctAnswer: 2
    },
    { id: 104, department: "ECE", section: "Digital Electronics", question: "What is a multiplexer?", options: ["Many-to-one circuit", "One-to-many circuit", "One-to-one circuit", "None of these"], correctAnswer: 0 },
    { id: 105, department: "ECE", section: "Microprocessors", question: "ALU stands for?", options: ["Arithmetic Logic Unit", "Array Logic Unit", "Access Logic Unit", "All Logic Unit"], correctAnswer: 0 },
    { id: 106, department: "ECE", section: "Communication Systems", question: "What is FM?", options: ["Frequency Modulation", "Format Mode", "Fast Movement", "Fiber Media"], correctAnswer: 0 },
    { id: 107, department: "ECE", section: "Digital Electronics", question: "A gate whose output is high only if all inputs are high:", options: ["OR", "AND", "XOR", "NAND"], correctAnswer: 1 },
    { id: 108, department: "ECE", section: "Microprocessors", question: "The address bus is?", options: ["Unidirectional", "Bidirectional", "Omnidirectional", "None"], correctAnswer: 0 },
    { id: 109, department: "ECE", section: "Communication Systems", question: "What is an antenna?", options: ["Transducer", "Inverter", "Rectifier", "Filter"], correctAnswer: 0 },
    { id: 110, department: "ECE", section: "Digital Electronics", question: "Which logic gate is universal?", options: ["AND", "OR", "NAND", "NOT"], correctAnswer: 2 },
    { id: 111, department: "ECE", section: "Microprocessors", question: "Stack Pointer is a?", options: ["8-bit register", "16-bit register", "32-bit register", "1-bit flag"], correctAnswer: 1 },
    { id: 112, department: "ECE", section: "Communication Systems", question: "What is Sampling Theorem?", options: ["Nyquist", "Fourier", "Ohm", "Faraday"], correctAnswer: 0 },
    { id: 113, department: "ECE", section: "Digital Electronics", question: "Hexadecimal base is?", options: ["2", "8", "10", "16"], correctAnswer: 3 },
    { id: 114, department: "ECE", section: "Microprocessors", question: "Interrupts are?", options: ["Hardware only", "Software only", "Both", "None"], correctAnswer: 2 },
    { id: 115, department: "ECE", section: "Communication Systems", question: "What is Fiber Optics?", options: ["Slow media", "Media using light pulses", "Copper media", "Air media"], correctAnswer: 1 },
    { id: 116, department: "ECE", section: "Digital Electronics", question: "What is a Flip Flop?", options: ["Combinational circuit", "Sequential circuit", "Memory-less circuit", "None"], correctAnswer: 1 },
    { id: 117, department: "ECE", section: "Microprocessors", question: "Program Counter stores?", options: ["Current data", "Next instruction address", "Last result", "Error code"], correctAnswer: 1 },
    { id: 118, department: "ECE", section: "Communication Systems", question: "What is noise in signal?", options: ["Desired signal", "Unwanted interference", "Amplified signal", "None"], correctAnswer: 1 },
    { id: 119, department: "ECE", section: "Digital Electronics", question: "A Half Adder has?", options: ["2 inputs", "3 inputs", "4 inputs", "1 input"], correctAnswer: 0 },
    { id: 120, department: "ECE", section: "Microprocessors", question: "RAM is?", options: ["Non-volatile", "Volatile", "Read-only", "None"], correctAnswer: 1 },
    { id: 121, department: "ECE", section: "Communication Systems", question: "Modem stands for?", options: ["Modern Device", "Modulator-Demodulator", "Model Medium", "Mode EM"], correctAnswer: 1 },
    { id: 122, department: "ECE", section: "Digital Electronics", question: "S-R Flip Flop 'S' stands for?", options: ["Select", "Set", "Source", "Sum"], correctAnswer: 1 },
    { id: 123, department: "ECE", section: "Microprocessors", question: "ROM is used for?", options: ["Temporary storage", "Permanent storage (Firmware)", "Cache", "Input data"], correctAnswer: 1 },
    { id: 124, department: "ECE", section: "Communication Systems", question: "Satellite communication uses?", options: ["Ground waves", "Microwaves", "Sound waves", "Light waves"], correctAnswer: 1 },
    { id: 125, department: "ECE", section: "Digital Electronics", question: "Logic 0 in digital is usually?", options: ["+5V", "0V", "12V", "Any voltage"], correctAnswer: 1 },
    { id: 126, department: "ECE", section: "Microprocessors", question: "Fetch cycle occurs?", options: ["After execution", "Before execution", "During execution", "Never"], correctAnswer: 1 },
    { id: 127, department: "ECE", section: "Communication Systems", question: "AM stands for?", options: ["Analog Mode", "Amplitude Modulation", "Array Mode", "None"], correctAnswer: 1 },
    { id: 128, department: "ECE", section: "Digital Electronics", question: "BCD stands for?", options: ["Binary Coded Decimal", "Base Code Data", "Binary Core Device", "None"], correctAnswer: 0 },

    // --- Mechanical ---
    {
        id: 201,
        department: "Mechanical",
        section: "Thermodynamics",
        question: "Which law of thermodynamics defines the concept of temperature?",
        options: ["First Law", "Second Law", "Third Law", "Zeroth Law"],
        correctAnswer: 3
    },
    {
        id: 202,
        department: "Mechanical",
        section: "Fluid Mechanics",
        question: "What is the unit of dynamic viscosity?",
        options: ["Poise", "Stokes", "Pascal", "Newton"],
        correctAnswer: 0
    },
    { id: 203, department: "Mechanical", section: "Thermodynamics", question: "Entropy remains constant in which process?", options: ["Isothermal", "Adiabatic", "Isentropic", "Isobaric"], correctAnswer: 2 },
    { id: 204, department: "Mechanical", section: "Fluid Mechanics", question: "Bernoulli's equation is based on?", options: ["Conservation of mass", "Conservation of energy", "Conservation of momentum", "None"], correctAnswer: 1 },
    { id: 205, department: "Mechanical", section: "Material Science", question: "What is hardness?", options: ["Resistance to fracture", "Resistance to scratch/indentation", "Resistance to pull", "Resistance to pressure"], correctAnswer: 1 },
    { id: 206, department: "Mechanical", section: "Machine Design", question: "What is a factor of safety?", options: ["Yield strength / Allowable stress", "Allowable stress / Yield strength", "Total load / Area", "None"], correctAnswer: 0 },
    { id: 207, department: "Mechanical", section: "Thermodynamics", question: "Ideal gas equation?", options: ["PV=RT", "P=VRT", "PV=nRT", "V=PRT"], correctAnswer: 2 },
    { id: 208, department: "Mechanical", section: "Fluid Mechanics", question: "Pascal's law relates to?", options: ["Fluid at rest", "Fluid in motion", "Speed of fluid", "None"], correctAnswer: 0 },
    { id: 209, department: "Mechanical", section: "Material Science", question: "What is ductility?", options: ["Capacity to be drawn into wires", "Capacity to be hammered into sheets", "Brittleness", "Strength"], correctAnswer: 0 },
    { id: 210, department: "Mechanical", section: "Machine Design", question: "Which gear is used for intersecting shafts?", options: ["Spur", "Helical", "Bevel", "Worm"], correctAnswer: 2 },
    { id: 211, department: "Mechanical", section: "Thermodynamics", question: "Heat transfer by direct contact?", options: ["Conduction", "Convection", "Radiation", "None"], correctAnswer: 0 },
    { id: 212, department: "Mechanical", section: "Fluid Mechanics", question: "Unit of pressure?", options: ["Joule", "Watt", "Pascal", "Newton"], correctAnswer: 2 },
    { id: 213, department: "Mechanical", section: "Material Science", question: "Steel is an alloy of?", options: ["Iron & Carbon", "Iron & Copper", "Copper & Zinc", "None"], correctAnswer: 0 },
    { id: 214, department: "Mechanical", section: "Machine Design", question: "What is a key in mechanics?", options: ["Tool to open locks", "Fastening device between shaft and hub", "A type of spring", "Part of an engine"], correctAnswer: 1 },
    { id: 215, department: "Mechanical", section: "Thermodynamics", question: "Boiling point of water in Kelvin?", options: ["100K", "273K", "373K", "0K"], correctAnswer: 2 },
    { id: 216, department: "Mechanical", section: "Fluid Mechanics", question: "Viscosity of water compared to air?", options: ["Higher", "Lower", "Same", "Zero"], correctAnswer: 0 },
    { id: 217, department: "Mechanical", section: "Material Science", question: "What is fatigue?", options: ["Metal failure under static load", "Metal failure under cyclic load", "Metal bending", "None"], correctAnswer: 1 },
    { id: 218, department: "Mechanical", section: "Machine Design", question: "Hooke's Law holds up to?", options: ["Yield point", "Elastic limit", "Proportional limit", "Breaking point"], correctAnswer: 2 },
    { id: 219, department: "Mechanical", section: "Thermodynamics", question: "Rankine cycle is used in?", options: ["Gas turbines", "Steam power plants", "IC engines", "Refrigerators"], correctAnswer: 1 },
    { id: 220, department: "Mechanical", section: "Fluid Mechanics", question: "Density of water is max at?", options: ["0°C", "100°C", "4°C", "20°C"], correctAnswer: 2 },
    { id: 221, department: "Mechanical", section: "Material Science", question: "What is quenching?", options: ["Heating metal", "Rapid cooling of metal", "Cold working", "Cutting metal"], correctAnswer: 1 },
    { id: 222, department: "Mechanical", section: "Machine Design", question: "Stress is?", options: ["Force x Area", "Force / Area", "Force + Area", "Area / Force"], correctAnswer: 1 },
    { id: 223, department: "Mechanical", section: "Thermodynamics", question: "Specific heat of water?", options: ["1 cal/g°C", "0.5 cal/g°C", "2 cal/g°C", "None"], correctAnswer: 0 },
    { id: 224, department: "Mechanical", section: "Fluid Mechanics", question: "Cavitation occurs due to?", options: ["High pressure", "Low pressure (below vapor pressure)", "High speed", "None"], correctAnswer: 1 },
    { id: 225, department: "Mechanical", section: "Material Science", question: "Cast iron contains carbon?", options: [">2%", "<2%", "0.5%", "Zero"], correctAnswer: 0 },
    { id: 226, department: "Mechanical", section: "Machine Design", question: "A cantilever beam is fixed at?", options: ["One end", "Both ends", "Center", "None"], correctAnswer: 0 },
    { id: 227, department: "Mechanical", section: "Thermodynamics", question: "Efficiency of Carnot engine depends on?", options: ["Working fluid", "Temperature limits", "Speed", "Size"], correctAnswer: 1 },
    { id: 228, department: "Mechanical", section: "Fluid Mechanics", question: "Unit of flow rate?", options: ["Liters/sec", "m³/sec", "kg/sec", "All are possible"], correctAnswer: 3 },
    {
        id: 10,
        department: "CSE/IT",
        section: "DBMS",
        question: "Which SQL command is used to remove all rows from a table?",
        options: ["DELETE", "REMOVE", "TRUNCATE", "DROP"],
        correctAnswer: 2
    },
    {
        id: 11,
        department: "CSE/IT",
        section: "OS",
        question: "What is a process syncronization tool?",
        options: ["Semaphore", "Thread", "Wait", "Interrupt"],
        correctAnswer: 0
    },
    {
        id: 12,
        department: "CSE/IT",
        section: "Networking",
        question: "Which protocol is used for securely browsing the web?",
        options: ["HTTP", "FTP", "HTTPS", "SSH"],
        correctAnswer: 2
    },
    {
        id: 13,
        department: "CSE/IT",
        section: "DSA",
        question: "Which data structure follows LIFO principal?",
        options: ["Queue", "Stack", "Tree", "Graph"],
        correctAnswer: 1
    },
    {
        id: 14,
        department: "CSE/IT",
        section: "DBMS",
        question: "What is NoSQL?",
        options: ["Not Only SQL", "No Support for SQL", "New SQL", "Native SQL"],
        correctAnswer: 0
    },
    {
        id: 15,
        department: "CSE/IT",
        section: "OS",
        question: "What is paging?",
        options: ["Memory management scheme", "A way to print documents", "A search algorithm", "A debugging tool"],
        correctAnswer: 0
    },
    {
        id: 16,
        department: "CSE/IT",
        section: "Networking",
        question: "What is an IP address?",
        options: ["Identity Provider", "Internet Protocol", "Internal Program", "Internet Packet"],
        correctAnswer: 1
    },
    {
        id: 17,
        department: "CSE/IT",
        section: "DSA",
        question: "What is the time complexity of Quick Sort (average case)?",
        options: ["O(n)", "O(n²)", "O(n log n)", "O(log n)"],
        correctAnswer: 2
    },
    {
        id: 18,
        department: "CSE/IT",
        section: "DBMS",
        question: "What is a Foreign Key?",
        options: ["Primary key of another table", "Any field that is not a primary key", "A key generated from external systems", "A key used in Join operations only"],
        correctAnswer: 0
    },
    {
        id: 19,
        department: "CSE/IT",
        section: "OS",
        question: "What is a thread?",
        options: ["Full process", "Lighter version of a process", "A segment of code", "A hardware component"],
        correctAnswer: 1
    },
    {
        id: 20,
        department: "CSE/IT",
        section: "Networking",
        question: "Which device is used to connect multiple networks?",
        options: ["Switch", "Hub", "Router", "Bridge"],
        correctAnswer: 2
    },
    {
        id: 21,
        department: "CSE/IT",
        section: "DSA",
        question: "What is a Full Binary Tree?",
        options: ["Every node has 0 or 2 children", "Every node has 2 children", "All leaves are at the same level", "A tree with all nodes filled"],
        correctAnswer: 0
    },
    {
        id: 22,
        department: "CSE/IT",
        section: "DBMS",
        question: "What is Denormalization?",
        options: ["Removing redundancy", "Adding redundancy to improve performance", "Creating new tables", "Deleting indices"],
        correctAnswer: 1
    },
    {
        id: 23,
        department: "CSE/IT",
        section: "OS",
        question: "What is Kernel?",
        options: ["The graphics engine", "The core part of any OS", "A system application", "A bootloader"],
        correctAnswer: 1
    },
    {
        id: 24,
        department: "CSE/IT",
        section: "Networking",
        question: "What is DNS?",
        options: ["Digital Network System", "Data Name Service", "Domain Name System", "Dynamic Network Service"],
        correctAnswer: 2
    },
    {
        id: 25,
        department: "CSE/IT",
        section: "DSA",
        question: "Which algorithm is used to find the shortest path in a graph?",
        options: ["Kruskal", "Prim", "Dijkstra", "Bellman-Ford"],
        correctAnswer: 2
    },
    {
        id: 26,
        department: "CSE/IT",
        section: "DBMS",
        question: "What is a data dictionary?",
        options: ["A list of all users", "Metadata about the database", "A backup system", "A programming language"],
        correctAnswer: 1
    },
    {
        id: 27,
        department: "CSE/IT",
        section: "OS",
        question: "What is context switching?",
        options: ["Changing the UI", "Switching CPU from one process to another", "Allocating RAM", "Rebooting the system"],
        correctAnswer: 1
    },
    {
        id: 28,
        department: "CSE/IT",
        section: "Networking",
        question: "What is a Firewall?",
        options: ["A physical barrier against fire", "A security system that monitors network traffic", "A high-speed cable", "A computer room cooling system"],
        correctAnswer: 1
    },
    {
        id: 29,
        department: "CSE/IT",
        section: "Programming",
        question: "Write a function to check if a given number is Prime.",
        options: [],
        correctAnswer: -1,
        type: 'programming'
    },
    {
        id: 30,
        department: "CSE/IT",
        section: "Programming",
        question: "Write a program to reverse a string without using built-in reverse functions.",
        options: [],
        correctAnswer: -1,
        type: 'programming'
    },

    // --- B.Com (Finance) ---
    {
        id: 401,
        department: "B.Com (Finance)",
        section: "Financial Accounting",
        question: "Which of the following is a liability?",
        options: ["Cash", "Accounts Receivable", "Accounts Payable", "Inventory"],
        correctAnswer: 2
    },
    {
        id: 402,
        department: "B.Com (Finance)",
        section: "Taxation",
        question: "What is the full form of GST?",
        options: ["General Sales Tax", "Goods and Services Tax", "Government Service Tax", "Global Sales Trade"],
        correctAnswer: 1
    },
    {
        id: 403,
        department: "B.Com (Finance)",
        section: "Economics",
        question: "When demand for a product is greater than its supply, the price tends to:",
        options: ["Decrease", "Increase", "Remain same", "Collapse"],
        correctAnswer: 1
    },
    {
        id: 404,
        department: "B.Com (Finance)",
        section: "Banking",
        question: "Which of the following is the central bank of India?",
        options: ["State Bank of India", "HDFC Bank", "Reserve Bank of India", "ICICI Bank"],
        correctAnswer: 2
    },
    {
        id: 405,
        department: "B.Com (Finance)",
        section: "Financial Accounting",
        question: "The 'Double Entry' system involves:",
        options: ["Recording twice in same book", "Recording in two farklı books", "Recording debit and credit for every transaction", "None of these"],
        correctAnswer: 2
    },
    {
        id: 406,
        department: "B.Com (Finance)",
        section: "Taxation",
        question: "Who is liable to pay Income Tax?",
        options: ["Only corporates", "Every citizen earning above threshold", "Only government employees", "Only NRIs"],
        correctAnswer: 1
    },
    {
        id: 407,
        department: "B.Com (Finance)",
        section: "Economics",
        question: "What is Inflation?",
        options: ["Increase in general price level", "Decrease in general price level", "Increase in population", "Increase in stock market"],
        correctAnswer: 0
    },
    {
        id: 408,
        department: "B.Com (Finance)",
        section: "Banking",
        question: "What is CRR in banking terms?",
        options: ["Cash Reserve Ratio", "Credit Reserve Rate", "Central Repo Rate", "Core Reserve Ratio"],
        correctAnswer: 0
    },
    {
        id: 409,
        department: "B.Com (Finance)",
        section: "Financial Accounting",
        question: "Which financial statement shows the financial position at a specific date?",
        options: ["Profit & Loss Account", "Balance Sheet", "Cash Flow Statement", "Ledger"],
        correctAnswer: 1
    },
    {
        id: 410,
        department: "B.Com (Finance)",
        section: "Taxation",
        question: "TDS stands for:",
        options: ["Tax Deducted at Source", "Total Debt Service", "Technical Data Sheet", "Tax Deduction System"],
        correctAnswer: 0
    },
    {
        id: 411,
        department: "B.Com (Finance)",
        section: "Economics",
        question: "GDP stands for:",
        options: ["Gross Domestic Product", "Global Demand Price", "General Data Protection", "Gross Deposit Percent"],
        correctAnswer: 0
    },
    {
        id: 412,
        department: "B.Com (Finance)",
        section: "Banking",
        question: "Which interest rate is used by RBI to lend money to banks?",
        options: ["Repo Rate", "Reverse Repo Rate", "Bank Rate", "Discount Rate"],
        correctAnswer: 0
    },
    {
        id: 413,
        department: "B.Com (Finance)",
        section: "Financial Accounting",
        question: "What is Depreciation?",
        options: ["Increase in value of asset", "Decrease in value of asset over time", "Loss of cash", "Gain on sale of asset"],
        correctAnswer: 1
    },
    {
        id: 414,
        department: "B.Com (Finance)",
        section: "Taxation",
        question: "Corporate Tax is levied on:",
        options: ["Individual income", "Property value", "Profit of companies", "Sales volume"],
        correctAnswer: 2
    },
    {
        id: 415,
        department: "B.Com (Finance)",
        section: "Economics",
        question: "Monetary Policy is formulated by:",
        options: ["Finance Ministry", "Commercial Banks", "Central Bank", "Planning Commission"],
        correctAnswer: 2
    },
    {
        id: 416,
        department: "B.Com (Finance)",
        section: "Banking",
        question: "What is an ATM?",
        options: ["All Time Money", "Automated Teller Machine", "Any Time Money", "Automatic Transaction Mode"],
        correctAnswer: 1
    },
    {
        id: 417,
        department: "B.Com (Finance)",
        section: "Financial Accounting",
        question: "Working Capital is calculated as:",
        options: ["Fixed Assets - Liabilities", "Current Assets - Current Liabilities", "Total Assets - Total Debt", "Sales - Expenses"],
        correctAnswer: 1
    },
    {
        id: 418,
        department: "B.Com (Finance)",
        section: "Taxation",
        question: "Direct Tax includes:",
        options: ["GST", "Excise Duty", "Income Tax", "Customs Duty"],
        correctAnswer: 2
    },
    {
        id: 419,
        department: "B.Com (Finance)",
        section: "Economics",
        question: "The Law of Supply states that:",
        options: ["Price up, Supply down", "Price up, Supply up", "Price down, Supply up", "Price constant, Supply up"],
        correctAnswer: 1
    },
    {
        id: 420,
        department: "B.Com (Finance)",
        section: "Banking",
        question: "What is KYC?",
        options: ["Know Your Customer", "Keep Your Cash", "Key Yield Curve", "Knowledge Yield Center"],
        correctAnswer: 0
    },
    {
        id: 421,
        department: "B.Com (Finance)",
        section: "Financial Accounting",
        question: "A Journal is known as:",
        options: ["Book of final entry", "Book of original entry", "Cash book subsidiary", "Secondary record"],
        correctAnswer: 1
    },
    {
        id: 422,
        department: "B.Com (Finance)",
        section: "Taxation",
        question: "Indirect Tax is:",
        options: ["Paid directly to government", "Levied on goods and services", "Based on wealth", "Inheritance tax"],
        correctAnswer: 1
    },
    {
        id: 423,
        department: "B.Com (Finance)",
        section: "Economics",
        question: "Perfect Competition means:",
        options: ["One seller, many buyers", "Many sellers, many buyers", "Few sellers, many buyers", "One buyer, many sellers"],
        correctAnswer: 1
    },
    {
        id: 424,
        department: "B.Com (Finance)",
        section: "Banking",
        question: "NEFT stands for:",
        options: ["National Electronic Funds Transfer", "Net Energy Finance Token", "National Easy Finance Trade", "New Electronic Fund Transfer"],
        correctAnswer: 0
    },
    {
        id: 425,
        department: "B.Com (Finance)",
        section: "Financial Accounting",
        question: "Bad Debts are:",
        options: ["Income", "Loss", "Liability", "Investment"],
        correctAnswer: 1
    },
    {
        id: 426,
        department: "B.Com (Finance)",
        section: "Taxation",
        question: "Tax base is:",
        options: ["Tax rate", "Amount on which tax is calculated", "The lowest tax slab", "Tax office location"],
        correctAnswer: 1
    },
    {
        id: 427,
        department: "B.Com (Finance)",
        section: "Economics",
        question: "Marginal Utility is:",
        options: ["Total satisfaction", "Satisfaction from one additional unit", "Price of unit", "Supply of unit"],
        correctAnswer: 1
    },
    {
        id: 428,
        department: "B.Com (Finance)",
        section: "Banking",
        question: "NPA stands for:",
        options: ["Non-Performing Asset", "Net Profit Amount", "New Personal Account", "National Payment Authority"],
        correctAnswer: 0
    },

    // --- Civil ---
    { id: 301, department: "Civil", section: "Surveying", question: "The curvature of the earth is taken into consideration if the limit of survey is more than?", options: ["250 km²", "200 km²", "150 km²", "100 km²"], correctAnswer: 0 },
    { id: 302, department: "Civil", section: "Surveying", question: "The standard length of a surveyor chain is?", options: ["20m", "30m", "66ft", "100ft"], correctAnswer: 2 },
    { id: 303, department: "Civil", section: "Surveying", question: "The main principle of surveying is to work from?", options: ["Part to whole", "Whole to part", "Higher to lower level", "Lower to higher level"], correctAnswer: 1 },
    { id: 304, department: "Civil", section: "Surveying", question: "A plumb line is perpendicular to?", options: ["Horizontal line", "Level line", "Vertical line", "None"], correctAnswer: 1 },
    { id: 305, department: "Civil", section: "Surveying", question: "Magnetic declination is?", options: ["Constant", "Variable", "Zero", "None"], correctAnswer: 1 },
    { id: 306, department: "Civil", section: "Surveying", question: "The ratio of map distance to ground distance is?", options: ["Scale", "Representative Fraction", "Plan", "None"], correctAnswer: 1 },
    { id: 307, department: "Civil", section: "Surveying", question: "Dumpy level is used for?", options: ["Measuring angles", "Measuring elevations", "Measuring distances", "None"], correctAnswer: 1 },
    { id: 308, department: "Civil", section: "Surveying", question: "Contour lines cross each other in case of?", options: ["Overhanging cliff", "Vertical cliff", "Valley", "Ridge"], correctAnswer: 0 },
    { id: 309, department: "Civil", section: "Structural Analysis", question: "Modulus of elasticity is defined as stress per unit?", options: ["Area", "Strain", "Volume", "Length"], correctAnswer: 1 },
    { id: 310, department: "Civil", section: "Structural Analysis", question: "A beam fixed at both ends is called?", options: ["Simply supported", "Cantilever", "Fixed beam", "Continuous beam"], correctAnswer: 2 },
    { id: 311, department: "Civil", section: "Structural Analysis", question: "Poisson's ratio for steel is approx?", options: ["0.1", "0.3", "0.5", "0.7"], correctAnswer: 1 },
    { id: 312, department: "Civil", section: "Concrete Technology", question: "Curing of concrete is done for?", options: ["Hydration", "Drying", "Strength reduction", "None"], correctAnswer: 0 },
    { id: 313, department: "Civil", section: "Concrete Technology", question: "Slump test is used for?", options: ["Workability", "Strength", "Durability", "None"], correctAnswer: 0 },
    { id: 314, department: "Civil", section: "Concrete Technology", question: "Initial setting time of OPC is approx?", options: ["10 min", "30 min", "60 min", "10 hours"], correctAnswer: 1 },
    { id: 315, department: "Civil", section: "Concrete Technology", question: "Grade M20 refers to 20?", options: ["kg/m³", "N/mm²", "kN/m", "None"], correctAnswer: 1 },
    { id: 316, department: "Civil", section: "Structural Analysis", question: "Bending moment at supported ends of a simple beam is?", options: ["Max", "Min", "Zero", "Constant"], correctAnswer: 2 },
    { id: 317, department: "Civil", section: "Surveying", question: "Theodolite is used for?", options: ["Horizontal angles", "Vertical angles", "Both", "None"], correctAnswer: 2 },
    { id: 318, department: "Civil", section: "Structural Analysis", question: "Young's modulus unit is?", options: ["N", "N/m", "N/m²", "Dimensionless"], correctAnswer: 2 },
    { id: 319, department: "Civil", section: "Concrete Technology", question: "W/C ratio affects?", options: ["Strength", "Workability", "Both", "None"], correctAnswer: 2 },
    { id: 320, department: "Civil", section: "Structural Analysis", question: "Tension member fails by?", options: ["Crushing", "Buckling", "Yielding", "None"], correctAnswer: 2 },
    { id: 321, department: "Civil", section: "Surveying", question: "Benchmark is a point of?", options: ["Known elevation", "Known distance", "Known angle", "None"], correctAnswer: 0 },
    { id: 322, department: "Civil", section: "Concrete Technology", question: "Bulking of sand is max at moisture content of?", options: ["1%", "5%", "10%", "20%"], correctAnswer: 1 },
    { id: 323, department: "Civil", section: "Structural Analysis", question: "Neutral axis of a beam is under?", options: ["Tension", "Compression", "Zero stress", "None"], correctAnswer: 2 },
    { id: 324, department: "Civil", section: "Geotechnical Eng", question: "Void ratio is ratio of volume of voids to?", options: ["Total volume", "Volume of solids", "Volume of air", "Volume of water"], correctAnswer: 1 },
    { id: 325, department: "Civil", section: "Geotechnical Eng", question: "Darcy's law is for?", options: ["Flow in pipes", "Flow in soil", "Flow in rivers", "None"], correctAnswer: 1 },
    { id: 326, department: "Civil", section: "Geotechnical Eng", question: "Ultimate bearing capacity depends on?", options: ["Soil type", "Foundation depth", "Both", "None"], correctAnswer: 2 },
    { id: 327, department: "Civil", section: "Geotechnical Eng", question: "Coefficient of permeability unit is?", options: ["cm/sec", "cm²", "sec/cm", "None"], correctAnswer: 0 },
    { id: 328, department: "Civil", section: "Geotechnical Eng", question: "Compaction of soil increases?", options: ["Voids", "Density", "Water content", "None"], correctAnswer: 1 },

    // --- B.Com (General) ---
    { id: 601, department: "B.Com (General)", section: "Inland Trade", question: "Trade between two entities within the same country is called:", options: ["Foreign Trade", "Inland Trade", "Entrepot Trade", "Global Trade"], correctAnswer: 1 },
    { id: 602, department: "B.Com (General)", section: "Insurance", question: "Insurance is based on the principle of:", options: ["Utmost Good Faith", "Profit Maximization", "Cost Reduction", "Market Dominance"], correctAnswer: 0 },
    { id: 603, department: "B.Com (General)", section: "Inland Trade", question: "Wholesalers buy from?", options: ["Consumers", "Retailers", "Manufacturers", "None"], correctAnswer: 2 },
    { id: 604, department: "B.Com (General)", section: "Insurance", question: "Premium is paid by?", options: ["Insured", "Insurer", "Agent", "Government"], correctAnswer: 0 },
    { id: 605, department: "B.Com (General)", section: "Inland Trade", question: "Retailers sell to?", options: ["Manufacturers", "Wholesalers", "Consumers", "Exporters"], correctAnswer: 2 },
    { id: 606, department: "B.Com (General)", section: "Business Law", question: "A contract is an agreement enforceable by?", options: ["Police", "Law", "Parties", "Witnesses"], correctAnswer: 1 },
    { id: 607, department: "B.Com (General)", section: "Business Law", question: "Minors are?", options: ["Allowed to contract", "Competent to contract", "Incompetent to contract", "None"], correctAnswer: 2 },
    { id: 608, department: "B.Com (General)", section: "Accounting", question: "Accounting is the language of?", options: ["Law", "Business", "Society", "Politics"], correctAnswer: 1 },
    { id: 609, department: "B.Com (General)", section: "Insurance", question: "Life insurance is a contract of?", options: ["Indemnity", "Guarantee", "Assurance", "None"], correctAnswer: 2 },
    { id: 610, department: "B.Com (General)", section: "Inland Trade", question: "E-Commerce involves?", options: ["Physical stores only", "Online transactions", "Barter only", "None"], correctAnswer: 1 },
    { id: 611, department: "B.Com (General)", section: "Business Law", question: "Offer + Acceptance = ?", options: ["Contract", "Agreement", "Consideration", "Breach"], correctAnswer: 1 },
    { id: 612, department: "B.Com (General)", section: "Accounting", question: "GAAP stands for?", options: ["General Accounting and Auditing Principles", "Generally Accepted Accounting Principles", "Global Accounting and Assets Policy", "None"], correctAnswer: 1 },
    { id: 613, department: "B.Com (General)", section: "Insurance", question: "Fire insurance covers?", options: ["Loss by fire", "Loss by theft", "Life loss", "Investment loss"], correctAnswer: 0 },
    { id: 614, department: "B.Com (General)", section: "Inland Trade", question: "Transport creates utility of?", options: ["Time", "Place", "Form", "Possession"], correctAnswer: 1 },
    { id: 615, department: "B.Com (General)", section: "Business Law", question: "Consideration means?", options: ["Profit", "Something in return", "Payment only", "Agreement"], correctAnswer: 1 },
    { id: 616, department: "B.Com (General)", section: "Accounting", question: "Assets = Liabilities + ?", options: ["Cash", "Capital", "Debt", "Income"], correctAnswer: 1 },
    { id: 617, department: "B.Com (General)", section: "Insurance", question: "IRDAI regulates?", options: ["Banking", "Insurance", "Stock markets", "Telecom"], correctAnswer: 1 },
    { id: 618, department: "B.Com (General)", section: "Inland Trade", question: "Warehousing creates utility of?", options: ["Time", "Place", "Form", "Ownership"], correctAnswer: 0 },
    { id: 619, department: "B.Com (General)", section: "Business Law", question: "Quid Pro Quo relates to?", options: ["Breach", "Agreement", "Consideration", "Lapse"], correctAnswer: 2 },
    { id: 620, department: "B.Com (General)", section: "Accounting", question: "Ledger is a book of?", options: ["Original entry", "Final entry", "Rough work", "None"], correctAnswer: 1 },
    { id: 621, department: "B.Com (General)", section: "Inland Trade", question: "Franchising is a type of?", options: ["Business model", "Tax", "Loan", "Insurance"], correctAnswer: 0 },
    { id: 622, department: "B.Com (General)", section: "Business Law", question: "Breach of contract means?", options: ["Making a contract", "Ending a contract by fulfillment", "Failure to perform contract", "None"], correctAnswer: 2 },
    { id: 623, department: "B.Com (General)", section: "Accounting", question: "Depreciation is on?", options: ["Current assets", "Fixed assets", "Fictitious assets", "Intangible assets only"], correctAnswer: 1 },
    { id: 624, department: "B.Com (General)", section: "Insurance", question: "Marine insurance covers?", options: ["Land risks", "Sea risks", "Air risks only", "House risks"], correctAnswer: 1 },
    { id: 625, department: "B.Com (General)", section: "Inland Trade", question: "Chamber of Commerce promotes?", options: ["Charity", "Trade and industry", "Religion", "Sports"], correctAnswer: 1 },
    { id: 626, department: "B.Com (General)", section: "Business Law", question: "An agreement with a minor is?", options: ["Voidable", "Void ab initio", "Valid", "Enforceable"], correctAnswer: 1 },
    { id: 627, department: "B.Com (General)", section: "Accounting", question: "Auditing is?", options: ["Recording transactions", "Verification of books", "Paying taxes", "None"], correctAnswer: 1 },
    { id: 628, department: "B.Com (General)", section: "Insurance", question: "Re-insurance is?", options: ["Insuring again with same insurer", "Insurer insuring with another insurer", "Double payment", "None"], correctAnswer: 1 },

    // --- B.Com (Management) ---
    { id: 901, department: "B.Com (Management)", section: "Business Management", question: "Father of Scientific Management?", options: ["Henry Fayol", "F.W. Taylor", "Peter Drucker", "Elton Mayo"], correctAnswer: 1 },
    { id: 902, department: "B.Com (Management)", section: "HRM", question: "HRM stands for?", options: ["Human Resource Management", "High Return Management", "Health Resource Mode", "None"], correctAnswer: 0 },
    { id: 903, department: "B.Com (Management)", section: "Marketing Management", question: "4 Ps of Marketing?", options: ["Price, Product, Place, Promotion", "Plan, Performance, Profit, People", "Process, Policy, Price, Placement", "None"], correctAnswer: 0 },
    { id: 904, department: "B.Com (Management)", section: "Organizational Behavior", question: "Hierarchy of Needs was given by?", options: ["Vroom", "Maslow", "Herzberg", "McGregor"], correctAnswer: 1 },
    { id: 905, department: "B.Com (Management)", section: "Business Management", question: "Planning is a?", options: ["Backward looking process", "Forward looking process", "Static process", "None"], correctAnswer: 1 },
    { id: 906, department: "B.Com (Management)", section: "HRM", question: "Recruitment is a?", options: ["Negative process", "Positive process", "Technical process", "None"], correctAnswer: 1 },
    { id: 907, department: "B.Com (Management)", section: "Marketing Management", question: "SWOT analysis stands for?", options: ["Strengths, Weaknesses, Opportunities, Threats", "Sales, Work, Output, Time", "Success, Wealth, Optimization, Target", "None"], correctAnswer: 0 },
    { id: 908, department: "B.Com (Management)", section: "Organizational Behavior", question: "Theory X and Theory Y given by?", options: ["Maslow", "McGregor", "Ouchi", "Taylor"], correctAnswer: 1 },
    { id: 909, department: "B.Com (Management)", section: "Business Management", question: "Span of control means?", options: ["Area of factory", "Number of subordinates under a manager", "Time of shift", "Range of products"], correctAnswer: 1 },
    { id: 910, department: "B.Com (Management)", section: "HRM", question: "Training increases?", options: ["Employee age", "Skills and knowledge", "Salary only", "None"], correctAnswer: 1 },
    { id: 911, department: "B.Com (Management)", section: "Marketing Management", question: "Market positioning is?", options: ["Physical location", "Creating an image in consumer's mind", "Pricing", "Distribution"], correctAnswer: 1 },
    { id: 912, department: "B.Com (Management)", section: "Organizational Behavior", question: "MBTI is used for?", options: ["Budgeting", "Personality assessment", "Stock control", "None"], correctAnswer: 1 },
    { id: 913, department: "B.Com (Management)", section: "Business Management", question: "MBO stands for?", options: ["Management by Objectives", "Management by Observation", "Manual Business Operation", "None"], correctAnswer: 0 },
    { id: 914, department: "B.Com (Management)", section: "HRM", question: "Performance appraisal is?", options: ["Hiring", "Evaluating performance", "Firing", "Promotion only"], correctAnswer: 1 },
    { id: 915, department: "B.Com (Management)", section: "Marketing Management", question: "Branding helps in?", options: ["Product identification", "Price reduction", "Manufacturing", "None"], correctAnswer: 0 },
    { id: 916, department: "B.Com (Management)", section: "Organizational Behavior", question: "Autocratic leadership means?", options: ["Consultative", "No consultation (Centralized)", "Delegative", "Democracy"], correctAnswer: 1 },
    { id: 917, department: "B.Com (Management)", section: "Business Management", question: "Unity of Command means?", options: ["One plan", "One boss", "One factory", "One goal"], correctAnswer: 1 },
    { id: 918, department: "B.Com (Management)", section: "HRM", question: "Job description focus on?", options: ["Person", "Job tasks", "Salary", "Location"], correctAnswer: 1 },
    { id: 919, department: "B.Com (Management)", section: "Marketing Management", question: "Market Skimming means?", options: ["Low initial price", "High initial price", "Moderate price", "No price"], correctAnswer: 1 },
    { id: 920, department: "B.Com (Management)", section: "Organizational Behavior", question: "Job satisfaction is?", options: ["Technical", "Psychological", "Physical", "Financial only"], correctAnswer: 1 },
    { id: 921, department: "B.Com (Management)", section: "Business Management", question: "Esprit de Corps means?", options: ["Profit", "Team spirit", "Order", "Equity"], correctAnswer: 1 },
    { id: 922, department: "B.Com (Management)", section: "HRM", question: "360-degree feedback involves?", options: ["Only manager", "Peers, subordinates, and managers", "Only customers", "Self only"], correctAnswer: 1 },
    { id: 923, department: "B.Com (Management)", section: "Marketing Management", question: "Niche marketing targets?", options: ["Mass market", "Small specific segment", "International market", "None"], correctAnswer: 1 },
    { id: 924, department: "B.Com (Management)", section: "Organizational Behavior", question: "Groupthink leads to?", options: ["Better decisions", "Poor decisions due to conformity", "Innovation", "Speed"], correctAnswer: 1 },
    { id: 925, department: "B.Com (Management)", section: "Business Management", question: "Decentralization is?", options: ["Concentration of power", "Dispersal of authority", "Closing branches", "None"], correctAnswer: 1 },
    { id: 926, department: "B.Com (Management)", section: "HRM", question: "Induction is?", options: ["Final exam", "Orientation of new employee", "Retirement", "Promotion"], correctAnswer: 1 },
    { id: 927, department: "B.Com (Management)", section: "Marketing Management", question: "CRM stands for?", options: ["Customer Relationship Management", "Cash Rate Mode", "Commercial Resource Map", "None"], correctAnswer: 0 },
    { id: 928, department: "B.Com (Management)", section: "Organizational Behavior", question: "Intrinsic motivation comes from?", options: ["Money", "Internal satisfaction", "Threats", "Rewards"], correctAnswer: 1 },

    // --- B.Com (Marketing) ---
    { id: 701, department: "B.Com (Marketing)", section: "Consumer Behavior", question: "The process of dividing a market into distinct groups of buyers is known as:", options: ["Targeting", "Positioning", "Segmentation", "Differentiation"], correctAnswer: 2 },
    { id: 702, department: "B.Com (Marketing)", section: "Digital Marketing", question: "What does SEO stand for in marketing?", options: ["Search Engine Optimization", "Social Engagement Office", "System Efficiency Output", "Sales Entry Organizer"], correctAnswer: 0 },
    { id: 703, department: "B.Com (Marketing)", section: "Consumer Behavior", question: "Cognitive dissonance relates to?", options: ["Pre-purchase", "Post-purchase doubt", "Ad viewing", "None"], correctAnswer: 1 },
    { id: 704, department: "B.Com (Marketing)", section: "Digital Marketing", question: "PPC stands for?", options: ["Pay Per Click", "Price Per Customer", "Product Price Control", "None"], correctAnswer: 0 },
    { id: 705, department: "B.Com (Marketing)", section: "Market Research", question: "Primary data is?", options: ["Collected for first time", "Already exists", "From newspapers", "None"], correctAnswer: 0 },
    { id: 706, department: "B.Com (Marketing)", section: "Sales Management", question: "Personal selling is a?", options: ["One-way communication", "Two-way communication", "Mass media", "None"], correctAnswer: 1 },
    { id: 707, department: "B.Com (Marketing)", section: "Consumer Behavior", question: "A reference group is?", options: ["A group used for comparison", "A target market", "A legal body", "None"], correctAnswer: 0 },
    { id: 708, department: "B.Com (Marketing)", section: "Digital Marketing", question: "What is CTR?", options: ["Click Through Rate", "Cost To Retail", "Customer Tracking Record", "None"], correctAnswer: 0 },
    { id: 709, department: "B.Com (Marketing)", section: "Market Research", question: "Sampling error occurs in?", options: ["Census", "Sample survey", "Both", "None"], correctAnswer: 1 },
    { id: 710, department: "B.Com (Marketing)", section: "Sales Management", question: "Sales quota is a?", options: ["Performance target", "Price", "Product list", "Training manual"], correctAnswer: 0 },
    { id: 711, department: "B.Com (Marketing)", section: "Consumer Behavior", question: "Maslow's highest level of need?", options: ["Social", "Self-actualization", "Safety", "Physiological"], correctAnswer: 1 },
    { id: 712, department: "B.Com (Marketing)", section: "Digital Marketing", question: "SMM stands for?", options: ["Social Media Marketing", "System Mode Map", "Sales Manager Mode", "None"], correctAnswer: 0 },
    { id: 713, department: "B.Com (Marketing)", section: "Market Research", question: "Likert scale is used to measure?", options: ["Weight", "Attitude/perception", "Distance", "Time"], correctAnswer: 1 },
    { id: 714, department: "B.Com (Marketing)", section: "Sales Management", question: "Prospecting means?", options: ["Finding potential customers", "Closing sale", "Delivery", "Billing"], correctAnswer: 0 },
    { id: 715, department: "B.Com (Marketing)", section: "Consumer Behavior", question: "Impulse buying is?", options: ["Planned", "Unplanned/Sudden", "Rational", "Lengthy process"], correctAnswer: 1 },
    { id: 716, department: "B.Com (Marketing)", section: "Digital Marketing", question: "Backlink is important for?", options: ["SEO", "Design", "Hosting", "Domain name"], correctAnswer: 0 },
    { id: 717, department: "B.Com (Marketing)", section: "Market Research", question: "Qualitative research uses?", options: ["Focus groups", "Statistical tests", "Computers only", "None"], correctAnswer: 0 },
    { id: 718, department: "B.Com (Marketing)", section: "Sales Management", question: "CRM software helps in?", options: ["Manufacturing", "Managing customer data", "Cooking", "None"], correctAnswer: 1 },
    { id: 719, department: "B.Com (Marketing)", section: "Consumer Behavior", question: "Perception is?", options: ["Objective", "Subjective interpretation", "Always true", "Physical"], correctAnswer: 1 },
    { id: 720, department: "B.Com (Marketing)", section: "Digital Marketing", question: "Email marketing is?", options: ["Outbound", "Inbound only", "Direct marketing", "None"], correctAnswer: 2 },
    { id: 721, department: "B.Com (Marketing)", section: "Market Research", question: "Questionnaire should be?", options: ["Very long", "Clear and simple", "Ambiguous", "Technical only"], correctAnswer: 1 },
    { id: 722, department: "B.Com (Marketing)", section: "Sales Management", question: "Overcoming objections is part of?", options: ["Closing", "Presentation", "Prospecting", "None"], correctAnswer: 1 },
    { id: 723, department: "B.Com (Marketing)", section: "Consumer Behavior", question: "Brand loyalty leads to?", options: ["Switching", "Repeat purchase", "Higher price search", "None"], correctAnswer: 1 },
    { id: 724, department: "B.Com (Marketing)", section: "Digital Marketing", question: "Affiliate marketing pays on?", options: ["Hiring", "Performance (Sales/Leads)", "Fixed monthly", "None"], correctAnswer: 1 },
    { id: 725, department: "B.Com (Marketing)", section: "Market Research", question: "Focus group size is usually?", options: ["100+", "6-12", "1-2", "None"], correctAnswer: 1 },
    { id: 726, department: "B.Com (Marketing)", section: "Sales Management", question: "After-sales service increases?", options: ["Customer dissatisfaction", "Customer satisfaction", "Manufacturing cost only", "None"], correctAnswer: 1 },
    { id: 727, department: "B.Com (Marketing)", section: "Consumer Behavior", question: "Culture is a?", options: ["Psychological factor", "Social/Cultural factor", "Personal factor", "None"], correctAnswer: 1 },
    { id: 728, department: "B.Com (Marketing)", section: "Digital Marketing", question: "Landing page is?", options: ["HomePage only", "Targeted page for a campaign", "About us page", "None"], correctAnswer: 1 },

    // --- B.Com (IT) ---
    { id: 801, department: "B.Com (IT)", section: "E-Commerce", question: "Amazon.com is an example of which e-commerce model?", options: ["C2C", "B2B", "B2C", "G2C"], correctAnswer: 2 },
    { id: 802, department: "B.Com (IT)", section: "MIS", question: "What is the primary purpose of a Management Information System (MIS)?", options: ["Data storage only", "Supporting decision-making", "Game development", "Creating art"], correctAnswer: 1 },
    { id: 803, department: "B.Com (IT)", section: "E-Commerce", question: "EDI stands for?", options: ["Electronic Data Interchange", "Easy Data Input", "Electronic Digital Image", "None"], correctAnswer: 0 },
    { id: 804, department: "B.Com (IT)", section: "MIS", question: "DSS stands for?", options: ["Decision Support System", "Data Storage System", "Digital Support Scheme", "None"], correctAnswer: 0 },
    { id: 805, department: "B.Com (IT)", section: "IT Law", question: "IT Act 2000 is for?", options: ["Road safety", "Cyber law in India", "Environment", "None"], correctAnswer: 1 },
    { id: 806, department: "B.Com (IT)", section: "Cyber Security", question: "Phishing is a?", options: ["Type of fishing", "Fraudulent attempt to obtain sensitive info", "Software development", "None"], correctAnswer: 1 },
    { id: 807, department: "B.Com (IT)", section: "E-Commerce", question: "Digital signature is for?", options: ["Decoration", "Authentication and Integrity", "Faster typing", "None"], correctAnswer: 1 },
    { id: 808, department: "B.Com (IT)", section: "MIS", question: "ERP stands for?", options: ["Enterprise Resource Planning", "Easy Resource Process", "Electronic Rate Program", "None"], correctAnswer: 0 },
    { id: 809, department: "B.Com (IT)", section: "IT Law", question: "Section 66A was related to?", options: ["Electronic signatures", "Offensive messages", "Income tax", "None"], correctAnswer: 1 },
    { id: 810, department: "B.Com (IT)", section: "Cyber Security", question: "Encryption means?", options: ["Converting plain text to cipher text", "Converting cipher text to plain text", "Deleting data", "None"], correctAnswer: 0 },
    { id: 811, department: "B.Com (IT)", section: "E-Commerce", question: "B2B means?", options: ["Buyer to Buyer", "Business to Business", "Back to Back", "None"], correctAnswer: 1 },
    { id: 812, department: "B.Com (IT)", section: "MIS", question: "Data Mining is?", options: ["Digging for gold", "Extracting patterns from large data", "Storing data in clouds", "None"], correctAnswer: 1 },
    { id: 813, department: "B.Com (IT)", section: "IT Law", question: "Cyber crime includes?", options: ["Hacking", "Identity theft", "Both", "None"], correctAnswer: 2 },
    { id: 814, department: "B.Com (IT)", section: "Cyber Security", question: "Two-factor authentication (2FA) adds?", options: ["More storage", "An extra layer of security", "Speed", "Colors"], correctAnswer: 1 },
    { id: 815, department: "B.Com (IT)", section: "E-Commerce", question: "M-Commerce stands for?", options: ["Manual Commerce", "Mobile Commerce", "Mega Commerce", "None"], correctAnswer: 1 },
    { id: 816, department: "B.Com (IT)", section: "MIS", question: "Cloud computing provides?", options: ["Rain", "On-demand IT resources", "Hard drives only", "None"], correctAnswer: 1 },
    { id: 817, department: "B.Com (IT)", section: "IT Law", question: "Who is an adjudicating officer?", options: ["Police", "Authority under IT act", "CEO", "None"], correctAnswer: 1 },
    { id: 818, department: "B.Com (IT)", section: "Cyber Security", question: "Malware stands for?", options: ["Malicious Software", "Male Software", "Management Ware", "None"], correctAnswer: 0 },
    { id: 819, department: "B.Com (IT)", section: "E-Commerce", question: "Payment Gateway is used for?", options: ["Watching videos", "Online transactions", "Coding", "None"], correctAnswer: 1 },
    { id: 820, department: "B.Com (IT)", section: "MIS", question: "Big Data refers to?", options: ["Large font size", "Extremely large data sets", "Spreadsheets", "None"], correctAnswer: 1 },
    { id: 821, department: "B.Com (IT)", section: "IT Law", question: "What is an Intermediary?", options: ["End user", "Service provider (e.g. ISP)", "Manufacturer", "None"], correctAnswer: 1 },
    { id: 822, department: "B.Com (IT)", section: "Cyber Security", question: "Firewall protects from?", options: ["Water", "Unauthorized access", "Theft of hardware", "None"], correctAnswer: 1 },
    { id: 823, department: "B.Com (IT)", section: "E-Commerce", question: "Virtual Storefront is?", options: ["Physical shop", "Online website displaying products", "Storage room", "None"], correctAnswer: 1 },
    { id: 824, department: "B.Com (IT)", section: "MIS", question: "AI in MIS helps in?", options: ["Automated decision-making", "Typing only", "Cleaning office", "None"], correctAnswer: 0 },
    { id: 825, department: "B.Com (IT)", section: "IT Law", question: "Digital Certifying Authority issues?", options: ["Passports", "Digital Certificates", "Birth certificates", "None"], correctAnswer: 1 },
    { id: 826, department: "B.Com (IT)", section: "Cyber Security", question: "Trojan horse is a?", options: ["Gift", "Type of malware", "Browser", "OS"], correctAnswer: 1 },
    { id: 827, department: "B.Com (IT)", section: "E-Commerce", question: "Inventory management in e-commerce is?", options: ["Irrelevant", "Crucial", "Manual only", "None"], correctAnswer: 1 },
    { id: 828, department: "B.Com (IT)", section: "MIS", question: "Information lifecycle includes?", options: ["Creation to disposal", "Only storage", "Only creation", "None"], correctAnswer: 0 },

    // --- Electrical ---
    { id: 901, department: "Electrical", section: "Circuit Theory", question: "In a series RLC circuit at resonance, the impedance is:", options: ["Maximum", "Minimum", "Zero", "Infinite"], correctAnswer: 1 },
    { id: 902, department: "Electrical", section: "Circuit Theory", question: "The power factor of a purely inductive circuit is:", options: ["Unity", "Zero lagging", "Zero leading", "0.5 lagging"], correctAnswer: 1 },
    { id: 903, department: "Electrical", section: "Electrical Machines", question: "The transformer core is laminated to reduce:", options: ["Copper loss", "Eddy current loss", "Hysteresis loss", "Windage loss"], correctAnswer: 1 },
    { id: 904, department: "Electrical", section: "Electrical Machines", question: "A DC generator works on the principle of:", options: ["Faraday's Law", "Lenz's Law", "Ampere's Law", "Ohm's Law"], correctAnswer: 0 },
    { id: 905, department: "Electrical", section: "Power Systems", question: "A Buchholz relay is used for the protection of:", options: ["Alternators", "Transformers", "Transmission lines", "Motors"], correctAnswer: 1 },
    { id: 906, department: "Electrical", section: "Power Systems", question: "Corona discharge usually occurs in:", options: ["Low voltage lines", "High voltage lines", "DC lines only", "Cables"], correctAnswer: 1 },
    { id: 907, department: "Electrical", section: "Control Systems", question: "A system with a gain margin of 1 is:", options: ["Stable", "Unstable", "Marginally stable", "Critically damped"], correctAnswer: 2 },
    { id: 908, department: "Electrical", section: "Control Systems", question: "The transfer function is defined for:", options: ["Non-linear systems", "LTIV systems", "Time-varying systems", "All"], correctAnswer: 1 },
    { id: 909, department: "Electrical", section: "Circuit Theory", question: "Kirchhoff's Voltage Law (KVL) is based on:", options: ["Charge", "Energy", "Mass", "Momentum"], correctAnswer: 1 },
    { id: 910, department: "Electrical", section: "Circuit Theory", question: "The time constant of an RC circuit is:", options: ["R/C", "C/R", "RC", "1/RC"], correctAnswer: 2 },
    { id: 911, department: "Electrical", section: "Electrical Machines", question: "Speed of a synchronous motor is:", options: ["Variable", "Constant", "Load dependent", "Zero"], correctAnswer: 1 },
    { id: 912, department: "Electrical", section: "Electrical Machines", question: "The slip of induction motor at starting is:", options: ["0", "0.5", "1", "Infinite"], correctAnswer: 2 },
    { id: 913, department: "Electrical", section: "Power Systems", question: "Skin effect depends on:", options: ["Frequency", "Diameter", "Permeability", "All"], correctAnswer: 3 },
    { id: 914, department: "Electrical", section: "Power Systems", question: "Megger is used to measure?", options: ["Current", "Voltage", "Insulation resistance", "Power"], correctAnswer: 2 },
    { id: 915, department: "Electrical", section: "Control Systems", question: "Zero-order hold is used in?", options: ["Analog control", "Digital control", "Pneumatic", "None"], correctAnswer: 1 },
    { id: 916, department: "Electrical", section: "Control Systems", question: "Feedback can reduce effect of?", options: ["Noise", "Disturbance", "Variation", "All"], correctAnswer: 3 },
    { id: 917, department: "Electrical", section: "Circuit Theory", question: "Ohm's law is not applicable to:", options: ["Resistors", "Semi-conductors", "Conducting wires", "Capacitors"], correctAnswer: 1 },
    { id: 918, department: "Electrical", section: "Circuit Theory", question: "Superposition theorem is valid for:", options: ["Linear systems", "Non-linear systems", "Both", "None"], correctAnswer: 0 },
    { id: 919, department: "Electrical", section: "Electrical Machines", question: "The yoke of a DC machine is made of?", options: ["Copper", "Cast iron", "Silicon steel", "Aluminum"], correctAnswer: 1 },
    { id: 920, department: "Electrical", section: "Electrical Machines", question: "The frequency of rotor current in an induction motor is:", options: ["f", "sf", "f/s", "None"], correctAnswer: 1 },
    { id: 921, department: "Electrical", section: "Power Systems", question: "Which insulator is used for 11kV lines?", options: ["Pin", "Suspension", "Strain", "Shackle"], correctAnswer: 0 },
    { id: 922, department: "Electrical", section: "Power Systems", question: "The value of diversity factor is always:", options: ["< 1", "> 1", "= 1", "0"], correctAnswer: 1 },
    { id: 923, department: "Electrical", section: "Control Systems", question: "Type 0 system has a steady state error to:", options: ["Step input", "Ramp input", "Parabolic input", "None"], correctAnswer: 0 },
    { id: 924, department: "Electrical", section: "Control Systems", question: "A system is stable if all poles lie in?", options: ["Right half plane", "Left half plane", "Imaginary axis", "Origin"], correctAnswer: 1 },
    { id: 925, department: "Electrical", section: "Circuit Theory", question: "Unit of reactive power is:", options: ["Watt", "VA", "VAR", "Ohm"], correctAnswer: 2 },
    { id: 926, department: "Electrical", section: "Electrical Machines", question: "Maximum efficiency of a transformer occurs at:", options: ["No load", "Full load", "Half load", "Iron loss = Copper loss"], correctAnswer: 3 },
    { id: 927, department: "Electrical", section: "Power Systems", question: "String efficiency can be improved by:", options: ["Grading discs", "Using guard ring", "Both", "None"], correctAnswer: 2 },
    { id: 928, department: "Electrical", section: "Control Systems", question: "Phase margin is measured at?", options: ["Gain crossover freq", "Phase crossover freq", "Resonant freq", "Zero freq"], correctAnswer: 0 }
];

export const DEPARTMENT_CATEGORIES = {
    "Engineering": ["CSE/IT", "ECE", "Mechanical", "Civil", "Electrical"],
    "Commerce": ["B.Com (General)", "B.Com (Finance)", "B.Com (Management)", "B.Com (Marketing)", "B.Com (IT)"]
};

export const TOPICS_BY_DEPARTMENT: Record<string, string[]> = {
    "CSE/IT": ["DBMS", "OS", "Networking", "DSA"],
    "ECE": ["Digital Electronics", "Microprocessors", "Communication Systems", "Circuit Theory"],
    "Mechanical": ["Thermodynamics", "Fluid Mechanics", "Material Science", "Machine Design"],
    "Civil": ["Surveying", "Structural Analysis", "Concrete Technology", "Geotechnical Eng"],
    "Electrical": ["Circuit Theory", "Electrical Machines", "Power Systems", "Control Systems"],
    "B.Com (General)": ["Accountancy", "Business Law", "Economics", "Auditing"],
    "B.Com (Finance)": ["Financial Accounting", "Taxation", "Economics", "Banking"],
    "B.Com (Management)": ["Business Management", "HRM", "Marketing Management", "Organizational Behavior"],
    "B.Com (Marketing)": ["Consumer Behavior", "Digital Marketing", "Market Research", "Sales Management"],
    "B.Com (IT)": ["E-Commerce", "MIS", "IT Law", "Cyber Security"]
};
