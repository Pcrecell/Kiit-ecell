// src/esummit/EsummitApp.jsx
import './EsummitApp.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { userAPI } from '../services/api';
import PrivateRoute from './auth/PrivateRoute';
import Login from './auth/Login';
import Register from './auth/Register';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';
import Id from './Id';
import AdminScanner from './AdminScanner';
import Tos from "./tos/Tos";
import PP from "./tos/PP";

// Main Landing Page Components
import Hero from './Hero-section/Hero';
import CustomScrollBar from './CustomScrollBar';
import EsummitNavbar from './Navbar/EsummitNavbar';
import Countdown from './countdown/Countdown';
import StatisticsSection from './StatisticsSection';
import NotFound from "../components/404page/NotFound";
// import Index from './Index';
import PaymentChoice from './PaymentChoice';
import EsummitDashBoard from './Dashboard/EsummitDashBoard';
import ThemeApp from './ThemePage/ThemeApp';
// import PastSpeakers from './pastspeakers/pastSpeakers';
import PastSponserWithCarousel from './pastsponsers/pastsponserwithcarouse';
import { Event } from './Event';
import Footer from './footer/Footer';

import EsummitEventsApp from './EsummitEvents/EsummitEventsApp';
import PastSpeakers from './PastSpeakersPage/PastSpeakers';

import ContactUs from './ContactUs/ContactUs';


// Landing Page Component
function LandingPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2F8D46]"></div>
      </div>
    );
  }

  return (
    <>
      <EsummitNavbar />
      <CustomScrollBar /> 
      <div className="flex flex-col items-center justify-center min-h-screen w-full bg-black text-white">
        <Hero />
        <Countdown targetDate="2025-08-16T00:00:00" />
        <StatisticsSection />
        <Event />
        <PastSpeakers />
        <PastSponserWithCarousel />
        <Footer />
      </div>
    </>
  );
}

// Final Exported App with Routing
export default function EsummitApp() {
  return (
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="register" element={<Register />} />
        <Route path="paymentchoice" element={
           <PrivateRoute>
        <PaymentChoice />
        </PrivateRoute>} />
        <Route path="id-card" element={<Id />}/>
        <Route path="admin-dashboard" element={ <PrivateRoute>
              <AdminScanner />
            </PrivateRoute>
          } />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={ <PrivateRoute>
              <ForgotPassword />
            </PrivateRoute>
          } />
        <Route path="reset-password" element={ <PrivateRoute>
              <ResetPassword />
            </PrivateRoute>
          } />
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <EsummitDashBoard />
              </PrivateRoute>}
        />
        <Route path="theme" element={<ThemeApp />} />
        <Route path="/tos" element={<Tos />} />
        <Route path="/pp" element={<PP />} />
        <Route path="events" element={<EsummitEventsApp />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}
