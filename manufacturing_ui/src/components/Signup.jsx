import React from "react";
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import axios from 'axios';
import { useState } from "react";

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
          const response = await axios.post('https://backend-server-induschain.onrender.com/api/register', {
              email: email,
              password: password,
              role: role
          });
          setSuccess('User registered successfully! Redirecting to login...');
          setError('');
          console.log('Token:', response.data.token); // Store this token if needed

          // Redirect to login page after successful signup
          setTimeout(() => {
              if(role == "OWNER"){
                window.location.href = '/owner/dash';

              }
              else{
                window.location.href = '/user/dash';
              }
              
          }, 2000); // Adjust the delay as needed
      } catch (error) {
          setError(error.toString());
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