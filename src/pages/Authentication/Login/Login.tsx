import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import img1 from "../../../assets/login-64.png";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { loginUser } from "../../../redux/slices/user/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AppDispatch } from "../../../redux/store";
const Login = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [userFormData, setUserFormData] = useState({
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

    setUserFormData((prev) => ({
      ...prev, // Keep the existing state
      [field]: value,// Update only the specific field (email or password)
      errors: { ...prev.errors, [field]: error }, // Keep existing errors and update only the error for the current field
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const emailError = validateEmail(userFormData.email);
    const passwordError = validatePassword(userFormData.password);

    if (emailError || passwordError) {
      setUserFormData((prev) => ({
        ...prev,
        errors: { email: emailError, password: passwordError },
      }));
    } else {
      try {
        //  await dispatch(loginUser(userFormData));
        const response = await dispatch(loginUser(userFormData));
        console.log("Login API response:", response);


        toast.success("Successfully logged in!");
        navigate("/home");
      } catch (err) {
        console.error("Login failed:", err);
        toast.error("Incorrect Email or Password!");
      }
    }
  };

  return (
    <div className="container">
      <div className="welcome-overlay">
        <div className="login-container">
          <div className="login-logo">
            <img src={img1} alt="Login" />
          </div>
          <h2 className="auth-heading">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                value={userFormData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter your email"
                autoComplete="off"
                className="input-text"
              />
              {userFormData.errors.email && <span className="error">{userFormData.errors.email}</span>}
            </div>
            <div className="input-group">
              <label>Password</label>
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  value={userFormData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="Enter your password"
                   className="input-text"
                />
                <span className="toggle-icon" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash color="white" /> : <FaEye color="white" />}
                </span>
              </div>
              {userFormData.errors.password && <span className="error">{userFormData.errors.password}</span>}
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




// const handleSubmit = async (event: React.FormEvent) => {
//   event.preventDefault();

//   const emailError = validateEmail(userFormData.email);
//   const passwordError = validatePassword(userFormData.password);

//   if (emailError || passwordError) {
//     setUserFormData((prev) => ({
//       ...prev,
//       errors: { email: emailError, password: passwordError },
//     }));
//     setMessage(null);
//   } else {
//     try {
//       const data = await login(userFormData.email, userFormData.password);
//       console.log("User logged in:", data);
//       setMessage({ text: "Successfully logged in!", type: "success" });
//     } catch (err) {
//       console.log(err);
//       setMessage({ text: "Incorrect Email or Password!", type: "error" });
//     }
//   }
// };