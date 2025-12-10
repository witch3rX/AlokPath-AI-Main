const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow requests from your React app
app.use(express.json()); // Allow passing JSON

// --- MOUNT ALL TEAM ROUTES ---
// Mount the placeholder user routes
const userRoutes = require('./routes/userRoutes.js');
console.log("Loading userRoutes... Type:", typeof userRoutes); // Simplified log
app.use('/api/users', userRoutes); 
console.log("Mounted /api/users");


// 2. Learning Path Routes 
const learningPathRoutes = require('./routes/learningPath.js'); // <--- NEW IMPORT
app.use('/api/learning-path', learningPathRoutes);              // <--- NEW MOUNT
console.log("Mounted /api/learning-path");                      // <--- LOG IT

// 3. Quiz / Assessment Routes  <--- EDITED: START OF NEW CODE
try {
    const quizRoutes = require('./routes/quizRoutes.js');
    app.use('/api/quiz', quizRoutes);
    console.log("Mounted /api/quiz");
} catch (error) {
    console.error("Error mounting quizRoutes:", error.message);
}
// <--- EDITED: END OF NEW CODE


// --- DEBUGGING CAREER ADVISOR ROUTE ---
try {
    console.log("Attempting to load careerAdvisorRoutes.js...");
    const careerAdvisorRoutes = require('./routes/careerAdvisorRoutes.js');
    
    // THIS IS THE MOST IMPORTANT LOG:
    console.log("Loaded careerAdvisorRoutes. Type:", typeof careerAdvisorRoutes); 
    
    // Check if it's a function (router) or an object
    if (typeof careerAdvisorRoutes === 'function') {
        app.use('/api/career-advisor', careerAdvisorRoutes); 
        console.log("Successfully mounted /api/career-advisor");
    } else {
        console.error("ERROR: careerAdvisorRoutes IS NOT A FUNCTION. Check the export in careerAdvisorRoutes.js. Type received:", typeof careerAdvisorRoutes);
        // We won't mount it if it's not the right type, preventing the crash
    }
} catch (error) {
    console.error("CRITICAL ERROR loading or mounting careerAdvisorRoutes.js:", error);
}
// --- END DEBUGGING ---

// ... add other routes here ...

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

