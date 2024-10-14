import React, { useEffect, useState } from 'react';
import Sidebar_user from '../components/SIdebar_user';

const UserDashboard = () => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [recentActivities, setRecentActivities] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Retrieve role and email from localStorage
        const storedRole = localStorage.getItem('role');
        const storedEmail = localStorage.getItem('email');

        if (storedRole) setRole(storedRole);
        if (storedEmail) setEmail(storedEmail);

        // Mock data for recent activities and notifications
        setRecentActivities([
            'Logged in from new device',
            'Updated profile information',
            'Completed a task'
        ]);

        setNotifications([
            'Your password will expire in 5 days',
            'New message from admin',
            'System maintenance scheduled for tomorrow'
        ]);
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
            <Sidebar_user />
            <div className="flex-grow relative">
                <div className="p-8">
                    <button
                        onClick={toggleTheme}
                        className="absolute top-4 right-4 p-2 bg-orange-600 text-white rounded"
                        style={{ backgroundColor: isDarkMode ? 'black' : 'white', color: isDarkMode ? 'orange' : 'black' }}
                    >
                        Toggle {isDarkMode ? "Light" : "Dark"} Mode
                    </button>
                    <h2 className="text-3xl font-bold text-orange-600 mb-6">Welcome, {email}</h2>
                    <div className={`shadow-md p-6 rounded-lg border-2 mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-orange-600'}`}>
                        <h3 className="text-xl text-orange-600">Profile Information</h3>
                        <p className="mt-4">Email: {email}</p>
                        <p>Role: {role}</p>
                    </div>
                    <div className={`shadow-md p-6 rounded-lg border-2 mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-orange-600'}`}>
                        <h3 className="text-xl text-orange-600">Recent Activities</h3>
                        <ul className="mt-4 list-disc list-inside">
                            {recentActivities.map((activity, index) => (
                                <li key={index}>{activity}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={`shadow-md p-6 rounded-lg border-2 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-orange-600'}`}>
                        <h3 className="text-xl text-orange-600">Notifications</h3>
                        <ul className="mt-4 list-disc list-inside">
                            {notifications.map((notification, index) => (
                                <li key={index}>{notification}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
