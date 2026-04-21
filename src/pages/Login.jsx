import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, AlertCircle } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, user, error: authError } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect to products
  if (user) {
    return <Navigate to="/products" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) return;

    setIsSubmitting(true);
    const result = await login(username, password);
    setIsSubmitting(false);

    if (result.success) {
      navigate('/products');
    }
  };

  return (
    <div className="login-container">
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      
      <div className="login-card glass-panel">
        <div className="login-header">
          <div className="icon-wrapper">
            <LogIn size={32} className="text-primary" />
          </div>
          <h1>Welcome Back</h1>
          <p>Please enter your details to sign in.</p>
        </div>

        {authError && (
          <div className="alert alert-error">
            <AlertCircle size={20} />
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Email or Username</label>
            <input
              id="username"
              type="text"
              className="form-control"
              placeholder="e.g. emilys"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary full-width"
            disabled={isSubmitting}
          >
            {isSubmitting ? <span className="loader-small"></span> : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>Demo Credentials: <b>emilys</b> / <b>emilyspass</b></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
