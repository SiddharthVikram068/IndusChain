import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from "./App";
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import OwnerDashboard from './pages/OwnerDashboard';
import UserDashboard from './pages/UserDashboard';
import PlantInfoPage from './pages/PlantInfoPage';
import PlantEmployeesPage from './pages/PlantEmployeesPage';

const Router = () => {
  return (
    <>

    <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/login" element={<LoginForm />}/>
        <Route path="/signup" element={<SignupForm />}/>
        <Route path="/owner/dash" element={<OwnerDashboard />}/>
        <Route path="/owner/employ" element={<PlantEmployeesPage />}/>
        <Route path="/user/dash" element={<UserDashboard />}/>
        <Route path="/user/info" element={<PlantInfoPage />}/>

    </Routes>
    </>

  )
}

export default Router
