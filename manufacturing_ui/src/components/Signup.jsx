import React from "react";
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import axios from 'axios';
import { useState } from "react";
import {BASE_URL} from '../base_url.js'


export const Signup = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('OWNER'); // Default role
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

// Handle signup function
const handleSignup = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
        setError("Passwords don't match");
        return;
    }

    try {
        // First request to register the user and get the token
        console.log('BASE_URL:', `${BASE_URL}/api/register`);
        const signupResponse = await axios.post(`${BASE_URL}/api/register`, {
        // const signupResponse = await axios.post('https://backend-server-induschain.onrender.com/api/register', {
            email: email,
            password: password,
            role: role
        });

        setSuccess('User registered successfully! Redirecting to dashboard...');
        setError('');

        // Store the JWT token in local storage
        localStorage.setItem('token', signupResponse.data.token);
        console.log('Token:', signupResponse.data.token);


        // After getting the role and email from the backend response
        localStorage.setItem('role', role);  // Store role in localStorage
        localStorage.setItem('email', email);  // Store email in localStorage




        // Fetch protected route to decode user role from the backend
        try {
            const protectedResponse = await axios.get('https://backend-server-induschain.onrender.com/api/protected', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            // Extract the role from the response, assuming the format is 'Hello, ROLE'
            const extractedRole = protectedResponse.data.split(', ')[1];
            console.log('Extracted role:', extractedRole);

            // Redirect based on the extracted role
            setTimeout(() => {
                if (extractedRole === "OWNER") {
                    window.location.href = '/owner/dash';
                } else {
                    window.location.href = '/user/dash';
                }
            }, 5000); // Adjust the delay as needed

        } catch (error) {
            setError('Error fetching protected data: ' + error.toString());
        }

    } catch (error) {
        setError('Signup failed: ' + error.toString());
    }
};

  return (
    <div>
      <div className="text-center py-4">
        <h1 className="text-7xl font-semibold py-7">Welcome</h1>
        <p className="font-light text-lg">
          We are glad to see you  with us
        </p>
      </div>
      <form onSubmit={handleSignup}>
        <div className="flex items-center space-x-1 bg-gray-200 rounded-lg p-2">
          <CiUser className="text-xl" />
          <input
            className="bg-transparent w-full outline-none"
            type="text"
            placeholder="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-4 flex items-center space-x-1 bg-gray-200 rounded-lg p-2">
          <CiUser className="text-xl" />
          <input
            className="bg-transparent w-full outline-none"
            type="text"
            placeholder="role"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div className="my-4 flex items-center space-x-1 bg-gray-200 rounded-lg p-2">
          <CiUser className="text-xl" />
          <input
            className="bg-transparent w-full outline-none"
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="my-4 flex items-center space-x-1 bg-gray-200 rounded-lg p-2">
          <RiLockPasswordLine className="text-xl" />
          <input
            className="bg-transparent w-full outline-none"
            type="password"
            placeholder="confirm_password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit" className="bg-black text-white rounded-lg w-full p-2 mb-4">Sign up</button>
      </form>
    </div>
  );
};
