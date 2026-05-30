import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import {
  HelpCircle,
  Target,
  Shield,
  Rocket,
  Store,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

import { AuthContext } from '../context/AuthContext';
import API from '../sevices/api';

export default function OnboardingFlow() {

  const { role } = useParams();

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);

  const [storeLogo, setStoreLogo] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    referral: '',
    target: '',
    storeName: '',
    storeCategory: '',
    country: ''
  });

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  /* =========================
     REGISTER USER
  ========================= */

  const handleAuthSubmit = async () => {

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      alert('Please complete all fields.');
      return;
    }

    setLoading(true);

    try {

      const res = await API.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: role,
        onboardingData: {
          referral: formData.referral,
          target: formData.target
        }
      });

      login(res.data);

      if (role === 'buyer') {
        navigate('/marketplace');
      } else {
        handleNext();
      }

    } catch (err) {

      alert(
        err.response?.data?.message ||
        'Authentication error.'
      );

    } finally {
      setLoading(false);
    }
  };

  /* =========================
     CREATE STORE
  ========================= */

  const handleStoreSubmit = async (e) => {

    e.preventDefault();

    if (
      !formData.storeName ||
      !formData.storeCategory ||
      !formData.country
    ) {
      alert('Please fill all store fields.');
      return;
    }

    setLoading(true);

    const data = new FormData();

    data.append('name', formData.storeName);
    data.append('category', formData.storeCategory);
    data.append('country', formData.country);

    if (storeLogo) {
      data.append('logo', storeLogo);
    }

    try {

      await API.post('/stores', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const stored = JSON.parse(
        localStorage.getItem('vivo_user')
      );

      stored.role = 'seller';

      login(stored);

      navigate('/seller/dashboard');

    } catch (err) {

      alert('Store creation failed.');

    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="onboarding-page">

      <div className="onboarding-orb"></div>

      <div className="onboarding-card">

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width: `${(
                step /
                (role === 'buyer' ? 3 : 6)
              ) * 100}%`
            }}
          ></div>

        </div>

        <AnimatePresence mode="wait">

          {/* STEP 1 */}

          {step === 1 && (

            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >

              <h3 className="main-title">
                Initialize Access
              </h3>

              <p className="main-text">
                Create your secure Vivo account.
              </p>

              {/* NAME */}

              <div className="form-group">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="John Doe"
                  className="premium-input"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value
                    })
                  }
                />

              </div>

              {/* EMAIL */}

              <div className="form-group">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="name@example.com"
                  className="premium-input"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value
                    })
                  }
                />

              </div>

              {/* PASSWORD */}

              <div className="form-group">

                <label>
                  Password
                </label>

                <input
                  type="password"
                  placeholder="••••••••"
                  className="premium-input"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value
                    })
                  }
                />

              </div>

              <button
                onClick={handleNext}
                className="onboarding-btn"
              >
                Continue
                <ArrowRight size={16} />
              </button>

            </motion.div>
          )}

          {/* STEP 2 */}

          {step === 2 && (

            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >

              <h3 className="step-title">

                <HelpCircle
                  size={24}
                  className="purple-icon"
                />

                Discovery Source

              </h3>

              <p className="main-text">
                Where did you hear about Vivo?
              </p>

              <div className="option-grid">

                {[
                  'YouTube',
                  'TikTok',
                  'Instagram',
                  'Google',
                  'Friend',
                  'Other'
                ].map((opt) => (

                  <button
                    key={opt}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        referral: opt
                      })
                    }
                    className={
                      formData.referral === opt
                        ? 'option-btn active'
                        : 'option-btn'
                    }
                  >
                    {opt}
                  </button>

                ))}

              </div>

              <div className="flex-row">

                <button
                  onClick={handleBack}
                  className="back-btn"
                >
                  <ArrowLeft size={16} />
                </button>

                <button
                  onClick={handleNext}
                  className="onboarding-btn"
                >
                  Continue
                </button>

              </div>

            </motion.div>
          )}

          {/* STEP 3 */}

          {step === 3 && (

            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >

              <h3 className="step-title">

                <Target
                  size={24}
                  className="blue-icon"
                />

                Your Goal

              </h3>

              <p className="main-text">
                {role === 'buyer'
                  ? 'What products are you interested in?'
                  : 'What is your long-term business goal?'}
              </p>

              <div className="option-grid">

                {(role === 'buyer'
                  ? [
                      'Fashion',
                      'Electronics',
                      'Coffee',
                      'Digital Products',
                      'Services'
                    ]
                  : [
                      'Start side income',
                      'Build a real business',
                      'Build a brand',
                      'Sell handmade products',
                      'Financial independence'
                    ]
                ).map((opt) => (

                  <button
                    key={opt}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        target: opt
                      })
                    }
                    className={
                      formData.target === opt
                        ? 'option-btn active'
                        : 'option-btn'
                    }
                  >
                    {opt}
                  </button>

                ))}

              </div>

              <div className="flex-row">

                <button
                  onClick={handleBack}
                  className="back-btn"
                >
                  <ArrowLeft size={16} />
                </button>

                <button
                  onClick={handleAuthSubmit}
                  className="onboarding-btn"
                >
                  {loading
                    ? 'Creating Account...'
                    : 'Finalize'}
                </button>

              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </div>

    </div>
  );
}