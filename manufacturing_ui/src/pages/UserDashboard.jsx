import React from 'react'
import Sidebar_user from '../components/SIdebar_user';

const UserDashboard = () => {

    const username = "John Doe"; // This will be dynamic later
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar_user />
        <div className="flex-grow">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-orange-600 mb-6">Welcome, {username}</h2>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl text-orange-600">Profile Information</h3>
            <p className="mt-4">Name: {username}</p>
            <p>Email: johndoe@example.com</p>
            <p>Position: Plant Manager</p>
          </div>
        </div>
        </div>
      </div>
    );
}

export default UserDashboard