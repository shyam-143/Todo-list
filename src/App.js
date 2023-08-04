import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = async () => {
    if (!newTask) return;

    try {
      const response = await axios.post('http://localhost:5000/api/tasks', {
        title: newTask,
        completed: false,
      });
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleToggleTask = async (taskId, completed) => {
    try {
      const updatedTask = {
        ...tasks.find((task) => task._id === taskId),
        completed: !completed,
      };

      await axios.put(`http://localhost:5000/api/tasks/${taskId}`, updatedTask);

      setTasks((prevTasks) => prevTasks.map((task) => (task._id === taskId ? updatedTask : task)));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Fetch tasks from the backend API when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="container my-4">
      <div className="card">
        <Header />
        <div className="card-body">
          <TaskForm
            newTask={newTask}
            setNewTask={setNewTask}
            handleAddTask={handleAddTask}
          />
          <TaskList
            tasks={tasks}
            handleToggleTask={handleToggleTask}
            handleDeleteTask={handleDeleteTask}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
