const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    maxlength: 100,
    trim: true,
  },
  description: {
    type: String,
    maxlength: 500,
  },
  deadline: Date,
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do',
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
