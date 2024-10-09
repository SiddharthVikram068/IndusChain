import React from 'react';

const Tasks = () => {
  const tasks = [
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: true },
    { id: 3, title: 'Task 3', completed: false },
  ];

  return (
    <ul>
      {tasks.map(task => (
        <li
          key={task.id}
          className={`p-4 mb-2 border rounded-lg shadow-sm ${task.completed ? 'bg-orange-100 line-through' : 'bg-orange-50'}`}
        >
          {task.title}
        </li>
      ))}
    </ul>
  );
};

export default Tasks;
