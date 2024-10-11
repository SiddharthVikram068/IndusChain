import React, { useState } from 'react'
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import axios from 'axios';

export const Login = () => {

    // State variables for email, password, error, and success messages
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // First request to login and get the token
            const loginResponse = await axios.post('https://backend-server-induschain.onrender.com/api/login', {
                email,
                password
            });

            setSuccess('Login successful!');
            setError('');

            // Store the JWT token in local storage
            localStorage.setItem('token', loginResponse.data.token);

            // Fetch protected route to decode user role from the backend
            try {
                const protectedResponse = await axios.get('https://backend-server-induschain.onrender.com/api/protected', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                // Extract the role from the response, assuming the format is 'Hello, ROLE'
                const role = protectedResponse.data.split(', ')[1];
                console.log('Extracted role:', role);

                // Redirect based on the role
                setTimeout(() => {
                    if (role === "OWNER") {
                        window.location.href = '/owner/dash';
                    } else {
                        window.location.href = '/user/dash';
                    }
                }, 5000); // Delay can be adjusted as necessary

            } catch (error) {
                setError('Error fetching protected data: ' + error.toString());
            }

        } catch (error) {
            setError('Login failed: ' + error.toString());
        }
    };


    return (
        <div>
          <div className="text-center py-4">
            <h1 className="text-7xl font-semibold py-7">Login</h1>
            <p className="font-light text-lg">
              Please login to access our services
            </p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="flex items-center space-x-1 bg-gray-200 rounded-lg p-2">
              <CiUser className="text-xl" />
              <input
                className="bg-transparent w-full outline-none"
                type="text"
                placeholder="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-4 flex items-center space-x-1 bg-gray-200 rounded-lg p-2">
              <RiLockPasswordLine className="text-xl" />
              <input
                className="bg-transparent w-full outline-none"
                type="password"
                placeholder="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <button type='submit' className="bg-black text-white rounded-lg w-full p-2 mb-4">Login</button>
          </form>
        </div>
      );
}
