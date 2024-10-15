import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from "./App";
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import OwnerDashboard from './pages/OwnerDashboard';
import UserDashboard from './pages/UserDashboard';
import PlantInfoPage from './pages/PlantInfoPage';
import PlantEmployeesPage from './pages/PlantEmployeesPage';


import CNCAnalysisPage from './pages/CNCAnalysisPage';
import THREEDPRINTAnalysisPage from './pages/THREEDPRINTAnalysisPage';
import LATHEAnalysisPage from './pages/LATHEAnalysisPage';
import INJECTIONAnalysisPage from './pages/INJECTIONAnalysisPage';
import CONVEYORAnalysisPage from './pages/CONVEYORAnalysisPage';

import CsvRender from './pages/CsvRender'

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

        <Route path="/cnc" element={<CNCAnalysisPage />}/>
        <Route path="/threedprint" element={<THREEDPRINTAnalysisPage />}/>
        <Route path="/lathe" element={<LATHEAnalysisPage />}/>
        <Route path="/injection" element={<INJECTIONAnalysisPage />}/>
        <Route path="/conveyor" element={<CONVEYORAnalysisPage />}/>

        <Route path="/csvrender" element={<CsvRender />}/>


    </Routes>
    </>

  )
}

export default Router
