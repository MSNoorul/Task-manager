const Task = require('../models/Task');
const User = require('../models/User');


// Example controller functions

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a task
exports.createTask = async (req, res) => {
  const { title, description, assigneeId } = req.body;
//findone by title chcke it exist or not
  const existingTask = await Task.findOne({ where: { title } });
  if (existingTask) {
    return res.status(409).json({ message: 'Task already exists' });
  }

  try {
    // Create the task
    const task = await Task.create({
      title,
      description,
      assigneeId,
    });

    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { title, description, assigneeId } = req.body;

  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update task attributes
    task.title = title || task.title;
    task.description = description || task.description;
    task.assigneeId = assigneeId || task.assigneeId;

    await task.save();

    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



