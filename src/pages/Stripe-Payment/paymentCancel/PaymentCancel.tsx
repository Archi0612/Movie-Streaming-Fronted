import React from "react";
import "./PaymentCancel.css";

const PaymentCancel:React.FC = () => {
    return (
        <div className="cancel-container">
            <div className="cancel-box">
                <img src="/cancel.svg" alt="Canceled" className="cancel-icon" />
                <h1>Payment Canceled ❌</h1>
                <p className="para">It looks like you canceled your subscription.</p>

                <a href="/home" className="home-button">
                    Go back to Home
                </a>
            </div>
        </div>
    );
};

export default PaymentCancel;
