import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import "./Login.css";
import img1 from "../../../assets/login-64.png";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { login } from "../../../services/apis/authService";
import {toast} from "react-toastify";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const validateEmail = (email: string) => {
    if (!email) return "Email is required";
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email) ? "" : "Please enter a valid email";
  };

  const validatePassword = (password: string) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (field: string, value: string) => {
    let error = "";
    if (field === "email") error = validateEmail(value);
    if (field === "password") error = validatePassword(value);

    setFormData((prev) => ({
      ...prev, // Keep the existing state
      [field]: value,// Update only the specific field (email or password)
      errors: { ...prev.errors, [field]: error }, // Keep existing errors and update only the error for the current field
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setFormData((prev) => ({
        ...prev,
        errors: { email: emailError, password: passwordError },
      }));
    } else {
      try {
        const data = await login(formData.email, formData.password);
        console.log("User logged in:", data);
        toast.success("Successfully logged in!");
        return navigate("/home");
        
      } catch (err) {
        console.log(err);
        toast.error("Incorrect Email or Password!");
      }
    }
  };

  return (
    <div className="container">
      <div className="welcome-overlay">
        <div className="login-container">
          <div className="login-logo">
            <img src={img1} alt="Login"/>
          </div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter your email"
              />
              {formData.errors.email && <span className="error">{formData.errors.email}</span>}
            </div>
            <div className="input-group">
              <label>Password</label>
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="Enter your password"
                />
                <span className="toggle-icon" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash color="white" /> : <FaEye color="white" />}
                </span>
              </div>
              {formData.errors.password && <span className="error">{formData.errors.password}</span>}
            </div>
            <button type="submit" className="login-btn">Login</button>
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
