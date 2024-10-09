import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-orange-600 text-white w-64 p-6 fixed left-0 top-0 h-full">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <ul>
        <li className="mb-4 text-lg hover:text-orange-200 transition duration-300">
          Home
        </li>
        <li className="mb-4 text-lg hover:text-orange-200 transition duration-300">
          Tasks
        </li>
        <li className="mb-4 text-lg hover:text-orange-200 transition duration-300">
          Statistics
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
