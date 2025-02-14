import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Signup.css"
import img from "../../../assets/avatar.png"
const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [errors, setErrors] = useState<{
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
  }>({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });

  const validateEmail = (email: string): string => {
    if (!email) return 'Email is required';
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email) ? '' : 'Please enter a valid email';
  };

  const validateName = (name: string): string => {
    if(!name) return 'Name is required';
    const nameRegex=/^[A-Za-z\s]+$/;
    return nameRegex.test(name) ? '':'Please enter alphabets character'
;    // return name ? '' : 'Name is required';
  };

  const validatePassword = (password: string): string => {
    if (!password) return 'Password is required';
    return password.length >= 6 ? '' : 'Password must be at least 6 characters';
  };

  const validateConfirmPassword = (confirmPassword: string, password: string): string => {
    return confirmPassword === password ? '' : 'Passwords must match';
  };

  const validatePhoneNumber = (phoneNumber: string): string => {
    if (!phoneNumber) return 'Phone number is required';
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber) ? '' : 'Phone number must be 10 digits';
  };

  const handleChange = (field: string, value: string) => {
    let error = '';
    switch (field) {
      case 'email':
        setEmail(value);
        error = validateEmail(value);
        break;
      case 'name':
        setName(value);
        error = validateName(value);
        break;
      case 'password':
        setPassword(value);
        error = validatePassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        error = validateConfirmPassword(value, password);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        error = validatePhoneNumber(value);
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const emailError = validateEmail(email);
    const nameError = validateName(name);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword, password);
    const phoneNumberError = validatePhoneNumber(phoneNumber);

    if (emailError || nameError || passwordError || confirmPasswordError || phoneNumberError) {
      setErrors({
        email: emailError,
        name: nameError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
        phoneNumber: phoneNumberError,
      });
    } else {
      console.log('Form Submitted', { email, name, password, phoneNumber });
      // Proceed with form submission logic (e.g., API call)
    }
  };

  return (
    <div className="signup-container">
      <div className='signup-logo'>
      <img src={img} alt=""/>
      </div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Enter your name"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
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
        <div className="input-group">
          <label>Contact Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            placeholder="Enter your phone number"
          />
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => handleChange('password', e.target.value)}
            placeholder="Enter your password"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </div>
        
        <button type="submit">Sign Up</button>
      </form>
      <p id='already'>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
