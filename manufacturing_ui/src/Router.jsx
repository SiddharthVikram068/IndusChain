import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from "./App";
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import OwnerDashboard from './pages/OwnerDashboard';

const Router = () => {
  return (
    <>

    <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/login" element={<LoginForm />}/>
        <Route path="/signup" element={<SignupForm />}/>
        <Route path="/owner/dash" element={<OwnerDashboard />}/>
    </Routes>
    </>
    
  )
}

export default Router
