const express = require('express');
const router = express.Router();
const quizQuestions = require('../data/quizQuestions');

// GET: Fetch questions for a specific career
router.get('/questions', (req, res) => {
  const { career } = req.query;
  
  // Validate career exists
  if (!quizQuestions[career]) {
    return res.status(404).json({ message: "Career path not found" });
  }

  const fullQuestions = quizQuestions[career];
  
  // Remove the 'answer' field so users can't see it in the Network tab
  const safeQuestions = fullQuestions.map(({ answer, ...rest }) => rest);
  
  res.json(safeQuestions);
});

// POST: Submit answers and calculate score
router.post('/submit', (req, res) => {
  const { studentName, career, answers } = req.body;
  
  const correctQuestions = quizQuestions[career];
  if (!correctQuestions) {
    return res.status(400).json({ message: "Invalid career" });
  }

  let score = 0;
  let total = correctQuestions.length;

  // Calculate Score
  correctQuestions.forEach(q => {
    // Check if user answer matches correct answer
    if (answers[q.id] === q.answer) {
      score++;
    }
  });

  // Pass Logic (e.g., must get 6 out of 10)
  const isPass = score >= 6; 

  // In a real app, save to MongoDB here using a Model
  
  res.json({
    studentName,
    career,
    score,
    total,
    isPass,
    percentage: (score / total) * 100
  });
});

module.exports = router;