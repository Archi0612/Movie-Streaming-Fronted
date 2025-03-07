import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [status, setStatus] = useState("Verifying payment...");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (sessionId) {
            verifyPayment(sessionId);
        }
    }, [sessionId]);

    const verifyPayment = async (sessionId: string) => {
        console.log(sessionId, "session id in fe line 18")
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:7777/stripe/verifyPayment`, {
                params: { session_id: sessionId },
                timeout: 10000, //Prevents infinite loading if server takes too long
            });

            if (response.data.success) {
                setStatus("Payment Successful! Subscription Activated.");
            } else {
                setStatus("Payment verification failed. Please contact support.");
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            setStatus("Error verifying payment. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>{status}</h1>
            {loading && <p>Processing payment...</p>}
        </div>
    );
};
