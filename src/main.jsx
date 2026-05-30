import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import GetStarted from './pages/GetStarted';
import OnboardingFlow from './pages/OnboardingFlow';
import Marketplace from './pages/Marketplace';
import ProductDetails from './pages/ProductDetails';
import SellerDashboard from './pages/SellerDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import BuyerDashboard from './pages/BuyerDashboard';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <div className="relative min-h-screen bg-[#0B0B0F] flex flex-col justify-between overflow-x-hidden">
          <Navbar />
          <div className="flex-grow w-full">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/onboarding/:role" element={<OnboardingFlow />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/seller/dashboard" element={<SellerDashboard />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route
  path="/login/:role"
  element={<Login />}
/>
<Route
  path="/buyer/dashboard"
  element={<BuyerDashboard />}
/>
<Route
  path="/buyer/dashboard/messages"
  element={<BuyerDashboard />}
/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);