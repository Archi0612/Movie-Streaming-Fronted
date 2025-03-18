import { useState, useEffect } from "react";
import "./PaymentSuccess.css";

export const PaymentSuccess = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false));
    }, []);

    return (
        <div className="payment-success-container">
            <div className="card">
                {loading ? (
                    <p className="loading-text">Processing payment...</p>
                ) : (
                    <>
                        <h1 className="payment-success-heading">Thank You for Subscribing!</h1>
                        <p className="paymentSuccess-p">Welcome to <span className="brand-name">Filmster</span>. Enjoy unlimited movies and shows.</p>
                        <button onClick={() => window.location.href = "/home"} className="home-button">
                            Go to Home
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};
