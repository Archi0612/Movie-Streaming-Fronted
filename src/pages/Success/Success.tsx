// import { useSearchParams } from "react-router-dom";
import './Success.css'
import successSvg from '../../assets/success-svgrepo-com.svg';

const Success = () => {
    // const [searchParams] = useSearchParams();
    // const sessionId = searchParams.get("session_id");

    return (
        <div className="success-container">
            <div className="success-box">
                <img src={successSvg} alt="Success" className="success-icon" />
                <h1 style={{ color: 'white' }}>Payment Successful 🎉</h1>
                <p style={{ color: 'white' }}>Thank you for subscribing!</p>

                {/* {sessionId && (
                    <div className="session-box">
                        <strong>Session ID:</strong> {sessionId}
                    </div>
                )} */}

                <a href="/home" className="sucesshome-button">
                    Go back to Home
                </a>
            </div>
        </div>
    );
};

export default Success;
