// server/models/LearningPath.js
const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  grade: { type: String },
  suggestedTopics: [String],    // topics AI suggested
  learnedTopics: [String],      // topics student selected as learned
  score: { type: Number }       // computed 0..100
});

const LearningPathSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  semester: { type: String },
  courses: [CourseSchema],
  generatedAt: { type: Date, default: Date.now },
  summary: { type: String },     // short human friendly summary
  weeklyPlan: [
    {
      week: Number,
      topics: [String],
      activities: [String]
    }
  ]
});

module.exports = mongoose.model('LearningPath', LearningPathSchema);
