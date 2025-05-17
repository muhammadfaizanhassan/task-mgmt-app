const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');

dotenv.config();

const app = express();

// Configure CORS to allow your frontend URL
const allowedOrigins = ['https://task-manage-app-qm93.onrender.com', 'http://localhost:3000'];
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like Postman) or from allowedOrigins
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy: This origin is not allowed'));
    }
  }
}));

// Middleware to parse JSON bodies
app.use(express.json());

// API routes
app.use('/api/tasks', taskRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server only after DB connection is successful
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => {
  console.error('Failed to connect to MongoDB:', err.message);
  process.exit(1); // Exit the process with failure
});
