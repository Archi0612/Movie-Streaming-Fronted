import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import img from "../../../assets/avatar.png";
import { FaEye, FaEyeSlash, FaEdit } from "react-icons/fa";
import { generateOTP } from "../../../services/apis/authService";
import {
  Errors,
  UserFormData,
  OtpState,
} from "../../../interfaces/movie.interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { registerUser } from "../../../redux/slices/user/userSlice";

const Signup: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [userFormData, setUserFormData] = useState<UserFormData>({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    contactNo: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const [errors, setErrors] = useState<Errors>({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const [otpState, setOtpState] = useState<OtpState>({
    otpSent: false,
    otp: ["", "", "", "", "", ""],
    resendDisabled: false,
    resendTimer: 30,
    isEditable: true,
  });

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const validateEmail = (email: string) =>
    !email
      ? "Email is required"
      : /\S+@\S+\.\S+/.test(email)
        ? ""
        : "Please enter a valid email";
  const validateName = (name: string) =>
    !name
      ? "Name is required"
      : /^[A-Za-z\s]+$/.test(name)
        ? ""
        : "Please enter alphabets only";
  const validatePassword = (password: string) =>
    !password
      ? "Password is required"
      : password.length >= 6
        ? ""
        : "Password must be at least 6 characters";
  const validateConfirmPassword = (confirmPassword: string, password: string) =>
    confirmPassword === password ? "" : "Passwords must match";
  const validatePhoneNumber = (phoneNumber: string) =>
    !phoneNumber
      ? "Phone number is required"
      : /^\d{10}$/.test(phoneNumber)
        ? ""
        : "Phone number must be 10 digits";

  const togglePasswordVisibility = () =>
    setUserFormData((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  const toggleConfirmPasswordVisibility = () =>
    setUserFormData((prevState) => ({
      ...prevState,
      showConfirmPassword: !prevState.showConfirmPassword,
    }));
  const hidePasswordOnBlur = () =>
    setUserFormData((prevState) => ({ ...prevState, showPassword: false }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error =
      name === "email"
        ? validateEmail(value)
        : name === "name"
          ? validateName(value)
          : name === "password"
            ? validatePassword(value)
            : name === "confirmPassword"
              ? validateConfirmPassword(value, userFormData.password)
              : name === "phoneNumber"
                ? validatePhoneNumber(value)
                : "";
    setUserFormData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleOtpChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otpState.otp];
      newOtp[index] = value;
      setOtpState((prevState) => ({ ...prevState, otp: newOtp }));
      if (value && index < otpRefs.current.length - 1)
        otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !otpState.otp[index] && index > 0)
      otpRefs.current[index - 1]?.focus();
  };

  const handleOTPSend = async (event: React.FormEvent) => {
    event.preventDefault();
    const emailError = validateEmail(userFormData.email);
    const nameError = validateName(userFormData.name);
    const passwordError = validatePassword(userFormData.password);
    const confirmPasswordError = validateConfirmPassword(
      userFormData.confirmPassword,
      userFormData.password
    );
    const phoneNumberError = validatePhoneNumber(userFormData.contactNo);

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
      try {
        const data = await generateOTP(userFormData);
        toast.success(data.data.message);
        if (data.status == 200) {
          setOtpState((prevState) => ({
            ...prevState,
            otpSent: true,
            isEditable: false,
          }));
        }
        return data;
      } catch (err) {
        toast.error((err as Error).message);
      }
    }
  };

  const handleEdit = () => {
    setOtpState((prevState) => ({
      ...prevState,
      isEditable: true,
      otpSent: false,
    }));
    setOtpState((prevState) => ({
      ...prevState,
      otp: ["", "", "", "", "", ""],
      resendDisabled: false,
      resendTimer: 0,
    }));
  };

  const handleOtpVerify = async () => {
    const enteredOtp = otpState.otp.join("");

    if (enteredOtp.length === 6) {
      try {
        // Dispatch OTP verification with user data
        const resultAction = await dispatch(
          registerUser({ ...userFormData, otp: parseInt(enteredOtp) })
        );
        // Check if the action was fulfilled successfully
        if (registerUser.fulfilled.match(resultAction)) {
          toast.success(
            resultAction.payload.message || "OTP Verified Successfully! 🎉"
          );
          navigate("/login");
        } else {
          // If OTP verification fails, display an error toast
          toast.error(
            resultAction.payload || "OTP verification failed. Please try again."
          );
        }
      } catch (error) {

        toast.error("Something went wrong. Please try again.");
      }
    } else {
      toast.error("Invalid OTP. Please enter a valid 6-digit code.");
    }
  };

  const handleResendOtp = () => {

    setOtpState((prevState) => ({
      ...prevState,
      otp: ["", "", "", "", "", ""],
      resendDisabled: true,
      resendTimer: 30,
    }));

    const interval = setInterval(() => {
      setOtpState((prevState) => {
        if (prevState.resendTimer === 1) {
          clearInterval(interval);
          return { ...prevState, resendDisabled: false };
        }
        return { ...prevState, resendTimer: prevState.resendTimer - 1 };
      });
    }, 1000);

    try {
      //it will return the user data to the backend
      // const userData = {formData};
      const data = generateOTP(userFormData);
      // console.log("OTP send to the user mail:", data);
      return data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        // If it's an Axios error, check for response data
        throw new Error(err.response?.data?.message || "Something went wrong");
      } else {
        // Generic error handling
        throw new Error("An unknown error occurred");
      }
    }
  };

  return (
    <div className="container">
      <div className="welcome-overly">
        <div className="signup-container">
          <div className="signup-logo">
            <img src={img} alt="" />
          </div>
          <h2 className="auth-heading">Sign Up</h2>
          {otpState.otpSent && (
            <button type="button" className="edit-icon" onClick={handleEdit}>
              <FaEdit onClick={handleEdit} size={20} />
            </button>
          )}
          <form onSubmit={handleOTPSend}>
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={userFormData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                disabled={!otpState.isEditable}
                autoComplete="off"
                className="input-text"
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={userFormData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                disabled={!otpState.isEditable}
                autoComplete="off"
                className="input-text"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="input-group">
              <label>Contact Number</label>
              <input
                type="text"
                name="contactNo"
                value={userFormData.contactNo}
                onChange={handleChange}
                placeholder="Enter your phone number"
                disabled={!otpState.isEditable}
                autoComplete="off"
                className="input-text"
              />
              {errors.phoneNumber && (
                <span className="error">{errors.phoneNumber}</span>
              )}
            </div>
            <div className="input-group">
              <label>Password</label>
              <div className="password-container">
                <input
                  type={userFormData.showPassword ? "text" : "password"}
                  name="password"
                  value={userFormData.password}
                  onBlur={hidePasswordOnBlur}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  disabled={!otpState.isEditable}
                  className="input-text"
                />
                <span
                  className="toggle-icon"
                  onClick={togglePasswordVisibility}
                >
                  {userFormData.showPassword ? (
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
                  type={userFormData.showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={userFormData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  disabled={!otpState.isEditable}
                  className="input-text"
                />
                <span
                  className="toggle-icon"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {userFormData.showConfirmPassword ? (
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
            {!otpState.otpSent && (
              <button type="submit" className="signup-btn">
                Send OTP
              </button>
            )}
          </form>
          {otpState.otpSent && (
            <div className="otp-container">
              <h3>Enter OTP</h3>
              <div className="otp-input-group">
                {otpState.otp.map((digit, index) => (
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
              <button onClick={handleOtpVerify} className="verify-btn">
                Sign Up
              </button>
              <button
                onClick={handleResendOtp}
                className="resend-btn"
                disabled={otpState.resendDisabled}
              >
                {otpState.resendDisabled
                  ? `Resend OTP in ${otpState.resendTimer}s`
                  : "Resend OTP"}
              </button>
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
