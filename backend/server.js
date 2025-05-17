const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
