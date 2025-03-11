import { useSearchParams } from "react-router-dom";
import './paymentSuccess.css'
import axios from "axios";
import { useEffect, useState } from "react";

export const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [status, setStatus] = useState("Verifying...");

    useEffect(() => {
        if (sessionId) {
            verifyPayment(sessionId);
        }
    }, [sessionId]);

    const verifyPayment = async (sessionId: string) => {
        try {
            console.log("sessionId: ", sessionId)
            const response = await axios.get(`http://localhost:7777/stripe/verifyPayment?sessiond=${sessionId}`, {withCredentials: true});
            if (response.data.success) {
                setStatus("Payment Successful! 🎉");

            } else {
                setStatus("Payment verification failed.");
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            setStatus("Error verifying payment.");
        }
    };

    return (
        <div>
            <h1>{status}</h1>
        </div>
    );
};




