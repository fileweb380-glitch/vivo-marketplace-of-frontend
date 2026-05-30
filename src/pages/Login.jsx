import React, {
  useState,
  useContext
} from 'react';

import {
  useNavigate,
  useParams,
  Link
} from 'react-router-dom';

import API from '../sevices/api';

import { AuthContext } from '../context/AuthContext';

export default function Login() {

  const navigate = useNavigate();

  const { role } = useParams();

  const { login } = useContext(AuthContext);

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await API.post(
        '/auth/login',
        {
          email,
          password
        }
      );

      login(res.data);

      if (
        res.data.role === 'seller'
      ) {

        navigate(
          '/seller/dashboard'
        );

      } else if (
        res.data.role === 'admin'
      ) {

        navigate(
          '/admin/dashboard'
        );

      } else {

        navigate(
          '/marketplace'
        );
      }

    } catch (err) {

      alert(
        err.response?.data?.message ||
        'Login failed.'
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="auth-page">

      <form
        onSubmit={handleLogin}
        className="auth-card"
      >

        <h1 className="auth-title">

          {role} Login

        </h1>

        <p className="auth-subtitle">

          Welcome back to Vivo.

        </p>

        <div className="form-group">

          <label>Email</label>

          <input
            type="email"
            className="premium-input"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
          />

        </div>

        <div className="form-group">

          <label>Password</label>

          <input
            type="password"
            className="premium-input"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
          />

        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={loading}
        >

          {loading
            ? 'Logging in...'
            : 'Login'}

        </button>

        <p className="switch-auth">

          Don't have account?

          <Link
            to={`/onboarding/${role}`}
          >

            Register

          </Link>

        </p>

      </form>

    </div>
  );
}