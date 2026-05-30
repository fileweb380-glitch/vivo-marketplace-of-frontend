import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock } from 'lucide-react';

import { AuthContext } from '../context/AuthContext';
import API from '../sevices/api';


export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const executeAdminVerificationPipeline = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      const res = await API.post('/auth/login', {
        email,
        password
      });

      if (res.data.role !== 'admin') {
        alert('Access denied. Admin only.');
        setLoading(false);
        return;
      }

      login(res.data);

      navigate('/admin/dashboard');

    } catch (err) {
      alert(
        err.response?.data?.message ||
        'Login failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">

      {/* Background */}
      <div className="admin-bg"></div>

      {/* Card */}
      <form
        onSubmit={executeAdminVerificationPipeline}
        className="admin-login-card"
      >

        {/* Header */}
        <div className="admin-header">

          <div className="admin-icon">
            <ShieldCheck size={30} />
          </div>

          <h1>Admin Login</h1>

          <p>
            Secure access to Vivo administration dashboard.
          </p>

        </div>

        {/* Inputs */}
        <div className="admin-input-group">

          <label>Email</label>

          <input
            type="email"
            placeholder="admin@vivo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

        </div>

        <div className="admin-input-group">

          <label>Password</label>

          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="admin-login-btn"
        >
          <Lock size={16} />

          {loading
            ? 'Verifying...'
            : 'Login as Admin'}
        </button>

      </form>
    </div>
  );
}