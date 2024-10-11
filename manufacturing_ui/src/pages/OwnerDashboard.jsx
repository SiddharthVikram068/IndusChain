import React, { useEffect, useState } from 'react';
import Graph from '../components/Graph';
import Tasks from '../components/Tasks';
import Statistics from '../components/Statistics';
import Sidebar from '../components/Sidebar';

const OwnerDashboard = () => {

    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
      // Retrieve role and email from localStorage
      const storedRole = localStorage.getItem('role');
      const storedEmail = localStorage.getItem('email');

      if (storedRole) setRole(storedRole);
      if (storedEmail) setEmail(storedEmail);
    }, []);

    return (
        <div className="flex min-h-screen bg-white">
          <Sidebar />
          <div className="flex-grow p-8">

            <div className="mt-6 bg-white border border-orange-600 shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-orange-600 mb-4">User Information</h2>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Role:</strong> {role}</p>
            </div>

            <div className="mt-6 bg-white border border-orange-600 shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold text-orange-600 mb-4">Energy Consumption</h3>
              <Graph />
            </div>

            <div className="mt-6 bg-white border border-orange-600 shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-orange-600 mb-4">Statistics</h2>
              <Statistics />
            </div>

            <div className="mt-6 bg-white border border-orange-600 shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-orange-600 mb-4">Tasks</h2>
              <Tasks />
            </div>

          </div>
        </div>
      );
}

export default OwnerDashboard
