import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import img from "../../../assets/avatar.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
  }>({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const validateEmail = (email: string): string => {
    if (!email) return "Email is required";
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email) ? "" : "Please enter a valid email";
  };

  const validateName = (name: string): string => {
    if (!name) return "Name is required";
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name) ? "" : "Please enter alphabets only";
  };

  const validatePassword = (password: string): string => {
    if (!password) return "Password is required";
    return password.length >= 6 ? "" : "Password must be at least 6 characters";
  };

  const validateConfirmPassword = (
    confirmPassword: string,
    password: string
  ): string => {
    return confirmPassword === password ? "" : "Passwords must match";
  };

  const validatePhoneNumber = (phoneNumber: string): string => {
    if (!phoneNumber) return "Phone number is required";
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber) ? "" : "Phone number must be 10 digits";
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const handleChange = (field: string, value: string) => {
    let error = "";
    switch (field) {
      case "email":
        setEmail(value);
        error = validateEmail(value);
        break;
      case "name":
        setName(value);
        error = validateName(value);
        break;
      case "password":
        setPassword(value);
        error = validatePassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        error = validateConfirmPassword(value, password);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        error = validatePhoneNumber(value);
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };

  const handleOtpChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to next input if value is entered
      if (value && index < otpRefs.current.length - 1) {
        otpRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleOtpKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const emailError = validateEmail(email);
    const nameError = validateName(name);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(
      confirmPassword,
      password
    );
    const phoneNumberError = validatePhoneNumber(phoneNumber);

    if (
      emailError ||
      nameError ||
      passwordError ||
      confirmPasswordError ||
      phoneNumberError
    ) {
      setErrors({
        email: emailError,
        name: nameError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
        phoneNumber: phoneNumberError,
      });
    } else {
      // Simulate sending OTP
      console.log("OTP sent to:", email);
      setOtpSent(true);
    }
  };

  const handleOtpVerify = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length === 4) {
      console.log("OTP Verified:", enteredOtp);
      // Proceed with further actions (e.g., form submission)
    } else {
      console.log("Invalid OTP");
    }
  };

  return (
    <div className="container">
      {/* <Header minimal /> */}
      <div className="welcome-overly">
        <div className="signup-container">
          <div className="signup-logo">
            <img src={img} alt="" />
          </div>
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter your name"
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter your email"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="input-group">
              <label>Contact Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                placeholder="Enter your phone number"
              />
              {errors.phoneNumber && (
                <span className="error">{errors.phoneNumber}</span>
              )}
            </div>
            <div className="input-group">
              <label>Password</label>
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                 
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="Enter your password"
                />
                <span
                  className="toggle-icon"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEyeSlash color="white" />
                  ) : (
                    <FaEye color="white" />
                  )}
                </span>
              </div>
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>
            <div className="input-group">
              <label>Confirm Password</label>
              <div className="password-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                  placeholder="Confirm your password"
                />
                <span
                  className="toggle-icon"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash color="white" />
                  ) : (
                    <FaEye color="white" />
                  )}
                </span>
              </div>
              {errors.confirmPassword && (
                <span className="error">{errors.confirmPassword}</span>
              )}
            </div>
            <button type="submit" className="signup-btn">Sign Up</button>
          </form>
          {otpSent && (
            <div className="otp-container">
              <h3>Enter OTP</h3>
              <div className="otp-input-group">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    value={digit}
                    maxLength={1}
                    ref={(el) => {
                      otpRefs.current[index] = el;
                    }}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="otp-input"
                  />
                ))}
              </div>
              <button onClick={handleOtpVerify} className="verify-btn">Verify OTP</button>
            </div>
          )}

          
          <p id="already">
            Already have an account? <Link to="/login">Login</Link>
          </p>

        </div>
 
    </div>
    </div>

  );
};

export default Signup;
