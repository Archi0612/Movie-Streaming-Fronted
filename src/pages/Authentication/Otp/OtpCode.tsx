import React, { useState,useRef } from 'react';
import './OtpCode.css';
// import img2 from "../../../assets/resetlogo.png"
// import { FaEye,FaEyeSlash } from 'react-icons/fa';
import { MdOutlinePhonelinkLock } from 'react-icons/md';

const ResetPassword: React.FC = () => {
    const [otp, setOtp] = useState<string[]>(['', '', '', '']);
    const inputRefs = useRef<HTMLInputElement[]>([]);
  
    const handleChange = (value: string, index: number) => {
      if (/[^0-9]/.test(value)) return; // Allow only numeric input
  
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
  
      // Move focus to the next input field
      if (value && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    };
  
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === 'Backspace' && !otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    };
  
    const handleSubmit = () => {
      const enteredOtp = otp.join('');
      console.log(enteredOtp)
      console.log(enteredOtp.length)
      console.log(typeof(enteredOtp.length))
      if (enteredOtp.length === 4 && enteredOtp.includes('')) {
        console.log('Entered OTP:', enteredOtp);
        // Add your verification logic here
      } else {
        console.log('Please enter all 4 digits.');
      }
    };

  return (
    <div className="container">
      {/* <Header minimal /> */}
      <div className="welcome-overly">
        
    <div className="otp-container">
      <div className='img-container'>
        <MdOutlinePhonelinkLock className='otp-logo' color='white'/>
    {/* <img src={img2} alt="" className='otp-logo' /> */}
    </div>
      <h2>Verification</h2>
      <div className="otp-input-group">   
      {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => {
                  inputRefs.current[index] = el!;
                }}
                className="otp-input"
              />
            ))}
            </div>
    <button type="submit" className='otp-btn' onClick={handleSubmit}>VERIFY</button>
    </div>
    </div>
    </div>
  );
};

export default ResetPassword;
