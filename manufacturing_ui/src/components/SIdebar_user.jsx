import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar_user = () => {

  // Function to handle logout
  const handleLogout = () => {
    // Remove role, email, and token from localStorage
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('token');

    // Redirect to login page after logout
    window.location.href = '/';
  };

return (
    <div className="w-64 min-h-screen bg-orange-600 text-white flex flex-col">
        <h1 className="text-2xl font-bold p-4">User Dashboard</h1>
            <ul>
                <li className="p-4 hover:bg-orange-500">
                    <Link to="/user/dash">Dashboard</Link>
                </li>
                <li className="p-4 hover:bg-orange-500">
                    <Link to="/user/info">Plant Information</Link>
                </li>
                <li className="p-4 hover:bg-orange-500">
                  <Link to="/csvrender">CSV Analysis </Link>
                </li>
                <li className="p-4 hover:bg-orange-500">
                    {/* Change the logout link to a button */}
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </li>
                <li className="p-4 hover:bg-orange-500">
                    Add device (coming soon)
                </li>
                <li className="p-4 hover:bg-orange-500">
                    Add Machinery (coming soon)
                </li>
            </ul>
    </div>
);
};

export default Sidebar_user;
