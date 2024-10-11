import React, { useEffect, useState } from 'react';
import Sidebar_user from '../components/SIdebar_user';

const UserDashboard = () => {

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
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar_user />
        <div className="flex-grow">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-orange-600 mb-6">Welcome, {email}</h2>
            <div className="bg-white shadow-md p-6 rounded-lg border-2 border-orange-600">
              <h3 className="text-xl text-orange-600">Profile Information</h3>
              <p className="mt-4">Email: {email}</p>
              <p>Role: {role}</p>
            </div>
          </div>
        </div>
      </div>
    );
}

export default UserDashboard
