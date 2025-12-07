const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const LearningPath = require('../models/LearningPath');

// --- 1. LOAD KNOWLEDGE BASE ---
const kbPath = path.join(__dirname, '../data/courseTopics.json');
let courseKB = {};
try {
  if (fs.existsSync(kbPath)) {
    courseKB = JSON.parse(fs.readFileSync(kbPath, 'utf8'));
    console.log("DEBUG: Database loaded with courses:", Object.keys(courseKB));
  }
} catch (err) { console.error(err); }

// Helper: Format Output
const format = (list) => list.map(i => (typeof i === 'string' ? { topic: i, link: "" } : i));

// --- 2. MATCHING LOGIC (Reusable) ---
function findMatchInKB(courseInput) {
  if (!courseInput) return null;
  const cleanInput = courseInput.toLowerCase().trim();

  // A. Exact Match
  const exactKey = Object.keys(courseKB).find(k => k.toLowerCase() === cleanInput);
  if (exactKey) return courseKB[exactKey];

  // B. Fuzzy Match
  let bestKey = null;
  Object.keys(courseKB).forEach(key => {
    const kLow = key.toLowerCase();
    if (kLow.includes(cleanInput) || cleanInput.includes(kLow)) {
        bestKey = key;
    }
  });

  if (bestKey) return courseKB[bestKey];
  return null; // No match found
}

function getTopicsFromKB(courseInput) {
  const match = findMatchInKB(courseInput);
  if (match) return format(match);
  // Fallback
  return [{ topic: courseInput, link: "" }];
}

// --- 3. ROUTES ---

// NEW ROUTE: Validate Courses (Checks if they exist without generating full data)
router.post('/validate-courses', (req, res) => {
  const { courses } = req.body; 
  let allValid = true;

  // Check every course the user entered
  courses.forEach(c => {
    const match = findMatchInKB(c.name);
    if (!match) {
        allValid = false;
    }
  });

  res.json({ valid: allValid });
});

// ROUTE 1: Suggest
router.post('/suggest-topics', (req, res) => {
  const { courseName } = req.body;
  const topics = getTopicsFromKB(courseName);
  res.json({ topics });
});

// ROUTE 2: Analyze
router.post('/analyze', async (req, res) => {
  try {
    const { courses, semester, userId } = req.body; 
    let dbCourses = [];     
    let allMissingTopics = []; 

    courses.forEach(c => {
      const masterTopics = getTopicsFromKB(c.name);
      const learnedSet = new Set((c.learnedTopics || []).map(t => t.toLowerCase()));
      const missing = masterTopics.filter(t => !learnedSet.has(t.topic.toLowerCase()));
      
      const total = masterTopics.length;
      const learnedCount = total - missing.length;
      const scoreVal = total === 0 ? 0 : Math.round((learnedCount / total) * 100);

      missing.forEach(t => {
        let finalLink = t.link || `https://www.google.com/search?q=${encodeURIComponent(t.topic + " " + c.name + " tutorial")}`;
        allMissingTopics.push({ topic: t.topic, link: finalLink, course: c.name, score: scoreVal });
      });

      dbCourses.push({
        name: c.name,
        grade: c.grade,
        suggestedTopics: masterTopics.map(m => m.topic), 
        learnedTopics: c.learnedTopics,
        score: scoreVal
      });
    });

    allMissingTopics.sort((a, b) => a.score - b.score);

    const weeklyPlan = [];
    const TOPICS_PER_WEEK = 3;
    let weekCount = 1;
    
    while (allMissingTopics.length > 0) {
      const weekItems = allMissingTopics.splice(0, TOPICS_PER_WEEK);
      weeklyPlan.push({
        week: weekCount,
        topics: weekItems.map(i => `${i.topic}|${i.link}`),
        activities: ["Watch tutorial", "Practice problems", "Write summary"]
      });
      weekCount++;
    }

    if (weeklyPlan.length === 0) {
        weeklyPlan.push({ week: 1, topics: ["Capstone Project|"], activities: ["Build a complete project"] });
    }

    // Smart Summary Logic
    const avgScore = Math.round(dbCourses.reduce((acc, c) => acc + c.score, 0) / dbCourses.length) || 0;
    const strongSubjects = dbCourses.filter(c => c.score >= 80).map(c => c.name);
    const weakSubjects = dbCourses.filter(c => c.score < 60).map(c => c.name);
    
    let summaryText = "";
    if (avgScore >= 90) summaryText = `🚀 Elite Performance! Focus on advanced mastery.`;
    else if (avgScore >= 75) summaryText = `🌟 Strong Foundation. Plan bridges gaps in ${weakSubjects[0] || 'advanced topics'}.`;
    else if (avgScore >= 50) summaryText = `📈 Making Progress. Focus on ${weakSubjects.slice(0, 2).join(' & ')}.`;
    else summaryText = `🚧 Foundation First. Rebuild basics in ${weakSubjects.slice(0, 2).join(' & ')}.`;

    const newPath = new LearningPath({
      userId: userId || null,
      semester,
      courses: dbCourses, 
      summary: summaryText, 
      weeklyPlan
    });

    await newPath.save();
    res.json(newPath);

  } catch (err) {
    console.error("Analyze Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;