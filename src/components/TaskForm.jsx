// frontend/src/components/TaskForm.js
import React from 'react';

const TaskForm = ({ newTask, setNewTask, handleAddTask }) => {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Add a new task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button className="btn btn-primary mt-2 " type="button" onClick={handleAddTask}>
        Add
      </button>
    </div>
  );
};

export default TaskForm;
