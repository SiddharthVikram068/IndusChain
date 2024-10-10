import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar_user = () => {
  return (
    <div className="w-64 h-screen bg-orange-600 text-white flex flex-col">
      <h1 className="text-2xl font-bold p-4">User Dashboard</h1>
      <nav className="flex-grow">
        <ul>
          <li className="p-4 hover:bg-orange-500">
           <Link to="/user/dash"> Dashboard </Link> 
          </li>
          <li className="p-4 hover:bg-orange-500">
            <Link to="/user/info">Plant Information </Link>
          </li>
          <li className="p-4 hover:bg-orange-500">
            Logout
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar_user;
