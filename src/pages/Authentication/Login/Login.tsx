import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import img1 from "../../../assets/login-64.png"
import { FaEyeSlash, FaEye } from 'react-icons/fa';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const validateEmail = (email: string) => {
    if (!email) return 'Email is required';
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email) ? '' : 'Please enter a valid email';
  };

  const validatePassword = (password: string) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return '';

  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleChange = (field: string, value: string) => {
    let error = '';
    switch (field) {
      case 'email':
        setEmail(value);
        error = validateEmail(value);
        break;
      case 'password':
        setPassword(value);
        error = validatePassword(value);
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
    } else {
      console.log('Login Successful', { email, password });
      // Proceed with login logic (e.g., API call)
    }
  };



  return (
    <div className='container'>
      <div className="welcome-overlay">

        <div className="login-container">
          <div className='login-logo'>
            <img src={img1} alt="" width={"80px"} height={"80px"} />
          </div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="Enter your email"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className='input-group'>
              <label>Password</label>
              <div className="password-container">

                <input type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder='Enter your password'
                />
                <span className='toggle-icon' onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash color='white' /> : <FaEye color='white' />}
                </span>
              </div>
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <button type="submit">Login</button>
            <p className="forgot-link">
              <Link to="/forgot-password">Forgot password?</Link>
            </p>
            <div className="signup-text">
              <span>Don't have an account yet?</span>
              <span className="signup-link">
                <Link to="/signup">Create an account</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
