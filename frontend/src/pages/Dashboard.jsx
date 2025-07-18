/**
 * @typedef {Object} User
 * @property {string} name
 * @property {string} email
 * @property {string} avatar
 * @property {string} role
 * @property {string} _id
 */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Dashboard.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Dashboard = () => {
  /** @type {User | null} */
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/user/me`, { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => {
        navigate('/login');
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = async () => {
    try {
      // Call backend logout endpoint to clear cookie and delete user
      await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
      console.log('Logged out successfully');
    } catch (err) {
      console.log('Logout error:', err);
    } finally {
      // Navigate to login page regardless of backend response
      navigate('/login');
    }
  };

  if (loading) return <div className="dashboard-container"><Navbar /><div className="dashboard-content">Loading...</div></div>;
  if (error) return <div className="dashboard-container"><Navbar /><div className="dashboard-content"><div className="text-red-500">{error}</div></div></div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-banner">
        Google OAuth Authentication Project &mdash; Secure Login Demo
      </div>
      <Navbar onLogout={handleLogout} />
      <div className="dashboard-content">
        <div className="dashboard-card">
          <img
            src={user.avatar}
            alt="avatar"
            className="dashboard-avatar"
            onError={e => { e.target.onerror = null; e.target.src="https://ui-avatars.com/api/?name=User"; }}
          />
          <div className="dashboard-welcome">Welcome, {user?.name}!</div>
          <div className="dashboard-email">Email: {user?.email}</div>
          <div className="dashboard-role">Role: {user?.role || 'user'}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 