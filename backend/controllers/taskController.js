const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, deadline, status } = req.body;

    if (!title || title.length > 100) {
      return res.status(400).json({ message: 'Title is required and must be under 100 characters' });
    }

    if (description && description.length > 500) {
      return res.status(400).json({ message: 'Description must be under 500 characters' });
    }

    // Check for duplicate title in the same status
    const duplicate = await Task.findOne({ title, status });
    if (duplicate) {
      return res.status(400).json({ message: 'A task with the same title already exists in this status' });
    }

    const task = await Task.create({ title, description, deadline, status });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// Get all tasks (with optional filtering & search)
exports.getTasks = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
      ];
    }

    const tasks = await Task.find(query).sort({ updatedAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// Update a task
exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, deadline, status } = req.body;

    if (title && title.length > 100) {
      return res.status(400).json({ message: 'Title must be under 100 characters' });
    }

    if (description && description.length > 500) {
      return res.status(400).json({ message: 'Description must be under 500 characters' });
    }

    // Optional: check for duplicate title in same status
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (title && status) {
      const duplicate = await Task.findOne({ title, status, _id: { $ne: id } });
      if (duplicate) {
        return res.status(400).json({ message: 'Duplicate title exists in this status group' });
      }
    }

    const updated = await Task.findByIdAndUpdate(id, { title, description, deadline, status }, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

// Delete a task
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    await task.deleteOne();
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};
