import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-orange-600 text-white flex flex-col">
      <h1 className="text-2xl font-bold p-4">Owner Dashboard</h1>
      <nav className="flex-grow">
        <ul>
          <li className="p-4 hover:bg-orange-500">
           <Link to="/owner/dash">Dashboard</Link> 
          </li>
          <li className="p-4 hover:bg-orange-500">
            <Link to="/owner/employ">Plant employees</Link> 
          </li>
          <li className="p-4 hover:bg-orange-500">
            <Link to="/">Logout </Link> 
          </li>
          <li className="p-4 hover:bg-orange-500">
            Report(under development)
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
