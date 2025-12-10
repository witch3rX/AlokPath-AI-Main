const quizQuestions = {
    "Data Analyst": [
      { id: 1, question: "Which function in Excel is used to look up a value in a table?", options: ["SEARCH", "VLOOKUP", "FIND", "LOCATE"], answer: "VLOOKUP" },
      { id: 2, question: "Which command in SQL retrieves data from a database?", options: ["GET", "OPEN", "SELECT", "FETCH"], answer: "SELECT" },
      { id: 3, question: "What is the primary library for data manipulation in Python?", options: ["Numpy", "Pandas", "Matplotlib", "Seaborn"], answer: "Pandas" },
      { id: 4, question: "What type of chart is best for showing trends over time?", options: ["Pie Chart", "Line Chart", "Scatter Plot", "Bar Chart"], answer: "Line Chart" },
      { id: 5, question: "In data cleaning, what does 'imputation' refer to?", options: ["Deleting data", "Filling missing values", "Sorting data", "Merging tables"], answer: "Filling missing values" },
      { id: 6, question: "What does 'CSV' stand for?", options: ["Common Separated Values", "Comma Separated Values", "Computer Saved Video", "Calculated Sheet Value"], answer: "Comma Separated Values" },
      { id: 7, question: "Which SQL clause is used to filter records?", options: ["WHERE", "FILTER", "GROUP BY", "ORDER BY"], answer: "WHERE" },
      { id: 8, question: "What is the median of this set: [2, 4, 6, 8, 10]?", options: ["4", "5", "6", "8"], answer: "6" },
      { id: 9, question: "Which tool is commonly used for data visualization dashboards?", options: ["Power BI", "Photoshop", "Word", "Outlook"], answer: "Power BI" },
      { id: 10, question: "What represents a categorical variable?", options: ["Height", "Weight", "Gender", "Income"], answer: "Gender" }
    ],
    "Research Assistant": [
      { id: 1, question: "What is the first step in the scientific method?", options: ["Experiment", "Observation", "Conclusion", "Hypothesis"], answer: "Observation" },
      { id: 2, question: "Which section of a research paper lists the sources used?", options: ["Abstract", "Methodology", "References", "Appendix"], answer: "References" },
      { id: 3, question: "What is a 'Qualitative' research method?", options: ["Survey with numbers", "Interviews", "Statistical analysis", "Lab experiment"], answer: "Interviews" },
      { id: 4, question: "What does 'Peer Review' mean?", options: ["Checking by friends", "Evaluation by experts", "Self-checking", "Editing grammar"], answer: "Evaluation by experts" },
      { id: 5, question: "What is 'Plagiarism'?", options: ["Writing original work", "Citing sources", "Copying work without credit", "Paraphrasing"], answer: "Copying work without credit" },
      { id: 6, question: "Which software is used for reference management?", options: ["Mendeley", "Photoshop", "Premiere Pro", "Blender"], answer: "Mendeley" },
      { id: 7, question: "In an experiment, which variable do you change?", options: ["Dependent", "Independent", "Control", "Constant"], answer: "Independent" },
      { id: 8, question: "What is an 'Abstract'?", options: ["The conclusion", "A short summary", "The data table", "The title page"], answer: "A short summary" },
      { id: 9, question: "What ensures ethical research involving humans?", options: ["Consent forms", "Paying them", "Hiding names", "Speed"], answer: "Consent forms" },
      { id: 10, question: "Where do you typically search for academic papers?", options: ["TikTok", "Google Scholar", "Facebook", "Instagram"], answer: "Google Scholar" }
    ],
    "Quality Control Officer": [
      { id: 1, question: "What does QC stand for?", options: ["Quick Check", "Quality Control", "Quantity Count", "Quality Check"], answer: "Quality Control" },
      { id: 2, question: "Which ISO standard is related to Quality Management?", options: ["ISO 9001", "ISO 14001", "ISO 27001", "ISO 45001"], answer: "ISO 9001" },
      { id: 3, question: "What is the purpose of 'Sampling'?", options: ["Testing every item", "Testing a representative portion", "Testing nothing", "Guessing"], answer: "Testing a representative portion" },
      { id: 4, question: "What is a 'Batch' number used for?", options: ["Price tag", "Traceability", "Expiration", "Flavor"], answer: "Traceability" },
      { id: 5, question: "In food industry, what is HACCP?", options: ["A hazard analysis system", "A cleaning brand", "A government agency", "A type of food"], answer: "A hazard analysis system" },
      { id: 6, question: "If a product fails QC, what is the immediate action?", options: ["Sell it cheaply", "Quarantine it", "Ignore it", "Ship it"], answer: "Quarantine it" },
      { id: 7, question: "What tool is used to measure precise thickness?", options: ["Ruler", "Vernier Caliper", "Tape measure", "Scale"], answer: "Vernier Caliper" },
      { id: 8, question: "What is 'SOP'?", options: ["Standard Operating Procedure", "Safe Operating Plan", "Standard Official Protocol", "System of Product"], answer: "Standard Operating Procedure" },
      { id: 9, question: "Which chart is used to monitor process stability?", options: ["Pie Chart", "Control Chart", "Bar Graph", "Gantt Chart"], answer: "Control Chart" },
      { id: 10, question: "Visual inspection primarily checks for:", options: ["Taste", "Chemical composition", "Surface defects", "Weight"], answer: "Surface defects" }
    ],
    "Lab Technician": [
      { id: 1, question: "What is the most important rule in the lab?", options: ["Finish fast", "Safety first", "Save chemicals", "Work alone"], answer: "Safety first" },
      { id: 2, question: "What does PPE stand for?", options: ["Personal Protective Equipment", "Public Protection Event", "Private Person Equipment", "Past Present Era"], answer: "Personal Protective Equipment" },
      { id: 3, question: "Which glassware is best for measuring precise volume?", options: ["Beaker", "Volumetric Flask", "Test tube", "Funnel"], answer: "Volumetric Flask" },
      { id: 4, question: "What is the pH of a neutral solution?", options: ["0", "7", "14", "1"], answer: "7" },
      { id: 5, question: "How do you handle a chemical spill?", options: ["Wipe with cloth", "Follow spill protocol", "Wait for it to dry", "Pour water on it"], answer: "Follow spill protocol" },
      { id: 6, question: "What is a Centrifuge used for?", options: ["Heating", "Separating mixtures by spinning", "Cooling", "Measuring mass"], answer: "Separating mixtures by spinning" },
      { id: 7, question: "What is the proper way to smell a chemical?", options: ["Inhale deeply", "Wafting", "Put nose in tube", "Taste it"], answer: "Wafting" },
      { id: 8, question: "Which microscope uses electrons?", options: ["Light Microscope", "Electron Microscope", "Hand Lens", "Binoculars"], answer: "Electron Microscope" },
      { id: 9, question: "What is used to sterilize equipment?", options: ["Autoclave", "Freezer", "Microwave", "Fan"], answer: "Autoclave" },
      { id: 10, question: "How should you dilute acid?", options: ["Add water to acid", "Add acid to water", "Mix quickly", "Shake it"], answer: "Add acid to water" }
    ],
    "Teacher / Instructor": [
      { id: 1, question: "What is 'Lesson Planning'?", options: ["Cleaning the room", "Preparing what to teach", "Grading papers", "Meeting parents"], answer: "Preparing what to teach" },
      { id: 2, question: "What is 'Formative Assessment'?", options: ["Final Exam", "Ongoing feedback during learning", "College entrance test", "Teacher evaluation"], answer: "Ongoing feedback during learning" },
      { id: 3, question: "Which is a method of active learning?", options: ["Lecture only", "Group discussion", "Silent reading", "Copying notes"], answer: "Group discussion" },
      { id: 4, question: "What is essential for classroom management?", options: ["Yelling", "Clear rules and consistency", "Ignoring bad behavior", "Only teaching smart students"], answer: "Clear rules and consistency" },
      { id: 5, question: "What does STEM stand for?", options: ["Science, Tech, Engineering, Math", "Sports, Tech, English, Music", "Science, Teaching, English, Math", "None"], answer: "Science, Tech, Engineering, Math" },
      { id: 6, question: "How do you handle a slow learner?", options: ["Ignore them", "Differentiate instruction", "Send them out", "Give them the answer"], answer: "Differentiate instruction" },
      { id: 7, question: "What is a 'Syllabus'?", options: ["A type of test", "Course outline", "School bus", "Teacher's lounge"], answer: "Course outline" },
      { id: 8, question: "What is 'Pedagogy'?", options: ["Study of children", "Method and practice of teaching", "School rules", "Playground safety"], answer: "Method and practice of teaching" },
      { id: 9, question: "Which tool is used for online teaching?", options: ["Zoom/Google Classroom", "Netflix", "Spotify", "Uber"], answer: "Zoom/Google Classroom" },
      { id: 10, question: "Positive reinforcement involves:", options: ["Punishment", "Rewarding good behavior", "Ignoring behavior", "Detention"], answer: "Rewarding good behavior" }
    ],
    "Banking & Finance Jobs": [
      { id: 1, question: "What is a 'Debit'?", options: ["Money coming in", "Money going out (expense)", "A loan", "Profit"], answer: "Money going out (expense)" },
      { id: 2, question: "What does ROI stand for?", options: ["Rate of Interest", "Return on Investment", "Risk of Inflation", "Return on Income"], answer: "Return on Investment" },
      { id: 3, question: "What is the primary function of a Commercial Bank?", options: ["Printing money", "Accepting deposits and lending", "Regulating economy", "Selling stocks"], answer: "Accepting deposits and lending" },
      { id: 4, question: "Which is a liability?", options: ["Cash", "Loan taken", "Building owned", "Inventory"], answer: "Loan taken" },
      { id: 5, question: "What is 'KYC' in banking?", options: ["Know Your Customer", "Keep Your Cash", "Know Your Credit", "Keep Your Card"], answer: "Know Your Customer" },
      { id: 6, question: "What is an Asset?", options: ["Something you owe", "Something of value you own", "A tax", "An expense"], answer: "Something of value you own" },
      { id: 7, question: "What is 'Inflation'?", options: ["Prices going down", "Prices going up", "Stable prices", "More jobs"], answer: "Prices going up" },
      { id: 8, question: "Who regulates banks in Bangladesh?", options: ["World Bank", "Bangladesh Bank", "BRAC Bank", "Sonali Bank"], answer: "Bangladesh Bank" },
      { id: 9, question: "What is a 'Credit Score'?", options: ["Amount of money in bank", "Measure of creditworthiness", "Number of credit cards", "Bank age"], answer: "Measure of creditworthiness" },
      { id: 10, question: "What is a Fixed Deposit (FDR)?", options: ["Money kept for fixed time for interest", "Daily checking account", "Stock market investment", "Insurance"], answer: "Money kept for fixed time for interest" }
    ],
    "IT Support / Technical Support": [
      { id: 1, question: "What is the first step in troubleshooting?", options: ["Reformat PC", "Identify the problem", "Replace hardware", "Install Windows"], answer: "Identify the problem" },
      { id: 2, question: "What does RAM stand for?", options: ["Read Access Memory", "Random Access Memory", "Run All Memory", "Read All Media"], answer: "Random Access Memory" },
      { id: 3, question: "What is an IP Address?", options: ["Internet Provider", "Unique address of a device on network", "Inter-Protocol", "Input Process"], answer: "Unique address of a device on network" },
      { id: 4, question: "How do you check network connectivity?", options: ["Ping command", "Delete cookies", "Restart monitor", "Open Word"], answer: "Ping command" },
      { id: 5, question: "What is 'Malware'?", options: ["Hardware", "Good software", "Malicious software", "Antivirus"], answer: "Malicious software" },
      { id: 6, question: "What key combo opens Task Manager?", options: ["Ctrl+Alt+Del", "Alt+F4", "Ctrl+C", "Win+L"], answer: "Ctrl+Alt+Del" },
      { id: 7, question: "What is a 'Driver'?", options: ["Car operator", "Software that controls hardware", "A screwdriver", "The CPU"], answer: "Software that controls hardware" },
      { id: 8, question: "What does 'Blue Screen of Death' indicate?", options: ["System crash", "Monitor broke", "Virus removed", "Internet off"], answer: "System crash" },
      { id: 9, question: "Which cable connects to the internet?", options: ["HDMI", "VGA", "Ethernet (RJ45)", "USB"], answer: "Ethernet (RJ45)" },
      { id: 10, question: "What is 'Phishing'?", options: ["Fishing sport", "Email scam to steal data", "Updating software", "Cleaning a mouse"], answer: "Email scam to steal data" }
    ]
  };
  
  module.exports = quizQuestions;