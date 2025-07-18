import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post(`${API_URL}/auth/demo`, {}, { withCredentials: true });
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-4"
          disabled={loading}
        >
          Continue with Google
        </button>
        <button
          onClick={handleDemoLogin}
          className="w-full bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Demo User'}
        </button>
        {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
      </div>
    </div>
  );
};

export default Login; 