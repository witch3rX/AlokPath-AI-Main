const express = require('express');
const multer = require('multer');
// --- FIX: Correct path to services ---
const { extractText } = require('../services/parser.js'); 
const { runInferenceEngine } = require('../services/expert_system.js');
// --- END FIX ---

const router = express.Router();

// Configure multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB file size limit
});

// Define the file upload route: POST /api/career-advisor/upload 
// Changed from /api/analyze/upload to match the mount point in server.js
router.post('/upload', upload.single('cvFile'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        // 1. Extract text from the uploaded file
        const text = await extractText(req.file.buffer, req.file.mimetype);

        // 2. Run the "AI" Inference Engine on the extracted text
        const results = runInferenceEngine(text);

        // 3. Send the results back to the React front-end
        res.status(200).json(results);

    } catch (error) {
        console.error("Error in /upload route:", error); // Added more specific logging
        res.status(500).json({ message: error.message || 'Server error during analysis' });
    }
});

module.exports = router;

