// This is our "AI Brain" - the Knowledge Base
// Version 5: Score and Skills gap added - October 2025

const KEYWORD_WEIGHTS = {
    'skill': 3,       // Technical/specific skills are most important
    'degree': 2,      // Relevant education is important
    'soft_skill': 1,  // Soft skills add value
    'experience': 2,  // Mentions of job titles or experience levels
    'general': 1      // General relevant terms
};
const MAX_POSSIBLE_SCORE_PER_KEYWORD = 3; // Max weight assigned


const KNOWLEDGE_BASE = {
    careers: {
        // --- Technology Sector ---
        data_scientist: { 
            title: "Data Scientist / Data Analyst",
            description: "Analyze large datasets to find trends, build predictive models, and provide actionable insights for business decisions. Highly in demand in tech, banking, and e-commerce.",
            key_skills: ["Python", "R", "SQL", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "PyTorch", "Tableau", "Power BI", "Statistics", "Machine Learning", "Data Mining", "Big Data"]
        },
        frontend_developer: { 
            title: "Front-End Developer / Web Developer",
            description: "Build the visual and interactive parts of websites and web applications using HTML, CSS, and JavaScript frameworks.",
            key_skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Angular", "Vue.js", "jQuery", "Bootstrap", "Tailwind CSS", "Figma", "UI/UX Principles"]
        },
        backend_developer: { 
             title: "Back-End Developer / Software Engineer",
             description: "Develop and maintain the server-side logic, databases, and APIs that power web and mobile applications.",
             key_skills: ["Node.js", "Python", "Java", "C#", ".NET", "PHP", "Ruby", "Go", "SQL", "NoSQL", "MongoDB", "PostgreSQL", "MySQL", "REST API", "Microservices", "Docker", "AWS", "Azure"]
        },
        full_stack_developer: { 
             title: "Full Stack Developer",
             description: "Work on both the front-end and back-end parts of web development, managing the entire technology stack.",
             key_skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Python", "SQL", "MongoDB", "REST API", "Git", "AWS", "Docker"]
        },
        mobile_app_developer: { 
            title: "Mobile App Developer (Android/iOS)",
            description: "Design, develop, and maintain applications for mobile devices like smartphones and tablets.",
            key_skills: ["Java", "Kotlin", "Android SDK", "Swift", "Objective-C", "iOS SDK", "Flutter", "React Native", "Firebase", "API Integration"]
        },
        devops_engineer: { 
             title: "DevOps Engineer / SRE",
             description: "Bridge the gap between software development and IT operations, focusing on automation, deployment pipelines, and infrastructure management.",
             key_skills: ["Linux", "AWS", "Azure", "GCP", "Docker", "Kubernetes", "Jenkins", "GitLab CI", "Terraform", "Ansible", "Python", "Bash Scripting", "Networking"]
        },
        qa_engineer: { 
            title: "QA Engineer / Software Tester",
            description: "Ensure software quality through manual and automated testing, identifying bugs and verifying functionality.",
            key_skills: ["Manual Testing", "Automated Testing", "Selenium", "Cypress", "Appium", "JIRA", "Test Planning", "Bug Tracking", "SQL"]
        },
        ui_ux_designer: { 
             title: "UI/UX Designer",
             description: "Design user interfaces and experiences for websites and apps, focusing on usability, accessibility, and visual appeal.",
             key_skills: ["Figma", "Sketch", "Adobe XD", "User Research", "Wireframing", "Prototyping", "Usability Testing", "Interaction Design", "Visual Design"]
        },
        cyber_security_analyst: { 
             title: "Cyber Security Analyst",
             description: "Protect computer systems and networks from threats by monitoring, detecting, investigating, and responding to security incidents.",
             key_skills: ["Network Security", "Information Security", "SIEM", "Vulnerability Assessment", "Penetration Testing", "Firewalls", "Cryptography", "Compliance", "CEH", "CISSP"]
        },
        it_support_specialist: { 
             title: "IT Support Specialist / Help Desk",
             description: "Provide technical assistance and support to end-users, troubleshooting hardware, software, and network issues.",
             key_skills: ["Troubleshooting", "Hardware", "Software", "Windows", "MacOS", "Networking", "Active Directory", "Customer Service"]
        },
        software_engineer: { 
            title: "Software Engineer",
            description: "Design, develop, test, and maintain software systems. This broad role encompasses areas like back-end, front-end, or full-stack development depending on specialization.",
            key_skills: ["Java", "Python", "C++", "C#", "JavaScript", "Go", "SQL", "NoSQL", "Data Structures", "Algorithms", "Operating Systems", "Git", "Agile"]
        },
        network_engineer: { 
            title: "Network Engineer / Administrator",
            description: "Design, implement, manage, and troubleshoot computer networks (LAN, WAN, Internet) for organizations.",
            key_skills: ["Networking", "TCP/IP", "Routing", "Switching", "Firewalls", "VPN", "Cisco", "Juniper", "Network Security", "CCNA", "CCNP"]
        },
        mis_specialist: { 
            title: "MIS Specialist / IT Business Analyst",
            description: "Focus on using information technology to solve business problems, managing IT systems, analyzing data for business insights, and bridging IT and management.",
            key_skills: ["MIS", "Business Process Analysis", "Systems Analysis", "Database Management", "SQL", "ERP Systems", "Project Management", "Data Visualization", "Excel"]
        },
        ai_ml_engineer: { 
             title: "AI / Machine Learning Engineer",
             description: "Design, build, and deploy machine learning models and artificial intelligence systems to solve complex problems.",
             key_skills: ["Python", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Scikit-learn", "NLP", "Computer Vision", "Statistics", "Algorithms", "Big Data"]
         },
        game_developer: { 
            title: "Game Developer",
            description: "Design, program, and test video games for various platforms (PC, console, mobile). Requires strong programming and often creative skills.",
            key_skills: ["C++", "C#", "Unity", "Unreal Engine", "Game Design", "Physics Engine", "Graphics Programming", "Mobile Game Development", "JavaScript (Web Games)"]
        },

        // --- Business, Finance & Commerce Sector ---
        accountant: { 
            title: "Accountant / Chartered Accountant (CA)",
            description: "Manage financial records, prepare tax returns, analyze financial data, and ensure compliance with regulations. CA is highly valued.",
            key_skills: ["Accounting Principles", "Bookkeeping", "Financial Statements", "Taxation (Bangladesh)", "VAT", "Audit", "Tally", "QuickBooks", "Excel", "IFRS", "CA", "ACCA"]
         },
        finance_analyst: { 
            title: "Financial Analyst / Investment Analyst",
            description: "Analyze financial data, develop financial models, advise on investments, and support business planning. Common in banks and corporations.",
            key_skills: ["Financial Modeling", "Valuation", "Excel", "Data Analysis", "Investment Banking", "Corporate Finance", "Risk Management", "CFA", "Capital Markets"]
        },
        marketing_manager: { 
             title: "Marketing Manager / Digital Marketer",
             description: "Plan and execute marketing campaigns, manage brands, analyze market trends, and oversee digital marketing efforts.",
             key_skills: ["Marketing Strategy", "Digital Marketing", "SEO", "SEM", "Social Media Marketing", "Content Marketing", "Email Marketing", "Google Analytics", "Brand Management", "Market Research"]
        },
        hr_manager: { 
             title: "HR Manager / HR Executive",
             description: "Manage recruitment, employee relations, compensation and benefits, training, and HR policies.",
             key_skills: ["Recruitment", "Employee Relations", "Compensation & Benefits", "Performance Management", "HR Policy", "Labor Law (Bangladesh)", "HRIS", "Communication"]
        },
        business_analyst: { 
             title: "Business Analyst",
             description: "Bridge the gap between business needs and technical solutions, gathering requirements, analyzing processes, and recommending improvements.",
             key_skills: ["Requirements Gathering", "Process Modeling", "Data Analysis", "SQL", "Excel", "Project Management", "Agile", "Communication"]
        },
        supply_chain_manager: { 
             title: "Supply Chain Manager / Logistics Manager",
             description: "Oversee the end-to-end process of sourcing, production, inventory management, and distribution of goods.",
             key_skills: ["Logistics", "Inventory Management", "Procurement", "Supply Chain Planning", "Warehouse Management", "ERP Systems", "Negotiation"]
        },
        banker: { 
            title: "Banker / Banking Professional",
            description: "Work in various roles within a bank, such as relationship management, credit analysis, operations, or treasury.",
            key_skills: ["Banking Operations", "Credit Analysis", "Risk Management", "Relationship Management", "Financial Products", "Compliance", "Sales"]
         },
        economist: { 
            title: "Economist",
            description: "Research and analyze economic issues, study market trends, advise businesses and governments on economic policy.",
            key_skills: ["Economics", "Microeconomics", "Macroeconomics", "Econometrics", "Statistics", "Data Analysis", "R", "Stata", "Python", "Research", "Policy Analysis"]
        },
        management_consultant: { 
            title: "Management Consultant",
            description: "Help organizations solve problems, improve performance, and implement strategies across various business functions.",
            key_skills: ["Problem Solving", "Analytical Skills", "Communication", "Presentation", "Project Management", "Business Strategy", "Data Analysis", "Excel", "PowerPoint"]
        },
        entrepreneur: { 
             title: "Entrepreneur / Startup Founder",
             description: "Identify business opportunities, develop business plans, secure funding, and launch and manage new ventures.",
             key_skills: ["Entrepreneurship", "Business Planning", "Sales", "Marketing", "Finance", "Leadership", "Networking", "Risk Taking"]
        },
        banking_insurance_professional: { 
             title: "Banking & Insurance Professional",
             description: "Specialize in the operations, products, and regulations within the banking and insurance industries.",
             key_skills: ["Banking Operations", "Insurance Principles", "Risk Management", "Underwriting", "Claims Processing", "Financial Products", "Sales", "Compliance"]
        },
        tourism_hospitality_manager: { 
             title: "Tourism & Hospitality Manager",
             description: "Manage operations in hotels, resorts, travel agencies, event companies, ensuring customer satisfaction and business efficiency.",
             key_skills: ["Hospitality Management", "Hotel Operations", "Event Management", "Customer Service", "Tourism Management", "Marketing", "Booking Systems"]
        },
        e_commerce_specialist: { 
             title: "E-commerce Specialist / Manager",
             description: "Manage online sales channels, digital marketing for e-commerce, website optimization, and order fulfillment.",
             key_skills: ["E-commerce Platforms (Shopify, Daraz)", "Digital Marketing", "SEO", "SEM", "Online Sales", "Web Analytics", "Logistics", "Customer Experience"]
        },

        // --- RMG & Manufacturing Sector ---
        merchandiser_rmg: { 
            title: "Merchandiser (RMG)",
            description: "Act as a bridge between buyers and the production team in the garment industry, managing orders, costing, and communication.",
            key_skills: ["RMG Sector", "Apparel Merchandising", "Costing", "Order Management", "Buyer Communication", "Fabric Sourcing", "Production Planning", "English Communication"]
         },
        production_manager_rmg: { 
             title: "Production Manager (RMG/Textile)",
             description: "Oversee the garment or textile manufacturing process, ensuring efficiency, quality control, and timely delivery.",
             key_skills: ["Garment Production", "Textile Manufacturing", "Production Planning", "Quality Control (QC)", "IE (Industrial Engineering)", "Lean Manufacturing", "Team Management"]
        },
        fashion_designer: { 
            title: "Fashion Designer",
            description: "Conceptualize and create designs for clothing and accessories, considering trends, fabrics, and production techniques.",
            key_skills: ["Fashion Design", "Sketching", "CAD (Lectra, Gerber)", "Pattern Making", "Fabric Knowledge", "Trend Analysis", "Portfolio"]
         },
        quality_controller_rmg: { 
             title: "Quality Controller / QA (RMG)",
             description: "Inspect garments and processes at various stages of production to ensure they meet buyer specifications and quality standards (AQL).",
             key_skills: ["Quality Control", "Quality Assurance", "AQL", "Garment Inspection", "Fabric Inspection", "Testing Standards", "Compliance"]
        },
        industrial_engineer_ipe: { 
             title: "Industrial & Production Engineer (IPE)",
             description: "Optimize complex processes or systems in manufacturing, supply chain, and service industries to improve efficiency and productivity.",
             key_skills: ["IPE", "Industrial Engineering", "Production Engineering", "Operations Research", "Supply Chain Management", "Lean Manufacturing", "Six Sigma", "Quality Management", "Ergonomics", "CAD"]
        },
        leather_engineer: { 
             title: "Leather Technologist / Engineer",
             description: "Work in the leather industry focusing on tanning processes, quality control, product development, and environmental compliance.",
             key_skills: ["Leather Technology", "Tanning", "Finishing", "Leather Chemistry", "Quality Control", "Footwear Technology", "Environmental Compliance"]
        },

        // --- Engineering Sector (Non-Software) ---
        electrical_engineer: { 
             title: "Electrical Engineer",
             description: "Design, develop, test, and supervise the manufacturing of electrical equipment, systems, and components.",
             key_skills: ["Circuit Design", "Power Systems", "Control Systems", "PLC", "AutoCAD Electrical", "MATLAB", "Electronics", "Renewable Energy"]
        },
        mechanical_engineer: { 
             title: "Mechanical Engineer",
             description: "Design, analyze, manufacture, and maintain mechanical systems, including machinery, engines, and thermal devices.",
             key_skills: ["CAD (AutoCAD, SolidWorks)", "FEA", "Thermodynamics", "Fluid Mechanics", "Manufacturing Processes", "HVAC", "Robotics", "MATLAB"]
        },
        civil_engineer: { 
            title: "Civil Engineer",
            description: "Plan, design, construct, and maintain infrastructure projects like roads, bridges, buildings, and water systems.",
            key_skills: ["Structural Design", "AutoCAD", "STAAD Pro", "ETABS", "Surveying", "Construction Management", "Geotechnical Engineering", "Transportation Engineering"]
         },
        textile_engineer: { 
             title: "Textile Engineer",
             description: "Work with textile processes like spinning, weaving, knitting, dyeing, and finishing, often within the RMG supply chain.",
             key_skills: ["Textile Manufacturing", "Yarn Manufacturing", "Weaving", "Knitting", "Dyeing", "Finishing", "Textile Chemistry", "Quality Control"]
        },
        chemical_engineer: { 
            title: "Chemical Engineer",
            description: "Design and manage processes for the production of chemicals, fuels, pharmaceuticals, food, and other products.",
            key_skills: ["Chemical Engineering", "Process Design", "Mass Transfer", "Heat Transfer", "Thermodynamics", "Chemical Reactions", "Process Simulation (Aspen, HYSYS)", "Safety"]
        },
        materials_engineer: { 
            title: "Materials Science & Engineer (MSE)",
            description: "Develop, process, and test materials used in various products, focusing on the relationship between structure, properties, and performance.",
            key_skills: ["Materials Science", "Metallurgy", "Polymers", "Ceramics", "Composites", "Material Characterization", "Nanomaterials", "Process Engineering"]
        },
        architect: { 
            title: "Architect",
            description: "Plan and design buildings and other structures, combining artistic vision with technical knowledge of construction and materials.",
            key_skills: ["Architecture", "Architectural Design", "CAD (AutoCAD, Revit, SketchUp)", "Building Codes", "Construction Materials", "Sustainability", "Portfolio"]
        },
        urban_planner: { 
            title: "Urban & Regional Planner (URP)",
            description: "Develop plans and programs for the use of land, helping communities create sustainable, functional, and aesthetically pleasing environments.",
            key_skills: ["Urban Planning", "Regional Planning", "GIS", "Land Use Planning", "Transportation Planning", "Environmental Planning", "Community Development", "Policy Analysis"]
        },
        aeronautical_engineer: { 
            title: "Aeronautical / Aerospace Engineer",
            description: "Design, develop, test, and maintain aircraft, spacecraft, missiles, and related systems.",
            key_skills: ["Aerodynamics", "Propulsion", "Aircraft Structures", "Flight Mechanics", "Control Systems", "CAD", "FEA", "MATLAB"]
        },
        naval_architect_marine_engineer: { 
             title: "Naval Architect & Marine Engineer",
             description: "Design, construct, and maintain ships, boats, offshore structures, and other marine vessels.",
             key_skills: ["Naval Architecture", "Marine Engineering", "Ship Design", "Hydrodynamics", "Marine Structures", "Propulsion Systems", "CAD", "Shipyard Operations"]
        },
        mechatronics_engineer: { 
             title: "Mechatronics Engineer / Robotics Engineer",
             description: "Integrate mechanical, electrical, computer control, and systems design engineering to create automated systems and robots.",
             key_skills: ["Mechatronics", "Robotics", "Control Systems", "Electronics", "Mechanical Design", "PLC", "Microcontrollers", "Python", "C++", "CAD"]
        },
        biomedical_engineer: { 
             title: "Biomedical Engineer",
             description: "Apply engineering principles to design and develop medical devices, diagnostic tools, artificial organs, and healthcare technologies.",
             key_skills: ["Biomedical Engineering", "Medical Devices", "Biomechanics", "Biomaterials", "Bioinstrumentation", "Medical Imaging", "Tissue Engineering", "CAD"]
        },
        petroleum_mining_engineer: { 
             title: "Petroleum / Mining Engineer",
             description: "Work on the exploration, extraction, and production of oil, gas, or minerals from the earth.",
             key_skills: ["Petroleum Engineering", "Mining Engineering", "Reservoir Engineering", "Drilling", "Geology", "Resource Estimation", "Mine Planning", "Safety"]
        },
        food_engineer: { 
             title: "Food Engineer / Technologist",
             description: "Apply engineering principles to the processing, packaging, preservation, and distribution of food products.",
             key_skills: ["Food Engineering", "Food Processing", "Food Chemistry", "Food Safety", "Quality Control", "Packaging Technology", "HACCP"]
        },
        environmental_engineer: { 
             title: "Environmental Engineer / Scientist",
             description: "Develop solutions to environmental problems, focusing on water/air pollution control, waste management, and sustainable practices.",
             key_skills: ["Environmental Engineering", "Environmental Science", "Water Treatment", "Wastewater Treatment", "Air Pollution Control", "Solid Waste Management", "EIA", "Sustainability"]
        },

        // --- Medical & Health Sciences ---
        doctor: { 
            title: "Doctor / Physician (MBBS)",
            description: "Diagnose and treat illnesses and injuries, provide preventative care, and manage patient health.",
            key_skills: ["MBBS", "Medical Diagnosis", "Treatment Planning", "Patient Care", "Clinical Skills", "Communication", "Specialization (e.g., FCPS, MD, MS)"]
         },
        nurse: { 
            title: "Nurse",
            description: "Provide direct patient care, administer medications, monitor patient conditions, and educate patients and families.",
            key_skills: ["Patient Care", "Nursing Skills", "Medication Administration", "Charting", "Vital Signs", "Communication", "Empathy", "Nursing Degree"]
         },
        pharmacist: { 
            title: "Pharmacist",
            description: "Dispense medications, advise patients on drug use, monitor for side effects, and manage pharmacy operations.",
            key_skills: ["Pharmacology", "Medication Dispensing", "Patient Counseling", "Pharmacy Management", "Drug Interactions", "Regulatory Compliance", "Pharmacy Degree"]
         },
        dentist: { 
            title: "Dentist (BDS)",
            description: "Diagnose, treat, and prevent diseases and conditions of the oral cavity (teeth, gums, mouth).",
            key_skills: ["BDS", "Dentistry", "Oral Surgery", "Orthodontics", "Prosthodontics", "Endodontics", "Patient Care", "Clinical Skills"]
        },
        physiotherapist: { 
            title: "Physiotherapist (BPT)",
            description: "Help patients recover from injury, illness, or disability through movement, exercise, manual therapy, and education.",
            key_skills: ["BPT", "Physiotherapy", "Rehabilitation", "Manual Therapy", "Exercise Therapy", "Patient Assessment", "Anatomy", "Physiology"]
        },
        public_health_professional: { 
             title: "Public Health Professional",
             description: "Work to improve community health through research, education, policy development, and managing health programs.",
             key_skills: ["Public Health", "Epidemiology", "Biostatistics", "Health Policy", "Health Education", "Community Health", "Research"]
        },
        medical_technologist: { 
             title: "Medical Technologist / Laboratory Scientist",
             description: "Perform laboratory tests on patient samples to help diagnose and treat diseases.",
             key_skills: ["Medical Technology", "Laboratory Techniques", "Microbiology", "Biochemistry", "Hematology", "Immunology", "Quality Control", "Laboratory Medicine"]
        },
        nutritionist_dietitian: { 
             title: "Nutritionist / Dietitian",
             description: "Advise individuals and groups on nutrition and dietary choices for health maintenance, disease prevention, and management.",
             key_skills: ["Nutrition", "Dietetics", "Food Science", "Clinical Nutrition", "Meal Planning", "Patient Counseling", "Biochemistry"]
        },
        veterinarian: { 
             title: "Veterinarian (DVM)",
             description: "Provide medical care for animals, including diagnosis, treatment, surgery, and preventative health.",
             key_skills: ["DVM", "Veterinary Medicine", "Animal Health", "Surgery", "Diagnosis", "Pharmacology", "Clinical Skills"]
        },

        // --- Law ---
        lawyer_advocate: { 
            title: "Lawyer / Advocate",
            description: "Advise clients on legal matters, represent them in court or negotiations, and prepare legal documents.",
            key_skills: ["LLB", "Law", "Legal Research", "Legal Writing", "Litigation", "Corporate Law", "Criminal Law", "Civil Law", "Argumentation"]
        },

        // --- Education ---
        teacher_lecturer: { 
             title: "Teacher / Lecturer (School/College/University)",
             description: "Educate students in a specific subject area, prepare lesson plans, evaluate student progress, and manage classrooms.",
             key_skills: ["Teaching", "Lesson Planning", "Subject Matter Expertise", "Classroom Management", "Assessment", "Communication", "NTRCA", "BCS (Education Cadre)", "B.Ed"]
        },
        education_administrator: { 
            title: "Education Administrator",
            description: "Manage operations in schools, colleges, or universities, overseeing staff, budgets, curriculum development, and policy implementation.",
            key_skills: ["Educational Leadership", "School Management", "Curriculum Development", "Policy Implementation", "Budgeting", "Staff Management", "Education"]
        },

        // --- Arts, Humanities & Social Sciences ---
        journalist_reporter: { 
            title: "Journalist / Reporter / Media Professional",
            description: "Gather information, write news stories, create content for print, broadcast, or online media outlets.",
            key_skills: ["Journalism", "Reporting", "Writing", "Editing", "Interviewing", "Mass Communication", "Media Ethics", "Digital Media", "Video Production", "Media Studies", "Development Communication"]
        },
        social_worker: { 
            title: "Social Worker",
            description: "Help individuals, families, and communities cope with problems and improve their well-being.",
            key_skills: ["Social Work", "Counseling", "Case Management", "Community Development", "Psychology", "Sociology", "Empathy", "Advocacy", "Gender Studies"]
        },
        researcher_humanities_social: { 
             title: "Researcher (Humanities/Social Sciences)",
             description: "Conduct academic research, analyze data, write scholarly articles or books in fields like history, sociology, literature, economics, etc.",
             key_skills: ["Research Methodology", "Qualitative Research", "Quantitative Research", "Data Analysis (SPSS, Stata)", "Academic Writing", "Critical Thinking", "Subject Matter Expertise", "Bangla", "English", "Arabic", "Islamic Studies", "Islamic History", "History", "Philosophy", "Sociology", "Anthropology", "Political Science", "Economics", "International Relations", "Public Administration", "Linguistics", "Folklore", "Criminology", "Population Sciences", "Peace Studies", "Conflict Studies", "Gender Studies"]
        },
        content_writer: { 
            title: "Content Writer / Copywriter",
            description: "Write engaging and informative content for websites, blogs, social media, marketing materials, and other platforms.",
            key_skills: ["Writing", "Editing", "Proofreading", "SEO Writing", "Content Strategy", "Copywriting", "Research", "English Fluency", "Bangla Writing", "Journalism", "Mass Communication"]
         },
        graphic_designer: { 
            title: "Graphic Designer",
            description: "Create visual concepts using software or by hand to communicate ideas that inspire, inform, or captivate consumers.",
            key_skills: ["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Typography", "Color Theory", "Layout Design", "Branding", "Portfolio", "Fine Arts", "After Effects"]
         },
        librarian: { 
             title: "Librarian / Information Scientist",
             description: "Manage library resources, assist users in finding information, organize collections, and manage library systems.",
             key_skills: ["Library Science", "Information Management", "Cataloging", "Archiving", "Database Searching", "Research Skills", "Digital Libraries"]
        },
        archaeologist_historian: { 
             title: "Archaeologist / Historian",
             description: "Study past human activity by excavating and analyzing artifacts (Archaeologist) or researching and writing about past events (Historian).",
             key_skills: ["Archaeology", "History", "Excavation", "Artifact Analysis", "Historical Research", "Archival Research", "Writing", "Islamic History"]
        },
        psychologist_counselor: { 
             title: "Psychologist / Counselor",
             description: "Assess and treat mental and emotional disorders (Clinical Psychologist) or provide guidance on personal, social, or academic issues (Counselor). Requires further study.",
             key_skills: ["Psychology", "Counseling", "Clinical Psychology", "Psychotherapy", "Assessment", "Empathy", "Communication"]
        },
        geographer_environmentalist: { 
             title: "Geographer / Environmental Scientist",
             description: "Study the Earth's surface, its environment, and human interaction (Geographer) or work to protect the environment (Environmental Scientist).",
             key_skills: ["Geography", "Environmental Science", "GIS", "Remote Sensing", "Cartography", "Data Analysis", "Field Work", "Environmental Policy", "Oceanography", "Meteorology"]
        },
        development_worker: { 
             title: "Development Worker / NGO Professional",
             description: "Work for non-governmental organizations (NGOs) or international agencies on projects related to poverty reduction, health, education, etc.",
             key_skills: ["Development Studies", "Project Management", "Community Development", "Monitoring & Evaluation (M&E)", "Proposal Writing", "Advocacy", "Field Work", "Sociology", "Anthropology", "Political Science", "International Relations", "Peace Studies", "Conflict Studies", "Gender Studies", "Development Communication", "Disaster Management"]
        },
        public_administrator_govt_official: { 
             title: "Public Administrator / Government Official (BCS etc.)",
             description: "Work in government agencies implementing public policy, managing public services, and serving in administrative roles (e.g., BCS cadres).",
             key_skills: ["Public Administration", "Policy Analysis", "Government Operations", "BCS Exam Prep", "Leadership", "Communication", "Specific Cadre Knowledge", "Political Science", "International Relations"]
        },
        
        // --- Agriculture & Environment ---
        agriculturist: { 
             title: "Agriculturist / Agricultural Scientist",
             description: "Improve agricultural practices, conduct research on crops and livestock, manage farms, and advise farmers.",
             key_skills: ["Agriculture", "Agronomy", "Horticulture", "Soil Science", "Plant Pathology", "Animal Husbandry", "Farm Management", "Research", "Botany"]
        },
        fisheries_professional: { 
             title: "Fisheries Officer / Aquaculture Specialist",
             description: "Manage fisheries resources, work in fish farming (aquaculture), conduct research, and ensure sustainable practices.",
             key_skills: ["Fisheries Science", "Aquaculture", "Fish Biology", "Hatchery Management", "Water Quality Management", "Sustainable Fisheries", "Zoology"]
        },
        forester: { 
             title: "Forester / Forestry Officer",
             description: "Manage forests and natural resources, focusing on conservation, timber production, wildlife management, and reforestation.",
             key_skills: ["Forestry", "Silviculture", "Forest Management", "Conservation", "Wildlife Management", "GIS", "Surveying", "Botany"]
        },

        // --- Other Common Roles ---
        customer_service_rep: { 
             title: "Customer Service Representative / Call Center Agent",
             description: "Interact with customers to provide information, answer inquiries, resolve issues, and handle complaints.",
             key_skills: ["Communication", "Problem Solving", "Customer Support", "Active Listening", "Empathy", "CRM Software", "Typing Speed", "English"]
         },
        project_manager: { 
            title: "Project Manager",
            description: "Plan, execute, and oversee projects to ensure they are completed on time, within budget, and meet objectives. Common across many industries.",
            key_skills: ["Project Management", "PMP", "Agile", "Scrum", "Risk Management", "Budgeting", "Scheduling", "Communication", "Leadership", "MS Project", "JIRA", "Management"]
        },
        researcher_science: { // Added Generic Science Researcher
            title: "Researcher (Science)",
            description: "Conduct scientific research in a laboratory or field setting, analyze data, publish findings in fields like Physics, Chemistry, Biology etc.",
            key_skills: ["Research Methodology", "Data Analysis", "Laboratory Techniques", "Scientific Writing", "Subject Matter Expertise", "Physics", "Chemistry", "Mathematics", "Statistics", "Botany", "Zoology", "Biochemistry", "Microbiology", "Biotechnology", "Genetic Engineering"]
        },


        // --- Creative & Specialized ---
         film_media_professional: { 
             title: "Film / Media Professional",
             description: "Work in various roles in film, television, or digital media production, such as director, producer, cinematographer, editor, or scriptwriter.",
             key_skills: ["Film Production", "Video Production", "Directing", "Producing", "Cinematography", "Scriptwriting", "Editing (Premiere, FCP)", "Storytelling", "Media Studies"]
         },
         interior_designer: { 
             title: "Interior Designer",
             description: "Plan and design the interior spaces of buildings, focusing on aesthetics, functionality, and safety.",
             key_skills: ["Interior Design", "Space Planning", "CAD (AutoCAD, SketchUp)", "3D Rendering", "Material Selection", "Color Theory", "Furniture Design"]
         },
         animator: { 
             title: "Animator (2D/3D)",
             description: "Create animation and visual effects for films, video games, television, mobile apps, and websites.",
             key_skills: ["Animation", "2D Animation", "3D Animation", "Maya", "Blender", "Adobe Animate", "After Effects", "Modeling", "Rigging", "Storyboarding", "Fine Arts"]
         },
         statistician: { 
             title: "Statistician / Applied Statistician",
             description: "Apply statistical methods to collect, analyze, interpret, and present data in various fields like research, business, and government.",
             key_skills: ["Statistics", "Applied Statistics", "Statistical Modeling", "R", "SAS", "SPSS", "Python", "Data Analysis", "Experimental Design", "Mathematics"]
         },
         disaster_management_specialist: { 
             title: "Disaster Management Specialist",
             description: "Plan for and respond to emergencies and disasters, coordinating relief efforts, risk assessment, and preparedness programs.",
             key_skills: ["Disaster Management", "Emergency Response", "Risk Assessment", "GIS", "Community Preparedness", "Logistics", "Project Management"]
         },
         various_govt_jobs: { // Generic Government Job category for BCS
            title: "Government Official (Various Cadres)",
            description: "Serve in various administrative, technical, or specialized roles within the Bangladesh Civil Service (BCS) or other government bodies.",
            key_skills: ["BCS Exam Prep", "Public Policy", "Administration", "Specific Cadre Knowledge (e.g., Foreign Affairs, Police, Admin, Tax)", "Communication", "Leadership"]
         }

        // ... Continue adding more careers ...
    },
keywords: {
        // --- Technical Skills ---
        // Programming & Web - type: 'skill'
        "python": { type: 'skill', careers: ["data_scientist", "backend_developer", "full_stack_developer", "devops_engineer", "ai_ml_engineer", "statistician", "software_engineer", "mechatronics_engineer", "economist"] },
        "java": { type: 'skill', careers: ["backend_developer", "full_stack_developer", "mobile_app_developer", "software_engineer"] },
        "javascript": { type: 'skill', careers: ["frontend_developer", "backend_developer", "full_stack_developer", "software_engineer", "game_developer"] },
        "js": { type: 'skill', careers: ["frontend_developer", "backend_developer", "full_stack_developer", "software_engineer", "game_developer"] },
        "typescript": { type: 'skill', careers: ["frontend_developer", "backend_developer", "full_stack_developer", "software_engineer"] },
        "html": { type: 'skill', careers: ["frontend_developer", "full_stack_developer", "software_engineer"] },
        "css": { type: 'skill', careers: ["frontend_developer", "full_stack_developer", "software_engineer"] },
        "react": { type: 'skill', careers: ["frontend_developer", "full_stack_developer", "software_engineer"] },
        "react.js": { type: 'skill', careers: ["frontend_developer", "full_stack_developer", "software_engineer"] },
        "angular": { type: 'skill', careers: ["frontend_developer", "full_stack_developer", "software_engineer"] },
        "vue": { type: 'skill', careers: ["frontend_developer", "full_stack_developer", "software_engineer"] },
        "node.js": { type: 'skill', careers: ["backend_developer", "full_stack_developer", "software_engineer"] },
        "nodejs": { type: 'skill', careers: ["backend_developer", "full_stack_developer", "software_engineer"] },
        "express": { type: 'skill', careers: ["backend_developer", "full_stack_developer", "software_engineer"] },
        "php": { type: 'skill', careers: ["backend_developer", "full_stack_developer"] },
        "laravel": { type: 'skill', careers: ["backend_developer", "full_stack_developer"] },
        "c#": { type: 'skill', careers: ["backend_developer", "game_developer", "software_engineer"] },
        ".net": { type: 'skill', careers: ["backend_developer", "software_engineer"] },
        "ruby": { type: 'skill', careers: ["backend_developer", "software_engineer"] },
        "go": { type: 'skill', careers: ["backend_developer", "software_engineer"] },
        "swift": { type: 'skill', careers: ["mobile_app_developer"] },
        "kotlin": { type: 'skill', careers: ["mobile_app_developer"] },
        "android": { type: 'skill', careers: ["mobile_app_developer"] },
        "android sdk": { type: 'skill', careers: ["mobile_app_developer"] },
        "ios": { type: 'skill', careers: ["mobile_app_developer"] },
        "ios sdk": { type: 'skill', careers: ["mobile_app_developer"] },
        "flutter": { type: 'skill', careers: ["mobile_app_developer"] },
        "react native": { type: 'skill', careers: ["mobile_app_developer"] },
        "sql": { type: 'skill', careers: ["data_scientist", "backend_developer", "full_stack_developer", "qa_engineer", "business_analyst", "mis_specialist", "software_engineer"] },
        "mysql": { type: 'skill', careers: ["backend_developer", "software_engineer"] },
        "postgresql": { type: 'skill', careers: ["backend_developer", "full_stack_developer", "software_engineer"] },
        "mongodb": { type: 'skill', careers: ["backend_developer", "full_stack_developer", "software_engineer"] },
        "nosql": { type: 'skill', careers: ["backend_developer", "software_engineer"] },
        "rest api": { type: 'skill', careers: ["backend_developer", "frontend_developer", "full_stack_developer", "mobile_app_developer", "software_engineer"] },
        "graphql": { type: 'skill', careers: ["backend_developer", "frontend_developer", "full_stack_developer"] },
        "firebase": { type: 'skill', careers: ["mobile_app_developer", "full_stack_developer"] },
        "jquery": { type: 'skill', careers: ["frontend_developer"] },
        "bootstrap": { type: 'skill', careers: ["frontend_developer"] },
        "tailwind css": { type: 'skill', careers: ["frontend_developer"] },

        // Data Science & ML - type: 'skill'
        "r": { type: 'skill', careers: ["data_scientist", "statistician", "economist"] },
        "pandas": { type: 'skill', careers: ["data_scientist", "ai_ml_engineer"] },
        "numpy": { type: 'skill', careers: ["data_scientist", "ai_ml_engineer"] },
        "scikit-learn": { type: 'skill', careers: ["data_scientist", "ai_ml_engineer"] },
        "tensorflow": { type: 'skill', careers: ["data_scientist", "ai_ml_engineer"] },
        "pytorch": { type: 'skill', careers: ["data_scientist", "ai_ml_engineer"] },
        "machine learning": { type: 'skill', careers: ["data_scientist", "ai_ml_engineer"] },
        "deep learning": { type: 'skill', careers: ["data_scientist", "ai_ml_engineer"] },
        "data analysis": { type: 'skill', careers: ["data_scientist", "business_analyst", "finance_analyst", "economist", "statistician", "marketing_manager", "mis_specialist"] },
        "statistics": { type: 'skill', careers: ["data_scientist", "statistician", "economist", "finance_analyst", "ai_ml_engineer"] },
        "applied statistics": { type: 'skill', careers: ["statistician", "data_scientist"] },
        "data mining": { type: 'skill', careers: ["data_scientist"] },
        "big data": { type: 'skill', careers: ["data_scientist", "ai_ml_engineer"] },
        "hadoop": { type: 'skill', careers: ["data_scientist"] },
        "spark": { type: 'skill', careers: ["data_scientist"] },
        "nlp": { type: 'skill', careers: ["data_scientist", "ai_ml_engineer"] },
        "computer vision": { type: 'skill', careers: ["data_scientist", "ai_ml_engineer"] },

        // DevOps & Cloud - type: 'skill'
        "aws": { type: 'skill', careers: ["devops_engineer", "backend_developer", "full_stack_developer", "software_engineer"] },
        "azure": { type: 'skill', careers: ["devops_engineer", "backend_developer", "software_engineer"] },
        "gcp": { type: 'skill', careers: ["devops_engineer"] },
        "docker": { type: 'skill', careers: ["devops_engineer", "backend_developer", "full_stack_developer", "software_engineer"] },
        "kubernetes": { type: 'skill', careers: ["devops_engineer"] },
        "jenkins": { type: 'skill', careers: ["devops_engineer"] },
        "gitlab ci": { type: 'skill', careers: ["devops_engineer"] },
        "terraform": { type: 'skill', careers: ["devops_engineer"] },
        "ansible": { type: 'skill', careers: ["devops_engineer"] },
        "linux": { type: 'skill', careers: ["devops_engineer", "backend_developer", "it_support_specialist", "network_engineer", "cyber_security_analyst"] },
        "bash": { type: 'skill', careers: ["devops_engineer"] },
        "scripting": { type: 'skill', careers: ["devops_engineer", "python"] },

        // QA & Testing - type: 'skill'
        "qa": { type: 'skill', careers: ["qa_engineer"] },
        "testing": { type: 'skill', careers: ["qa_engineer"] },
        "manual testing": { type: 'skill', careers: ["qa_engineer"] },
        "automation testing": { type: 'skill', careers: ["qa_engineer"] },
        "selenium": { type: 'skill', careers: ["qa_engineer"] },
        "cypress": { type: 'skill', careers: ["qa_engineer"] },
        "appium": { type: 'skill', careers: ["qa_engineer"] },
        "jira": { type: 'skill', careers: ["qa_engineer", "business_analyst", "project_manager", "software_engineer"] },

        // Design - type: 'skill'
        "figma": { type: 'skill', careers: ["ui_ux_designer", "frontend_developer", "graphic_designer"] },
        "sketch": { type: 'skill', careers: ["ui_ux_designer"] },
        "adobe xd": { type: 'skill', careers: ["ui_ux_designer"] },
        "photoshop": { type: 'skill', careers: ["graphic_designer", "ui_ux_designer"] },
        "illustrator": { type: 'skill', careers: ["graphic_designer", "ui_ux_designer"] },
        "indesign": { type: 'skill', careers: ["graphic_designer"] },
        "ui design": { type: 'skill', careers: ["ui_ux_designer"] },
        "ux design": { type: 'skill', careers: ["ui_ux_designer"] },
        "user research": { type: 'skill', careers: ["ui_ux_designer", "marketing_manager"] },
        "wireframe": { type: 'skill', careers: ["ui_ux_designer"] },
        "wireframing": { type: 'skill', careers: ["ui_ux_designer"] },
        "prototyping": { type: 'skill', careers: ["ui_ux_designer"] },
        "interaction design": { type: 'skill', careers: ["ui_ux_designer"] },
        "graphic design": { type: 'skill', careers: ["graphic_designer"] },
        "typography": { type: 'skill', careers: ["graphic_designer", "ui_ux_designer"] },
        "color theory": { type: 'skill', careers: ["graphic_designer", "ui_ux_designer"] },
        "branding": { type: 'skill', careers: ["graphic_designer", "marketing_manager"] },
        "portfolio": { type: 'general', careers: ["graphic_designer", "ui_ux_designer", "fashion_designer", "architect", "animator", "interior_designer"] }, // Presence of portfolio
        "visual design": { type: 'skill', careers: ["ui_ux_designer", "graphic_designer"] },

        // Security - type: 'skill'
        "cyber security": { type: 'skill', careers: ["cyber_security_analyst"] },
        "cybersecurity": { type: 'skill', careers: ["cyber_security_analyst"] },
        "network security": { type: 'skill', careers: ["cyber_security_analyst", "network_engineer"] },
        "information security": { type: 'skill', careers: ["cyber_security_analyst"] },
        "siem": { type: 'skill', careers: ["cyber_security_analyst"] },
        "penetration testing": { type: 'skill', careers: ["cyber_security_analyst"] },
        "vulnerability assessment": { type: 'skill', careers: ["cyber_security_analyst"] },
        "firewall": { type: 'skill', careers: ["cyber_security_analyst", "it_support_specialist", "network_engineer"] },
        "cryptography": { type: 'skill', careers: ["cyber_security_analyst"] },

        // IT Support - type: 'skill'
        "it support": { type: 'skill', careers: ["it_support_specialist"] },
        "help desk": { type: 'skill', careers: ["it_support_specialist"] },
        "troubleshooting": { type: 'skill', careers: ["it_support_specialist", "qa_engineer", "network_engineer"] },
        "hardware": { type: 'skill', careers: ["it_support_specialist"] },
        "software installation": { type: 'skill', careers: ["it_support_specialist"] },
        "networking": { type: 'skill', careers: ["it_support_specialist", "devops_engineer", "cyber_security_analyst", "network_engineer"] },
        "active directory": { type: 'skill', careers: ["it_support_specialist", "network_engineer"] },
        "windows": { type: 'skill', careers: ["it_support_specialist"] },
        "macos": { type: 'skill', careers: ["it_support_specialist"] },
        "tcp/ip": { type: 'skill', careers: ["network_engineer", "it_support_specialist", "devops_engineer", "cyber_security_analyst"] },
        "routing": { type: 'skill', careers: ["network_engineer"] },
        "switching": { type: 'skill', careers: ["network_engineer"] },
        "vpn": { type: 'skill', careers: ["network_engineer", "cyber_security_analyst"] },
        "cisco": { type: 'skill', careers: ["network_engineer"] },
        "juniper": { type: 'skill', careers: ["network_engineer"] },
        "ccna": { type: 'skill', careers: ["network_engineer"] }, // Certification
        "ccnp": { type: 'skill', careers: ["network_engineer"] }, // Certification

        // Business & Finance - Mostly type: 'skill' but some 'general'
        "accounting": { type: 'skill', careers: ["accountant", "finance_analyst"] },
        "bookkeeping": { type: 'skill', careers: ["accountant"] },
        "tax": { type: 'skill', careers: ["accountant"] },
        "taxation": { type: 'skill', careers: ["accountant"] },
        "vat": { type: 'skill', careers: ["accountant"] },
        "audit": { type: 'skill', careers: ["accountant"] },
        "tally": { type: 'skill', careers: ["accountant"] },
        "quickbooks": { type: 'skill', careers: ["accountant"] },
        "excel": { type: 'skill', careers: ["accountant", "finance_analyst", "business_analyst", "data_scientist", "marketing_manager", "supply_chain_manager", "economist", "statistician", "mis_specialist", "hr_manager"] },
        "financial modeling": { type: 'skill', careers: ["finance_analyst"] },
        "valuation": { type: 'skill', careers: ["finance_analyst"] },
        "investment": { type: 'skill', careers: ["finance_analyst", "banker"] },
        "investment banking": { type: 'experience', careers: ["finance_analyst"] }, // More specific
        "corporate finance": { type: 'skill', careers: ["finance_analyst"] },
        "risk management": { type: 'skill', careers: ["finance_analyst", "banker", "banking_insurance_professional"] },
        "marketing": { type: 'skill', careers: ["marketing_manager", "e_commerce_specialist", "entrepreneur"] },
        "marketing strategy": { type: 'skill', careers: ["marketing_manager"] },
        "digital marketing": { type: 'skill', careers: ["marketing_manager", "e_commerce_specialist", "content_writer"] },
        "seo": { type: 'skill', careers: ["marketing_manager", "content_writer", "e_commerce_specialist"] },
        "sem": { type: 'skill', careers: ["marketing_manager", "e_commerce_specialist"] },
        "social media": { type: 'skill', careers: ["marketing_manager", "content_writer"] },
        "social media marketing": { type: 'skill', careers: ["marketing_manager"] },
        "content marketing": { type: 'skill', careers: ["marketing_manager", "content_writer"] },
        "email marketing": { type: 'skill', careers: ["marketing_manager"] },
        "google analytics": { type: 'skill', careers: ["marketing_manager", "e_commerce_specialist"] },
        "brand management": { type: 'skill', careers: ["marketing_manager"] },
        "market research": { type: 'skill', careers: ["marketing_manager", "business_analyst", "economist"] },
        "hr": { type: 'skill', careers: ["hr_manager"] },
        "human resource management": { type: 'skill', careers: ["hr_manager"] },
        "hrm": { type: 'skill', careers: ["hr_manager"] },
        "recruitment": { type: 'skill', careers: ["hr_manager"] },
        "employee relations": { type: 'skill', careers: ["hr_manager"] },
        "compensation": { type: 'skill', careers: ["hr_manager"] },
        "benefits": { type: 'skill', careers: ["hr_manager"] },
        "payroll": { type: 'skill', careers: ["hr_manager", "accountant"] },
        "performance management": { type: 'skill', careers: ["hr_manager"] },
        "labor law": { type: 'skill', careers: ["hr_manager", "lawyer_advocate"] },
        "hris": { type: 'skill', careers: ["hr_manager"] },
        "business analysis": { type: 'skill', careers: ["business_analyst", "mis_specialist"] },
        "requirements gathering": { type: 'skill', careers: ["business_analyst"] },
        "process modeling": { type: 'skill', careers: ["business_analyst", "industrial_engineer_ipe"] },
        "systems analysis": { type: 'skill', careers: ["business_analyst", "mis_specialist"] },
        "supply chain": { type: 'skill', careers: ["supply_chain_manager"] },
        "supply chain management": { type: 'skill', careers: ["supply_chain_manager", "industrial_engineer_ipe"] },
        "logistics": { type: 'skill', careers: ["supply_chain_manager", "e_commerce_specialist", "disaster_management_specialist"] },
        "inventory management": { type: 'skill', careers: ["supply_chain_manager", "accountant"] },
        "inventory": { type: 'general', careers: ["supply_chain_manager", "accountant"] },
        "procurement": { type: 'skill', careers: ["supply_chain_manager"] },
        "warehouse management": { type: 'skill', careers: ["supply_chain_manager"] },
        "warehouse": { type: 'general', careers: ["supply_chain_manager"] },
        "erp": { type: 'skill', careers: ["supply_chain_manager", "accountant", "business_analyst", "mis_specialist", "industrial_engineer_ipe"] },
        "sap": { type: 'skill', careers: ["supply_chain_manager", "accountant", "business_analyst", "mis_specialist"] },
        "oracle": { type: 'skill', careers: ["supply_chain_manager", "accountant", "business_analyst", "mis_specialist", "backend_developer"] }, // Oracle DB too
        "banking": { type: 'skill', careers: ["banker", "banking_insurance_professional", "finance_analyst"] },
        "credit analysis": { type: 'skill', careers: ["banker", "finance_analyst"] },
        "insurance": { type: 'skill', careers: ["banking_insurance_professional"] },
        "underwriting": { type: 'skill', careers: ["banking_insurance_professional"] },
        "claims processing": { type: 'skill', careers: ["banking_insurance_professional"] },
        "business strategy": { type: 'skill', careers: ["management_consultant", "marketing_manager"] },
        "business planning": { type: 'skill', careers: ["entrepreneur", "management_consultant"] },
        "sales": { type: 'skill', careers: ["marketing_manager", "banker", "banking_insurance_professional", "entrepreneur"] },
        "ifrs": { type: 'skill', careers: ["accountant"] },
        "capital markets": { type: 'skill', careers: ["finance_analyst"] },
        "microeconomics": { type: 'skill', careers: ["economist"] },
        "macroeconomics": { type: 'skill', careers: ["economist"] },
        "econometrics": { type: 'skill', careers: ["economist", "data_scientist"] },
        "stata": { type: 'skill', careers: ["economist", "researcher_humanities_social"] },
        "hotel operations": { type: 'skill', careers: ["tourism_hospitality_manager"] },
        "event management": { type: 'skill', careers: ["tourism_hospitality_manager", "marketing_manager"] },
        "booking systems": { type: 'skill', careers: ["tourism_hospitality_manager"] },
        "shopify": { type: 'skill', careers: ["e_commerce_specialist"] },
        "daraz": { type: 'skill', careers: ["e_commerce_specialist"] }, // Local Platform
        "online sales": { type: 'skill', careers: ["e_commerce_specialist"] },
        "web analytics": { type: 'skill', careers: ["e_commerce_specialist", "marketing_manager"] },
        "customer experience": { type: 'skill', careers: ["e_commerce_specialist", "marketing_manager", "ui_ux_designer"] },

        // RMG & Manufacturing - type: 'skill' mostly, some 'experience' or 'general'
        "rmg": { type: 'experience', careers: ["merchandiser_rmg", "production_manager_rmg", "quality_controller_rmg", "textile_engineer", "fashion_designer", "supply_chain_manager"] },
        "garments": { type: 'experience', careers: ["merchandiser_rmg", "production_manager_rmg", "quality_controller_rmg", "fashion_designer"] },
        "apparel": { type: 'experience', careers: ["merchandiser_rmg", "production_manager_rmg", "quality_controller_rmg", "fashion_designer"] },
        "textile": { type: 'skill', careers: ["production_manager_rmg", "textile_engineer", "quality_controller_rmg", "materials_engineer"] },
        "textile manufacturing": { type: 'skill', careers: ["textile_engineer", "production_manager_rmg"] },
        "merchandising": { type: 'skill', careers: ["merchandiser_rmg"] },
        "costing": { type: 'skill', careers: ["merchandiser_rmg", "accountant", "production_manager_rmg"] },
        "sourcing": { type: 'skill', careers: ["merchandiser_rmg", "supply_chain_manager"] },
        "production planning": { type: 'skill', careers: ["production_manager_rmg", "merchandiser_rmg", "supply_chain_manager", "industrial_engineer_ipe"] },
        "quality control": { type: 'skill', careers: ["quality_controller_rmg", "production_manager_rmg", "qa_engineer", "industrial_engineer_ipe", "food_engineer", "leather_engineer"] },
        "qc": { type: 'skill', careers: ["quality_controller_rmg", "production_manager_rmg"] },
        "quality assurance": { type: 'skill', careers: ["quality_controller_rmg", "qa_engineer"] },
        "aql": { type: 'skill', careers: ["quality_controller_rmg"] },
        "ie": { type: 'skill', careers: ["production_manager_rmg", "industrial_engineer_ipe"] },
        "industrial engineering": { type: 'skill', careers: ["industrial_engineer_ipe", "production_manager_rmg"] },
        "production engineering": { type: 'skill', careers: ["industrial_engineer_ipe"] },
        "operations research": { type: 'skill', careers: ["industrial_engineer_ipe", "data_scientist"] },
        "lean manufacturing": { type: 'skill', careers: ["production_manager_rmg", "supply_chain_manager", "industrial_engineer_ipe"] },
        "six sigma": { type: 'skill', careers: ["industrial_engineer_ipe", "quality_controller_rmg", "production_manager_rmg"] },
        "quality management": { type: 'skill', careers: ["industrial_engineer_ipe", "quality_controller_rmg"] },
        "ergonomics": { type: 'skill', careers: ["industrial_engineer_ipe"] },
        "fashion design": { type: 'skill', careers: ["fashion_designer"] },
        "sketching": { type: 'skill', careers: ["fashion_designer", "architect", "graphic_designer", "animator", "interior_designer"] },
        "pattern making": { type: 'skill', careers: ["fashion_designer"] },
        "cad": { type: 'skill', careers: ["fashion_designer", "mechanical_engineer", "electrical_engineer", "civil_engineer", "architect", "industrial_engineer_ipe", "mechatronics_engineer", "biomedical_engineer", "interior_designer", "naval_architect_marine_engineer", "aeronautical_engineer"] },
        "lectra": { type: 'skill', careers: ["fashion_designer"] },
        "gerber": { type: 'skill', careers: ["fashion_designer"] },
        "fabric sourcing": { type: 'skill', careers: ["merchandiser_rmg"] },
        "fabric knowledge": { type: 'skill', careers: ["fashion_designer", "merchandiser_rmg", "textile_engineer"] },
        "spinning": { type: 'skill', careers: ["textile_engineer"] },
        "weaving": { type: 'skill', careers: ["textile_engineer"] },
        "knitting": { type: 'skill', careers: ["textile_engineer"] },
        "dyeing": { type: 'skill', careers: ["textile_engineer", "chemical_engineer"] },
        "finishing": { type: 'skill', careers: ["textile_engineer", "leather_engineer"] },
        "textile chemistry": { type: 'skill', careers: ["textile_engineer"] },
        "manufacturing processes": { type: 'skill', careers: ["mechanical_engineer", "industrial_engineer_ipe", "materials_engineer"] },
        "leather technology": { type: 'skill', careers: ["leather_engineer"] },
        "tanning": { type: 'skill', careers: ["leather_engineer"] },
        "footwear technology": { type: 'skill', careers: ["leather_engineer"] },

        // Engineering (Non-Software) - type: 'skill'
        "autocad": { type: 'skill', careers: ["electrical_engineer", "mechanical_engineer", "civil_engineer", "architect", "interior_designer", "industrial_engineer_ipe"] },
        "solidworks": { type: 'skill', careers: ["mechanical_engineer"] },
        "catia": { type: 'skill', careers: ["mechanical_engineer", "aeronautical_engineer"] },
        "revit": { type: 'skill', careers: ["architect", "civil_engineer"] },
        "sketchup": { type: 'skill', careers: ["architect", "interior_designer"] },
        "fea": { type: 'skill', careers: ["mechanical_engineer", "civil_engineer", "aeronautical_engineer"] },
        "thermodynamics": { type: 'skill', careers: ["mechanical_engineer", "chemical_engineer"] },
        "fluid mechanics": { type: 'skill', careers: ["mechanical_engineer", "civil_engineer", "aeronautical_engineer"] },
        "hvac": { type: 'skill', careers: ["mechanical_engineer"] },
        "plc": { type: 'skill', careers: ["electrical_engineer", "mechatronics_engineer"] },
        "circuit design": { type: 'skill', careers: ["electrical_engineer"] },
        "power systems": { type: 'skill', careers: ["electrical_engineer"] },
        "control systems": { type: 'skill', careers: ["electrical_engineer", "mechatronics_engineer", "aeronautical_engineer"] },
        "matlab": { type: 'skill', careers: ["electrical_engineer", "mechanical_engineer", "aeronautical_engineer", "biomedical_engineer"] },
        "structural design": { type: 'skill', careers: ["civil_engineer", "architect"] },
        "staad pro": { type: 'skill', careers: ["civil_engineer"] },
        "etabs": { type: 'skill', careers: ["civil_engineer"] },
        "surveying": { type: 'skill', careers: ["civil_engineer", "urban_planner", "forester"] },
        "construction": { type: 'experience', careers: ["civil_engineer"] },
        "construction management": { type: 'skill', careers: ["civil_engineer"] },
        "geotechnical engineering": { type: 'skill', careers: ["civil_engineer"] },
        "geotechnical": { type: 'skill', careers: ["civil_engineer"] },
        "transportation engineering": { type: 'skill', careers: ["civil_engineer", "urban_planner"] },
        "transportation": { type: 'general', careers: ["civil_engineer", "urban_planner", "supply_chain_manager"] },
        "process design": { type: 'skill', careers: ["chemical_engineer"] },
        "mass transfer": { type: 'skill', careers: ["chemical_engineer"] },
        "heat transfer": { type: 'skill', careers: ["chemical_engineer"] },
        "chemical reactions": { type: 'skill', careers: ["chemical_engineer"] },
        "process simulation": { type: 'skill', careers: ["chemical_engineer"] },
        "aspen": { type: 'skill', careers: ["chemical_engineer"] },
        "hysys": { type: 'skill', careers: ["chemical_engineer"] },
        "materials science": { type: 'skill', careers: ["materials_engineer"] },
        "metallurgy": { type: 'skill', careers: ["materials_engineer"] },
        "polymers": { type: 'skill', careers: ["materials_engineer", "chemical_engineer"] },
        "ceramics": { type: 'skill', careers: ["materials_engineer"] },
        "composites": { type: 'skill', careers: ["materials_engineer", "mechanical_engineer"] },
        "nanomaterials": { type: 'skill', careers: ["materials_engineer"] },
        "material characterization": { type: 'skill', careers: ["materials_engineer", "researcher_science"] },
        "building codes": { type: 'skill', careers: ["architect", "civil_engineer"] },
        "sustainability": { type: 'skill', careers: ["architect", "environmental_engineer", "urban_planner"] },
        "gis": { type: 'skill', careers: ["urban_planner", "civil_engineer", "geographer_environmentalist", "disaster_management_specialist", "forester"] },
        "land use planning": { type: 'skill', careers: ["urban_planner"] },
        "transportation planning": { type: 'skill', careers: ["urban_planner", "civil_engineer"] },
        "environmental planning": { type: 'skill', careers: ["urban_planner", "environmental_engineer"] },
        "aerodynamics": { type: 'skill', careers: ["aeronautical_engineer"] },
        "propulsion": { type: 'skill', careers: ["aeronautical_engineer", "naval_architect_marine_engineer"] },
        "aircraft": { type: 'general', careers: ["aeronautical_engineer"] },
        "naval architecture": { type: 'skill', careers: ["naval_architect_marine_engineer"] },
        "marine engineering": { type: 'skill', careers: ["naval_architect_marine_engineer"] },
        "ship design": { type: 'skill', careers: ["naval_architect_marine_engineer"] },
        "hydrodynamics": { type: 'skill', careers: ["naval_architect_marine_engineer"] },
        "electronics": { type: 'skill', careers: ["electrical_engineer", "mechatronics_engineer"] },
        "microcontrollers": { type: 'skill', careers: ["mechatronics_engineer", "electrical_engineer"] },
        "medical devices": { type: 'skill', careers: ["biomedical_engineer"] },
        "biomechanics": { type: 'skill', careers: ["biomedical_engineer", "physiotherapist"] },
        "biomaterials": { type: 'skill', careers: ["biomedical_engineer", "materials_engineer"] },
        "bioinstrumentation": { type: 'skill', careers: ["biomedical_engineer"] },
        "medical imaging": { type: 'skill', careers: ["biomedical_engineer"] },
        "tissue engineering": { type: 'skill', careers: ["biomedical_engineer"] },
        "reservoir engineering": { type: 'skill', careers: ["petroleum_mining_engineer"] },
        "drilling": { type: 'skill', careers: ["petroleum_mining_engineer"] },
        "mine planning": { type: 'skill', careers: ["petroleum_mining_engineer"] },
        "resource estimation": { type: 'skill', careers: ["petroleum_mining_engineer"] },
        "food processing": { type: 'skill', careers: ["food_engineer"] },
        "food chemistry": { type: 'skill', careers: ["food_engineer", "nutritionist_dietitian"] },
        "food safety": { type: 'skill', careers: ["food_engineer", "nutritionist_dietitian"] },
        "packaging technology": { type: 'skill', careers: ["food_engineer"] },
        "haccp": { type: 'skill', careers: ["food_engineer"] },
        "water treatment": { type: 'skill', careers: ["environmental_engineer", "civil_engineer"] },
        "wastewater treatment": { type: 'skill', careers: ["environmental_engineer", "civil_engineer"] },
        "air pollution control": { type: 'skill', careers: ["environmental_engineer"] },
        "solid waste management": { type: 'skill', careers: ["environmental_engineer"] },
        "eia": { type: 'skill', careers: ["environmental_engineer"] },

        // Healthcare - type: 'skill' mostly
        "medicine": { type: 'skill', careers: ["doctor", "nurse", "pharmacist", "researcher_science"] },
        "surgery": { type: 'skill', careers: ["doctor", "veterinarian"] },
        "diagnosis": { type: 'skill', careers: ["doctor", "veterinarian", "medical_technologist"] },
        "patient care": { type: 'skill', careers: ["doctor", "nurse", "physiotherapist"] },
        "nursing": { type: 'skill', careers: ["nurse"] },
        "medication": { type: 'general', careers: ["nurse", "pharmacist"] },
        "medication administration": { type: 'skill', careers: ["nurse"] },
        "charting": { type: 'skill', careers: ["nurse"] },
        "vital signs": { type: 'skill', careers: ["nurse"] },
        "pharmacy": { type: 'skill', careers: ["pharmacist"] },
        "pharmacology": { type: 'skill', careers: ["pharmacist", "doctor", "nurse", "veterinarian"] },
        "medication dispensing": { type: 'skill', careers: ["pharmacist"] },
        "patient counseling": { type: 'soft_skill', careers: ["pharmacist", "nutritionist_dietitian", "psychologist_counselor"] },
        "drug interactions": { type: 'skill', careers: ["pharmacist"] },
        "dentistry": { type: 'skill', careers: ["dentist"] },
        "oral surgery": { type: 'skill', careers: ["dentist"] },
        "orthodontics": { type: 'skill', careers: ["dentist"] },
        "prosthodontics": { type: 'skill', careers: ["dentist"] },
        "endodontics": { type: 'skill', careers: ["dentist"] },
        "physiotherapy": { type: 'skill', careers: ["physiotherapist"] },
        "rehabilitation": { type: 'skill', careers: ["physiotherapist"] },
        "manual therapy": { type: 'skill', careers: ["physiotherapist"] },
        "exercise therapy": { type: 'skill', careers: ["physiotherapist"] },
        "anatomy": { type: 'skill', careers: ["physiotherapist", "doctor", "nurse", "biomedical_engineer"] },
        "physiology": { type: 'skill', careers: ["physiotherapist", "doctor", "nurse", "biomedical_engineer"] },
        "public health": { type: 'skill', careers: ["public_health_professional", "doctor", "nurse"] },
        "epidemiology": { type: 'skill', careers: ["public_health_professional"] },
        "biostatistics": { type: 'skill', careers: ["public_health_professional", "statistician", "data_scientist"] },
        "health policy": { type: 'skill', careers: ["public_health_professional", "economist", "public_administrator_govt_official"] },
        "health education": { type: 'skill', careers: ["public_health_professional"] },
        "community health": { type: 'skill', careers: ["public_health_professional", "social_worker"] },
        "medical technology": { type: 'skill', careers: ["medical_technologist"] },
        "laboratory techniques": { type: 'skill', careers: ["medical_technologist", "researcher_science", "biochemistry", "microbiology"] },
        "laboratory medicine": { type: 'skill', careers: ["medical_technologist"] },
        "hematology": { type: 'skill', careers: ["medical_technologist"] },
        "immunology": { type: 'skill', careers: ["medical_technologist"] },
        "nutrition": { type: 'skill', careers: ["nutritionist_dietitian"] },
        "dietetics": { type: 'skill', careers: ["nutritionist_dietitian"] },
        "food science": { type: 'skill', careers: ["nutritionist_dietitian", "food_engineer"] },
        "clinical nutrition": { type: 'skill', careers: ["nutritionist_dietitian"] },
        "meal planning": { type: 'skill', careers: ["nutritionist_dietitian"] },
        "veterinary medicine": { type: 'skill', careers: ["veterinarian"] },
        "animal health": { type: 'skill', careers: ["veterinarian", "agriculturist"] },
        "clinical skills": { type: 'skill', careers: ["doctor", "nurse", "dentist", "veterinarian"] },

        // Law - type: 'skill'
        "law": { type: 'skill', careers: ["lawyer_advocate"] },
        "legal research": { type: 'skill', careers: ["lawyer_advocate"] },
        "legal writing": { type: 'skill', careers: ["lawyer_advocate"] },
        "litigation": { type: 'skill', careers: ["lawyer_advocate"] },
        "corporate law": { type: 'skill', careers: ["lawyer_advocate"] },
        "criminal law": { type: 'skill', careers: ["lawyer_advocate"] },
        "civil law": { type: 'skill', careers: ["lawyer_advocate"] },
        "argumentation": { type: 'soft_skill', careers: ["lawyer_advocate"] },

        // Education - type: 'skill' mostly
        "teaching": { type: 'skill', careers: ["teacher_lecturer"] },
        "lecturing": { type: 'skill', careers: ["teacher_lecturer"] },
        "lesson plan": { type: 'skill', careers: ["teacher_lecturer"] },
        "lesson planning": { type: 'skill', careers: ["teacher_lecturer"] },
        "curriculum": { type: 'general', careers: ["teacher_lecturer", "education_administrator"] },
        "curriculum development": { type: 'skill', careers: ["education_administrator"] },
        "classroom management": { type: 'skill', careers: ["teacher_lecturer"] },
        "assessment": { type: 'skill', careers: ["teacher_lecturer"] },
        "educational leadership": { type: 'skill', careers: ["education_administrator"] },
        "school management": { type: 'skill', careers: ["education_administrator"] },
        "subject matter expertise": { type: 'skill', careers: ["teacher_lecturer", "researcher_science", "researcher_humanities_social"] }, // Generic

        // Arts, Humanities & Social Sciences - type varies
        "bangla": { type: 'skill', careers: ["teacher_lecturer", "content_writer", "journalist_reporter", "researcher_humanities_social"] },
        "english literature": { type: 'skill', careers: ["teacher_lecturer", "content_writer", "researcher_humanities_social"] },
        "arabic": { type: 'skill', careers: ["teacher_lecturer", "researcher_humanities_social"] },
        "islamic studies": { type: 'skill', careers: ["teacher_lecturer", "researcher_humanities_social"] },
        "islamic history": { type: 'skill', careers: ["teacher_lecturer", "researcher_humanities_social", "archaeologist_historian"] },
        "history": { type: 'skill', careers: ["teacher_lecturer", "researcher_humanities_social", "archaeologist_historian"] },
        "philosophy": { type: 'skill', careers: ["teacher_lecturer", "researcher_humanities_social"] },
        "sociology": { type: 'skill', careers: ["teacher_lecturer", "researcher_humanities_social", "social_worker", "hr_manager", "development_worker"] },
        "anthropology": { type: 'skill', careers: ["researcher_humanities_social", "social_worker", "development_worker", "ui_ux_designer"] },
        "political science": { type: 'skill', careers: ["teacher_lecturer", "researcher_humanities_social", "journalist_reporter", "public_administrator_govt_official", "development_worker"] },
        "economics": { type: 'skill', careers: ["economist", "finance_analyst", "banker", "business_analyst", "teacher_lecturer", "researcher_humanities_social"] },
        "international relations": { type: 'skill', careers: ["researcher_humanities_social", "public_administrator_govt_official", "journalist_reporter", "development_worker"] },
        "public administration": { type: 'skill', careers: ["public_administrator_govt_official", "hr_manager", "researcher_humanities_social"] },
        "journalism": { type: 'skill', careers: ["journalist_reporter", "content_writer"] },
        "mass communication": { type: 'skill', careers: ["journalist_reporter", "marketing_manager", "content_writer"] },
        "media studies": { type: 'skill', careers: ["journalist_reporter", "marketing_manager", "film_media_professional"] },
        "music": { type: 'skill', careers: ["teacher_lecturer"] },
        "drama": { type: 'skill', careers: ["teacher_lecturer"] },
        "fine arts": { type: 'skill', careers: ["graphic_designer", "animator", "teacher_lecturer", "fashion_designer", "interior_designer"] },
        "linguistics": { type: 'skill', careers: ["researcher_humanities_social", "teacher_lecturer"] },
        "geography": { type: 'skill', careers: ["geographer_environmentalist", "teacher_lecturer", "urban_planner"] },
        "psychology": { type: 'skill', careers: ["psychologist_counselor", "hr_manager", "marketing_manager", "researcher_humanities_social", "ui_ux_designer"] },
        "library science": { type: 'skill', careers: ["librarian"] },
        "archaeology": { type: 'skill', careers: ["archaeologist_historian"] },
        "folklore": { type: 'skill', careers: ["researcher_humanities_social"] },
        "social work": { type: 'skill', careers: ["social_worker"] },
        "criminology": { type: 'skill', careers: ["researcher_humanities_social"] },
        "development studies": { type: 'skill', careers: ["development_worker", "researcher_humanities_social"] },
        "population sciences": { type: 'skill', careers: ["researcher_humanities_social", "public_health_professional", "statistician"] },
        "peace studies": { type: 'skill', careers: ["researcher_humanities_social", "development_worker"] },
        "conflict studies": { type: 'skill', careers: ["researcher_humanities_social", "development_worker"] },
        "gender studies": { type: 'skill', careers: ["researcher_humanities_social", "development_worker", "social_worker", "hr_manager"] },
        "reporting": { type: 'skill', careers: ["journalist_reporter"] },
        "interviewing": { type: 'soft_skill', careers: ["journalist_reporter", "hr_manager", "user_research"] },
        "media ethics": { type: 'skill', careers: ["journalist_reporter"] },
        "digital media": { type: 'skill', careers: ["journalist_reporter", "marketing_manager"] },
        "counseling": { type: 'skill', careers: ["social_worker", "psychologist_counselor", "hr_manager"] },
        "case management": { type: 'skill', careers: ["social_worker"] },
        "community development": { type: 'skill', careers: ["social_worker", "development_worker", "urban_planner"] },
        "advocacy": { type: 'skill', careers: ["social_worker", "development_worker", "lawyer_advocate"] },
        "research methodology": { type: 'skill', careers: ["researcher_humanities_social", "researcher_science", "data_scientist", "economist", "statistician"] },
        "qualitative research": { type: 'skill', careers: ["researcher_humanities_social", "ui_ux_designer", "marketing_manager"] },
        "quantitative research": { type: 'skill', careers: ["researcher_humanities_social", "researcher_science", "data_scientist", "economist", "statistician"] },
        "academic writing": { type: 'skill', careers: ["researcher_humanities_social", "researcher_science", "teacher_lecturer", "content_writer"] },
        "critical thinking": { type: 'soft_skill', careers: ["researcher_humanities_social", "researcher_science", "lawyer_advocate", "management_consultant", "business_analyst", "software_engineer", "data_scientist"] },
        "information management": { type: 'skill', careers: ["librarian", "mis_specialist"] },
        "cataloging": { type: 'skill', careers: ["librarian"] },
        "archiving": { type: 'skill', careers: ["librarian", "archaeologist_historian"] },
        "excavation": { type: 'skill', careers: ["archaeologist_historian"] },
        "artifact analysis": { type: 'skill', careers: ["archaeologist_historian"] },
        "historical research": { type: 'skill', careers: ["archaeologist_historian", "researcher_humanities_social"] },
        "clinical psychology": { type: 'skill', careers: ["psychologist_counselor"] },
        "psychotherapy": { type: 'skill', careers: ["psychologist_counselor"] },
        "remote sensing": { type: 'skill', careers: ["geographer_environmentalist"] },
        "cartography": { type: 'skill', careers: ["geographer_environmentalist"] },
        "field work": { type: 'experience', careers: ["geographer_environmentalist", "archaeologist_historian", "social_worker", "development_worker", "agriculturist"] },
        "environmental policy": { type: 'skill', careers: ["geographer_environmentalist", "environmental_engineer", "public_administrator_govt_official"] },
        "policy analysis": { type: 'skill', careers: ["economist", "urban_planner", "public_health_professional", "researcher_humanities_social", "public_administrator_govt_official"] },
        "monitoring & evaluation": { type: 'skill', careers: ["development_worker"] },
        "m&e": { type: 'skill', careers: ["development_worker"] },
        "proposal writing": { type: 'skill', careers: ["development_worker", "researcher_science", "researcher_humanities_social"] },
        "government operations": { type: 'skill', careers: ["public_administrator_govt_official"] },

        // Agriculture & Environment - type: 'skill'
        "agriculture": { type: 'skill', careers: ["agriculturist"] },
        "agronomy": { type: 'skill', careers: ["agriculturist"] },
        "horticulture": { type: 'skill', careers: ["agriculturist"] },
        "soil science": { type: 'skill', careers: ["agriculturist", "civil_engineer", "geographer_environmentalist"] },
        "plant pathology": { type: 'skill', careers: ["agriculturist"] },
        "animal husbandry": { type: 'skill', careers: ["agriculturist", "veterinarian"] },
        "farm management": { type: 'skill', careers: ["agriculturist"] },
        "fisheries": { type: 'skill', careers: ["fisheries_professional"] },
        "fisheries science": { type: 'skill', careers: ["fisheries_professional"] },
        "aquaculture": { type: 'skill', careers: ["fisheries_professional"] },
        "fish biology": { type: 'skill', careers: ["fisheries_professional"] },
        "hatchery management": { type: 'skill', careers: ["fisheries_professional"] },
        "water quality management": { type: 'skill', careers: ["fisheries_professional", "environmental_engineer"] },
        "sustainable fisheries": { type: 'skill', careers: ["fisheries_professional"] },
        "forestry": { type: 'skill', careers: ["forester"] },
        "silviculture": { type: 'skill', careers: ["forester"] },
        "forest management": { type: 'skill', careers: ["forester"] },
        "conservation": { type: 'skill', careers: ["forester", "geographer_environmentalist"] },
        "wildlife management": { type: 'skill', careers: ["forester"] },

        // Creative & Media - type: 'skill'
        "writing": { type: 'skill', careers: ["content_writer", "journalist_reporter", "marketing_manager", "researcher_humanities_social", "researcher_science"] },
        "editing": { type: 'skill', careers: ["content_writer", "journalist_reporter", "video_editor", "film_media_professional"] },
        "proofreading": { type: 'skill', careers: ["content_writer"] },
        "copywriting": { type: 'skill', careers: ["content_writer", "marketing_manager"] },
        "blogging": { type: 'skill', careers: ["content_writer", "marketing_manager"] },
        "content creation": { type: 'skill', careers: ["content_writer", "marketing_manager", "graphic_designer", "video_editor", "film_media_professional"] },
        "video editing": { type: 'skill', careers: ["video_editor", "film_media_professional"] },
        "premiere pro": { type: 'skill', careers: ["video_editor", "film_media_professional"] },
        "final cut pro": { type: 'skill', careers: ["video_editor", "film_media_professional"] },
        "davinci resolve": { type: 'skill', careers: ["video_editor", "film_media_professional"] },
        "after effects": { type: 'skill', careers: ["video_editor", "graphic_designer", "animator", "film_media_professional"] }, // Motion graphics overlap
        "storytelling": { type: 'soft_skill', careers: ["video_editor", "film_media_professional", "content_writer", "marketing_manager", "animator"] },
        "color correction": { type: 'skill', careers: ["video_editor", "film_media_professional"] },
        "audio editing": { type: 'skill', careers: ["video_editor", "film_media_professional"] },
        "film production": { type: 'skill', careers: ["film_media_professional"] },
        "video production": { type: 'skill', careers: ["film_media_professional", "journalist_reporter"] },
        "directing": { type: 'skill', careers: ["film_media_professional"] },
        "producing": { type: 'skill', careers: ["film_media_professional"] },
        "cinematography": { type: 'skill', careers: ["film_media_professional"] },
        "scriptwriting": { type: 'skill', careers: ["film_media_professional", "content_writer"] },
        "interior design": { type: 'skill', careers: ["interior_designer"] },
        "space planning": { type: 'skill', careers: ["interior_designer", "architect"] },
        "3d rendering": { type: 'skill', careers: ["interior_designer", "architect", "animator", "game_developer"] },
        "material selection": { type: 'skill', careers: ["interior_designer", "architect"] },
        "furniture design": { type: 'skill', careers: ["interior_designer"] },
        "animation": { type: 'skill', careers: ["animator", "game_developer"] },
        "2d animation": { type: 'skill', careers: ["animator"] },
        "3d animation": { type: 'skill', careers: ["animator", "game_developer"] },
        "maya": { type: 'skill', careers: ["animator"] },
        "blender": { type: 'skill', careers: ["animator", "game_developer"] },
        "adobe animate": { type: 'skill', careers: ["animator"] },
        "modeling": { type: 'skill', careers: ["animator", "game_developer"] },
        "rigging": { type: 'skill', careers: ["animator"] },
        "storyboarding": { type: 'skill', careers: ["animator", "film_media_professional", "game_developer"] },

        // Customer Service - type: 'skill' and 'soft_skill'
        "customer service": { type: 'skill', careers: ["customer_service_rep", "it_support_specialist", "tourism_hospitality_manager", "banker"] },
        "call center": { type: 'experience', careers: ["customer_service_rep"] },
        "customer support": { type: 'skill', careers: ["customer_service_rep", "it_support_specialist"] },
        "active listening": { type: 'soft_skill', careers: ["customer_service_rep", "psychologist_counselor", "social_worker", "hr_manager", "teacher_lecturer"] },
        "crm software": { type: 'skill', careers: ["customer_service_rep", "marketing_manager", "sales"] },
        "typing speed": { type: 'skill', careers: ["customer_service_rep"] },

        // Soft Skills & General - type: 'soft_skill' or 'general'
        "communication": { type: 'soft_skill', careers: ["hr_manager", "marketing_manager", "business_analyst", "merchandiser_rmg", "teacher_lecturer", "doctor", "nurse", "customer_service_rep", "project_manager", "management_consultant", "lawyer_advocate", "journalist_reporter", "social_worker", "psychologist_counselor", "public_administrator_govt_official"] },
        "english": { type: 'skill', careers: ["teacher_lecturer", "content_writer", "journalist_reporter", "researcher_humanities_social", "merchandiser_rmg", "marketing_manager", "hr_manager", "customer_service_rep", "business_analyst", "management_consultant", "lawyer_advocate", "it_support_specialist"] }, // English proficiency
        "presentation": { type: 'soft_skill', careers: ["marketing_manager", "business_analyst", "finance_analyst", "teacher_lecturer", "management_consultant"] },
        "leadership": { type: 'soft_skill', careers: ["hr_manager", "marketing_manager", "production_manager_rmg", "project_manager", "management_consultant", "education_administrator", "public_administrator_govt_official", "entrepreneur"] },
        "management": { type: 'skill', careers: ["hr_manager", "marketing_manager", "production_manager_rmg", "supply_chain_manager", "project_manager", "education_administrator", "tourism_hospitality_manager", "banker", "management_consultant", "entrepreneur"] },
        "team management": { type: 'skill', careers: ["production_manager_rmg", "project_manager", "hr_manager"] },
        "teamwork": { type: 'soft_skill', careers: ["software_engineer", "qa_engineer", "nurse", "production_manager_rmg", "project_manager", "game_developer"] }, // Almost all roles
        "problem solving": { type: 'soft_skill', careers: ["software_engineer", "data_scientist", "qa_engineer", "it_support_specialist", "customer_service_rep", "mechanical_engineer", "electrical_engineer", "civil_engineer", "management_consultant", "business_analyst"] }, // Very broad
        "analytical skills": { type: 'soft_skill', careers: ["data_scientist", "finance_analyst", "business_analyst", "economist", "statistician", "management_consultant"] },
        "agile": { type: 'skill', careers: ["software_engineer", "qa_engineer", "business_analyst", "project_manager"] },
        "scrum": { type: 'skill', careers: ["software_engineer", "qa_engineer", "business_analyst", "project_manager"] },
        "negotiation": { type: 'soft_skill', careers: ["supply_chain_manager", "merchandiser_rmg", "marketing_manager", "hr_manager"] },
        "research": { type: 'skill', careers: ["data_scientist", "finance_analyst", "business_analyst", "marketing_manager", "ui_ux_designer", "content_writer", "economist", "statistician", "researcher_humanities_social", "researcher_science"] },
        "empathy": { type: 'soft_skill', careers: ["nurse", "doctor", "social_worker", "psychologist_counselor", "hr_manager", "customer_service_rep"] },
        "pmp": { type: 'skill', careers: ["project_manager"] }, // Certification
        "ms project": { type: 'skill', careers: ["project_manager"] },
        "attention to detail": { type: 'soft_skill', careers: ["accountant", "qa_engineer", "software_engineer", "researcher_science"]},
        "critical thinking": { type: 'soft_skill', careers: ["researcher_humanities_social", "researcher_science", "lawyer_advocate", "management_consultant", "business_analyst", "software_engineer", "data_scientist"] },


        // Education Levels/Degrees - type: 'degree'
        "bsc": { type: 'degree', careers: ["software_engineer", "electrical_engineer", "mechanical_engineer", "civil_engineer", "textile_engineer", "chemical_engineer", "materials_engineer", "aeronautical_engineer", "naval_architect_marine_engineer", "mechatronics_engineer", "biomedical_engineer", "petroleum_mining_engineer", "food_engineer", "leather_engineer", "environmental_engineer", "agriculturist", "fisheries_professional", "forester", "statistician", "geographer_environmentalist", "researcher_science"] },
        "b.sc. engg.": { type: 'degree', careers: ["software_engineer", "electrical_engineer", "mechanical_engineer", "civil_engineer", "textile_engineer", "chemical_engineer", "materials_engineer", "aeronautical_engineer", "naval_architect_marine_engineer", "mechatronics_engineer", "biomedical_engineer", "petroleum_mining_engineer", "food_engineer", "leather_engineer", "environmental_engineer", "industrial_engineer_ipe"] },
        "b.engg.": { type: 'degree', careers: ["software_engineer", "electrical_engineer", "mechanical_engineer", "civil_engineer", "textile_engineer", "chemical_engineer", "materials_engineer", "aeronautical_engineer", "naval_architect_marine_engineer", "mechatronics_engineer", "biomedical_engineer", "petroleum_mining_engineer", "food_engineer", "leather_engineer", "environmental_engineer", "industrial_engineer_ipe"] },
        "bba": { type: 'degree', careers: ["marketing_manager", "hr_manager", "finance_analyst", "business_analyst", "banker", "supply_chain_manager", "accountant", "management_consultant", "entrepreneur", "banking_insurance_professional", "tourism_hospitality_manager", "e_commerce_specialist"] },
        "b.com.": { type: 'degree', careers: ["accountant", "banker"] },
        "mba": { type: 'degree', careers: ["marketing_manager", "hr_manager", "finance_analyst", "business_analyst", "banker", "supply_chain_manager", "management_consultant", "entrepreneur"] },
        "ca": { type: 'degree', careers: ["accountant"] }, // Certification as degree-level indicator
        "acca": { type: 'degree', careers: ["accountant"] }, // Certification as degree-level indicator
        "cfa": { type: 'degree', careers: ["finance_analyst"] }, // Certification as degree-level indicator
        "b.a.": { type: 'degree', careers: ["teacher_lecturer", "content_writer", "journalist_reporter", "researcher_humanities_social", "social_worker"] }, // Broad mapping for Arts
        "b.s.s.": { type: 'degree', careers: ["teacher_lecturer", "researcher_humanities_social", "social_worker", "economist", "development_worker", "public_administrator_govt_official", "journalist_reporter"] }, // Broad mapping for Social Science
        "mbbs": { type: 'degree', careers: ["doctor"] },
        "bds": { type: 'degree', careers: ["dentist"] },
        "b.pharm.": { type: 'degree', careers: ["pharmacist"] },
        "pharmacy degree": { type: 'degree', careers: ["pharmacist"] },
        "b.sc. in nursing": { type: 'degree', careers: ["nurse"] },
        "nursing degree": { type: 'degree', careers: ["nurse"] },
        "bpt": { type: 'degree', careers: ["physiotherapist"] },
        "llb": { type: 'degree', careers: ["lawyer_advocate"] },
        "b.ed": { type: 'degree', careers: ["teacher_lecturer", "education_administrator"] },
        "b.arch": { type: 'degree', careers: ["architect"] },
        "dvm": { type: 'degree', careers: ["veterinarian"] },
        "b.sc. in agriculture": { type: 'degree', careers: ["agriculturist"] },
        "b.sc. in fisheries": { type: 'degree', careers: ["fisheries_professional"] },
        "b.sc. in forestry": { type: 'degree', careers: ["forester"] },
        "bfa": { type: 'degree', careers: ["graphic_designer", "animator", "teacher_lecturer", "fashion_designer", "interior_designer"] }, // Bachelor of Fine Arts


        // --- Keywords from the Document List (Now Integrated with Types) ---
        "criminology & police science": { type: 'degree', careers: ["researcher_humanities_social"] }, // Needs Police role defined
        "painting": { type: 'skill', careers: ["graphic_designer", "teacher_lecturer"] },
        "sculpture": { type: 'skill', careers: ["teacher_lecturer"] },
        "graphics": { type: 'skill', careers: ["graphic_designer", "animator"] },
        "drawing": { type: 'skill', careers: ["graphic_designer", "fashion_designer", "architect", "animator", "interior_designer"] },
        "crafts": { type: 'skill', careers: ["teacher_lecturer"] },
        "oriental art": { type: 'skill', careers: ["teacher_lecturer", "researcher_humanities_social"] },
        "printmaking": { type: 'skill', careers: ["graphic_designer", "teacher_lecturer"] },
        "accounting & information systems": { type: 'degree', careers: ["accountant", "mis_specialist", "business_analyst", "finance_analyst"] },
        "applied chemistry & chemical engineering": { type: 'degree', careers: ["chemical_engineer", "researcher_science"] },
        "biochemistry & molecular biology": { type: 'degree', careers: ["researcher_science", "medical_technologist", "pharmacist"] },
        "biotechnology & genetic engineering": { type: 'degree', careers: ["researcher_science", "biomedical_engineer"] },
        "robotics & mechatronics engineering": { type: 'degree', careers: ["mechatronics_engineer"] },
        "optometry": { type: 'degree', careers: [] }, // Define Optometrist role
        "b.sc. in education": { type: 'degree', careers: ["teacher_lecturer", "education_administrator"] },
        "fashion design & technology": { type: 'degree', careers: ["fashion_designer", "merchandiser_rmg", "production_manager_rmg"] },

        // --- Experience Keywords (Examples - Add More) --- type: 'experience'
        "intern": { type: 'experience', careers: [] }, // Indicates entry-level
        "junior developer": { type: 'experience', careers: ["frontend_developer", "backend_developer", "full_stack_developer", "software_engineer"] },
        "senior engineer": { type: 'experience', careers: ["software_engineer", "mechanical_engineer", "electrical_engineer", "civil_engineer"] }, // etc.
        "manager": { type: 'experience', careers: ["project_manager", "hr_manager", "marketing_manager", "production_manager_rmg", "supply_chain_manager"] }, // Broad title
        "team lead": { type: 'experience', careers: ["software_engineer", "project_manager"]}, // Example title
        "executive": { type: 'experience', careers: ["hr_manager", "marketing_manager"] }, // Common junior title
         "officer": { type: 'experience', careers: ["banker", "public_administrator_govt_official", "fisheries_professional", "forester"] }, // Common title
         "specialist": { type: 'experience', careers: ["it_support_specialist", "mis_specialist", "e_commerce_specialist", "disaster_management_specialist"]}, // Common title
         "analyst": { type: 'experience', careers: ["data_scientist", "finance_analyst", "business_analyst", "cyber_security_analyst", "economist"]}, // Common title

        // ... Add many more keywords ...
    }
};

/**
 * Calculates weighted score, finds matched/missing skills, and builds score breakdown.
 * @param {string} cvText - The text extracted from the CV.
 * @returns {Array} - Sorted array of career suggestions with enhanced details.
 */
function runInferenceEngine(cvText) {
    const text = cvText ? cvText.toLowerCase() : "";
    let careerScores = {}; // Stores { score: number, matchedKeywords: Set<string>, scoreBreakdown: { skill: 0, degree: 0, ... } }
    let cvKeywordsFound = new Set(); // Keep track of all unique keywords found in the CV text

    if (!KNOWLEDGE_BASE || !KNOWLEDGE_BASE.careers || !KNOWLEDGE_BASE.keywords) {
        console.error("KNOWLEDGE_BASE is not defined or structured correctly.");
        return [];
    }

    // Initialize scores and tracking structures
    for (const careerId in KNOWLEDGE_BASE.careers) {
        if (Object.hasOwnProperty.call(KNOWLEDGE_BASE.careers, careerId)) {
            careerScores[careerId] = {
                score: 0,
                matchedKeywords: new Set(), // Keywords from KB found in CV relevant to THIS career
                scoreBreakdown: { skill: 0, degree: 0, soft_skill: 0, experience: 0, general: 0 } // Initialize breakdown
            };
        }
    }

    if (!text) return [];

    // --- Run the scoring and keyword tracking logic ---
    for (const keyword in KNOWLEDGE_BASE.keywords) {
        if (Object.hasOwnProperty.call(KNOWLEDGE_BASE.keywords, keyword)) {
            const keywordData = KNOWLEDGE_BASE.keywords[keyword];
            const keywordType = keywordData.type || 'general'; // Default type if missing
            const weight = KEYWORD_WEIGHTS[keywordType] || 1; // Default weight if type unknown
            const associatedCareers = keywordData.careers;

            // Check if keyword is in CV text
            // Using word boundaries for slightly more accuracy (optional, adjust regex as needed)
             const regex = new RegExp(`\\b${keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i'); // Escape special chars
             if (regex.test(text)) {
            //if (text.includes(keyword.toLowerCase())) { // Simpler check
                
                cvKeywordsFound.add(keyword); // Add to the master list of found CV keywords

                if (Array.isArray(associatedCareers)) {
                    associatedCareers.forEach(careerId => {
                        if (careerScores.hasOwnProperty(careerId)) {
                            careerScores[careerId].score += weight;
                            careerScores[careerId].matchedKeywords.add(keyword);
                            // Add to score breakdown for this career
                            if (careerScores[careerId].scoreBreakdown.hasOwnProperty(keywordType)) {
                                careerScores[careerId].scoreBreakdown[keywordType] += weight;
                            } else {
                                careerScores[careerId].scoreBreakdown['general'] += weight; // Fallback category
                            }
                        }
                    });
                }
            }
        }
    }

    // --- Process results: Calculate Skill Gap and Final Structure ---
    const enhancedResults = Object.keys(careerScores)
        .filter(careerId => careerScores.hasOwnProperty(careerId))
        .map(careerId => {
            const careerData = KNOWLEDGE_BASE.careers[careerId];
            const scoreInfo = careerScores[careerId];

            if (!careerData) return null; // Skip if career definition is missing

            // --- Skill Gap Analysis ---
            const requiredSkills = new Set((careerData.key_skills || []).map(s => s.toLowerCase()));
            const matchedSkills = new Set();
            const missingSkills = new Set(requiredSkills); // Start with all required skills as missing

            scoreInfo.matchedKeywords.forEach(foundKeyword => {
                const lowerKeyword = foundKeyword.toLowerCase();
                 // Check if the keyword found in the CV is one of the defined key skills for this role
                if (requiredSkills.has(lowerKeyword)) {
                    matchedSkills.add(foundKeyword); // Add the original casing for display
                    missingSkills.delete(lowerKeyword); // Remove from missing list
                }
                // Also consider keywords found in CV (even if not in 'key_skills') as 'Your Skills'
                 // This handles cases where CV has skills not listed as 'key' for the role
                 // cvKeywordsFound already contains all keywords found in the CV text.
            });
             
             // Filter cvKeywordsFound to only include skill-types for "Your Skills" list (optional refinement)
             const yourSkillsFromCV = [...cvKeywordsFound].filter(k => {
                 const kwData = KNOWLEDGE_BASE.keywords[k];
                 return kwData && (kwData.type === 'skill' || kwData.type === 'soft_skill');
             });


            const overlapPercentage = requiredSkills.size > 0 ?
                Math.round((matchedSkills.size / requiredSkills.size) * 100) : 0;

            // --- Calculate Max Possible Score for Breakdown ---
            // This is an estimation: assumes all key_skills are distinct keywords with max weight
             let maxScoreEstimation = 0;
             requiredSkills.forEach(skill => {
                 // Find the keyword entry matching this skill to get its type, default to 'skill' type if not found directly
                 const kwData = KNOWLEDGE_BASE.keywords[skill]; // Assuming skill names match keywords exactly (case-insensitive done earlier)
                 const type = kwData ? kwData.type : 'skill'; // Default to 'skill' if not in keywords list directly
                 maxScoreEstimation += KEYWORD_WEIGHTS[type] || KEYWORD_WEIGHTS['skill']; // Use skill weight if type unknown
             });
             // Add rough estimates for degree/experience based on role type? (More complex logic needed here for accuracy)
             // For now, let's use a simpler total based on keywords hit
             const totalMaxScoreBreakdown = Object.values(scoreInfo.scoreBreakdown).reduce((sum, val) => sum + val, 0) / scoreInfo.score * 100; // Rough %
             const maxPossibleScore = Object.keys(KNOWLEDGE_BASE.keywords).length * MAX_POSSIBLE_SCORE_PER_KEYWORD; // Very rough upper bound


            return {
                id: careerId,
                score: scoreInfo.score, // The weighted score
                details: careerData,
                skillAnalysis: {
                    yourSkills: yourSkillsFromCV, // Show all 'skill' type keywords found in CV
                    matchedSkills: [...matchedSkills], // Skills from CV that match career's key_skills
                    missingSkills: [...missingSkills].map(s => {
                        // Find original casing if possible for better display
                        const originalCase = careerData.key_skills.find(ks => ks.toLowerCase() === s);
                        return originalCase || s;
                    }), // Required skills not found in CV's matched keywords
                    overlapPercentage: overlapPercentage,
                    requiredSkillCount: requiredSkills.size
                },
                scoreBreakdown: scoreInfo.scoreBreakdown, // e.g., { skill: 15, degree: 4, soft_skill: 2, experience: 0, general: 1 }
                //maxPossibleScore: maxScoreEstimation // Add this if you refine the calculation
                // You could refine the max score per category later for a % breakdown
            };
        })
        .filter(career => career && career.score > 0) // Filter out nulls and zero scores
        .sort((a, b) => b.score - a.score); // Sort descending by weighted score

    return enhancedResults.slice(0, 3); // Return top 3 matches
}

// --- Converted to CJS ---
module.exports = { runInferenceEngine };
// --- End Conversion ---