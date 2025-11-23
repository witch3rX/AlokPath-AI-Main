const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
  // We can add fields here later to store results
  // e.g., savedCareers: [], savedQuizResults: []
}, {
  timestamps: true // Adds 'createdAt' and 'updatedAt' fields
});

module.exports = mongoose.model('User', userSchema);

