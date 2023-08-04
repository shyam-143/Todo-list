// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDBno
mongoose.connect('mongodb://127.0.0.1/todo', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Create the task schema and model
const taskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});

const Task = mongoose.model('Task', taskSchema);

// Create RESTful APIs for tasks
app.post('/api/tasks', async (req, res) => {
    console.log("hiiii");
  const newTask = req.body;
  try {
    const task = await Task.create(newTask);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add the task' });
  }
});

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
    const completed = req.body.completed;
    console.log('Received PUT request for task ID:', taskId);
    console.log('Request body:', req.body);
  
    try {
      await Task.findByIdAndUpdate(taskId, { completed });
      console.log('Task updated successfully');
      res.json({ message: 'Task updated successfully' });
    } catch (err) {
      console.error('Error updating task:', err);
      res.status(500).json({ error: 'Failed to update the task' });
    }
  });
  

app.delete('/api/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
      console.log('Received delete request for task ID:', taskId);
    try {
      await Task.findByIdAndDelete(taskId);
      res.json({ message: 'Task deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete the task' });
    }
  });
  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
