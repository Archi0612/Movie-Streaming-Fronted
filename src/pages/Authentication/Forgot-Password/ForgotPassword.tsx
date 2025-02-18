import React,{useState} from 'react'
import { Link } from 'react-router-dom';
// import img from "../../../assets/Backbutton.svg"
import "./ForgotPassword.css"
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const validateEmail = (email:string) => {
      if (!email) {
        return 'Email is required';
      } 
      else if (!/\S+@\S+\.\S+/.test(email)) {
        return 'Please enter a valid email';
      }
      return '';
    };
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setEmail(value);
      setError(validateEmail(value));
    };
    const handleSubmit = (event:React.FormEvent) => {
      event.preventDefault();
      const emailError = validateEmail(email);
      if (emailError) {
        setError(emailError);
      } else {
        console.log('Email Submitted:', email);
        // Perform actions such as sending a password reset link
      }
    };
    return (
      <div className="container">
      <div className="welcome-overly">
      <div className="forgot-container">
        <button className="back-btn">
          <Link to={"/login"}>    
          {/* <img src={img} alt="" style={{width:"20px", height:"20px"}} /> */}
    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 1L3 8L10 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </Link>
</button>
<div className='logo-container'>
<svg aria-label="Trouble logging in?" className="lock-logo" fill="currentColor" height="96" role="img" viewBox="0 0 96 96" width="96"><title>Trouble logging in?</title><circle cx="48" cy="48" fill="none" r="47" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><path d="M60.931 70.001H35.065a5.036 5.036 0 0 1-5.068-5.004V46.005A5.036 5.036 0 0 1 35.065 41H60.93a5.035 5.035 0 0 1 5.066 5.004v18.992A5.035 5.035 0 0 1 60.93 70ZM37.999 39.996v-6.998a10 10 0 0 1 20 0v6.998" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
</div>
        <h2 className='forgot-title'>Forgot Password</h2>
        <p className='forgot-subtitle'>Enter your email and we'll send you a link to get back into your account.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
            />
            {error && <span className="error">{error}</span>}
          </div>
          <button type="submit" className='forgot-btn'>Verify your email</button>
          <div className="horizontal-line">
          <span>OR</span>
        </div>
        <div className='create-link'><Link to={"/signup"}>Create new account</Link></div>
        </form>
      </div>
      </div>
      </div>
    );
}

export default ForgotPassword