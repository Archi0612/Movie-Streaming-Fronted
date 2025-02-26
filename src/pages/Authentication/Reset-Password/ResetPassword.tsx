import React, { useState } from 'react';

import './ResetPassword.css';
import img2 from "../../../assets/resetlogo.png"
import { FaEye,FaEyeSlash } from 'react-icons/fa';
import { resetPassword } from '../../../services/apis/authService';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';


const ResetPassword: React.FC = () => {
  const navigate=useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  console.log("token:", token);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errors, setErrors] = useState({
    newPassword: '',
    confirmNewPassword: '',
  });
  const[showPassword,setShowPassword]=useState<boolean>(false);
  const[showConfirmPassword,setShowConfirmPassword]=useState<boolean>(false);

  const validateNewPassword = (password: string) => {
    if (!password) {
      return 'New Password is required';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return '';
  };

  const validateConfirmNewPassword = (password: string, confirmPassword: string) => {
    if (!confirmPassword) {
      return 'Confirm New Password is required';
    }
    if (password !== confirmPassword) {
      return 'Passwords must match';
    }
    return '';
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewPassword(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      newPassword: validateNewPassword(value),
    }));
  };

  const handleConfirmNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setConfirmNewPassword(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      confirmNewPassword: validateConfirmNewPassword(newPassword, value),
    }));
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };
  const hidePasswordOnBlur = () => {
    setShowPassword(false);
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newPasswordError = validateNewPassword(newPassword);
    const confirmNewPasswordError = validateConfirmNewPassword(newPassword, confirmNewPassword);

    if (newPasswordError || confirmNewPasswordError) {
      setErrors({
        newPassword: newPasswordError,
        confirmNewPassword: confirmNewPasswordError,
      });
    } else {
      // Add your password reset API call here
      try{
        const result = resetPassword(newPassword, token as string);
        console.log("New pass from reset password:",result);
        toast.success("Password reset successfully");
        return navigate('/login');
        // return result;
      }catch(err){
        if (err instanceof Error) {
          console.log('Error resetting password:', err.message);
          toast.error("error in resetting password");
        } else {
          console.log('Error resetting password:', err);
        }
      }
    }
  };

  return (
    <div className="container">
      {/* <Header minimal /> */}
      <div className="welcome-overly">
        
    <div className="reset-container">
      <div className='img-container'>
    <img src={img2} alt="" className='reset-logo' />
    </div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
         <div className="input-group">
          <label>Password</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onBlur={hidePasswordOnBlur}
              onChange={handleNewPasswordChange}
              placeholder="Enter your password"
            />
            <span className="toggle-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash color='white'/> : <FaEye color='white'/>}
            </span>
          </div>
          {errors.newPassword && <span className="error">{errors.newPassword}</span>}
        </div>
        <div className='input-group'>
          <label>Confirm Password</label>
          <div className="password-container">
            <input type={showConfirmPassword ? "text" : "password"}
            value={confirmNewPassword}
            onChange={handleConfirmNewPasswordChange}
            placeholder='Confirm your password'
             />
             <span className='toggle-icon' onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? <FaEyeSlash color='white'/>: <FaEye color='white'/> }
             </span>
          </div>
          {errors.confirmNewPassword && <span className="error">{errors.confirmNewPassword}</span>}
        </div>
        <button type="submit" className='reset-btn'>Reset Password</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default ResetPassword;
