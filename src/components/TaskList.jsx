// frontend/src/components/TaskList.js
import React from 'react';

const TaskList = ({ tasks, handleToggleTask, handleDeleteTask }) => {
  return (
    <ul className="list-group">
      {tasks.map((task) => (
        <li
          key={task._id}
          className={`list-group-item ${task.completed ? 'list-group-item-success' : ''}`}
        >
          {task.title}
          <div className="float-end">
            <button
              className="btn btn-sm btn-success me-2"
              onClick={() => handleToggleTask(task._id, task.completed)}
            >
              {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDeleteTask(task._id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
