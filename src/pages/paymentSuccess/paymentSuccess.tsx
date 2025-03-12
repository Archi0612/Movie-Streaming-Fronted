import { useState, useEffect } from "react";
import "./PaymentSuccess.css";

export const PaymentSuccess = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 2000);
    }, []);

    return (
        <div className="payment-success-container">
            <div className="card">
                {loading ? (
                    <p className="loading-text">Processing payment...</p>
                ) : (
                    <>
                        <h1>Thank You for Subscribing!</h1>
                        <p>Welcome to <span className="brand-name">Filmster</span>. Enjoy unlimited movies and shows.</p>
                        <button onClick={() => window.location.href = "/home"} className="home-button">
                            Go to Home
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};
