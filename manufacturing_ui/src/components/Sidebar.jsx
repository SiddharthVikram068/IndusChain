import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {

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
        <div className="w-64 min-h-screen bg-orange-600 text-white flex flex-col relative z-10">
            <h1 className="text-2xl font-bold p-4">Owner Dashboard</h1>
              <ul className="space-y-4 mt-4">
                <li className="p-4 hover:bg-orange-500">
                  <Link to="/owner/dash">Dashboard</Link>
                </li>
                <li className="p-4 hover:bg-orange-500">
                  <Link to="/owner/employ">Plant Employees</Link>
                </li>
                <li className="p-4 hover:bg-orange-500">
                  <Link to="/cnc">CNC Milling Machine</Link>
                </li>
                <li className="p-4 hover:bg-orange-500">
                  <Link to="/injection">Injection Molding Machine</Link>
                </li>
                <li className="p-4 hover:bg-orange-500">
                  <Link to="/lathe">Lathe Machine</Link>
                </li>
                <li className="p-4 hover:bg-orange-500">
                  <Link to="/threedprint">3D Printer </Link>
                </li>
                <li className="p-4 hover:bg-orange-500">
                  <Link to="/conveyor">Conveyor Belt System </Link>
                </li>
                <li className="p-4 hover:bg-orange-500">
                  <Link to="/csvrender">CSV Analysis </Link>
                </li>
                <li className="p-4 hover:bg-orange-500">
                  <button onClick={handleLogout} className="w-full text-left">
                      Logout
                  </button>
                </li>
                <li className="p-4 hover:bg-orange-500">
                    Report (coming soon)
                </li>
              </ul>
        </div>
    );
};

export default Sidebar;
