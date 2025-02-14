import React, { useState } from 'react';
import './ResetPassword.css';
import img2 from "../../../assets/reset-password-icon-20.png"
const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errors, setErrors] = useState({
    newPassword: '',
    confirmNewPassword: '',
  });

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
      console.log('Password Reset Successful');
      // Add your password reset API call here
    }
  };

  return (
    <div className="reset-container">
    <img src={img2} alt="" />
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            placeholder="Enter your new password"
            className={errors.newPassword ? 'input-error' : newPassword ? 'input-valid' : ''}
          />
          {errors.newPassword && <span className="error">{errors.newPassword}</span>}
        </div>
        <div className="input-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={handleConfirmNewPasswordChange}
            placeholder="Confirm your new password"
            className={errors.confirmNewPassword ? 'input-error' : confirmNewPassword ? 'input-valid' : ''}
          />
          {errors.confirmNewPassword && <span className="error">{errors.confirmNewPassword}</span>}
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
