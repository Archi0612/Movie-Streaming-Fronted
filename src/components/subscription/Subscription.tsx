import { useRef, useState } from "react";
import "./Subscription.css";
import ReactModal from "react-modal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import axios from "axios";

interface SubscriptionProps {
    isOpen: boolean;
    onClose: () => void;
}

interface UserData {
    name: string;
    email: string;
    phone: string;
    country: string;
    dob: string;
    countryCode: string;
}

interface CheckoutSession {
    id: string;
}

interface StripeRedirect {
    redirectUrl: string;
}

ReactModal.setAppElement("#root"); // Accessibility compliance

const publishKey: string = import.meta.env.VITE_STRIPE_PUBLISH_KEY!;
const stripePromise: Promise<Stripe | null> = loadStripe(publishKey);

const SubscriptionSelection: React.FC<SubscriptionProps> = ({ isOpen, onClose }) => {
    console.log("Entered in Subscription component");

    const [loading, setLoading] = useState<boolean>(false);
    const selectedPlanRef = useRef<"monthly" | "yearly" | null>(null);

    const userData: UserData = {
        name: "Priyanshu1",
        email: "A12@gmail.com",
        phone: "1234567890",
        country: "India",
        dob: "22-08-2001",
        countryCode: "+91",
    };

    const handleSubscription = async (plan: "monthly" | "yearly"): Promise<void> => {

        console.log("SUbscription button entered and the subs is ", plan);
        selectedPlanRef.current = plan; // Store value in ref (no re-render)
        const amount = plan === "monthly" ? 700 : 8400;

        if (!plan) {
            alert("Please select a subscription plan.");
            return;
        }
        setLoading(true);

        try {
            console.log("Step-1: Sending subscription request");

            const response = await axios.post<CheckoutSession | StripeRedirect>(
                "http://localhost:7777/stripe/memberSubscription",
                {
                    selectedPlan: plan,
                    user: userData,
                    amount
                }
            );

            console.log("Step-2: API response received");
            console.log(response, 'This is the response from the server');
            if (response.status === 409) {
                console.log(response.data, "response code of 409");
                console.log("Step-3: Existing subscription detected");
                const data: StripeRedirect = response.data as StripeRedirect;
                if (data?.redirectUrl) {
                    console.log("Step-4: Redirecting to Stripe portal");
                    window.location.href = data.redirectUrl;
                }
                return
            }
            console.log("Step-5: Creating a new checkout session");
            const session: CheckoutSession = response.data as CheckoutSession;
            const stripe = await stripePromise;

            if (stripe) {

                const { error } = await stripe.redirectToCheckout({
                    sessionId: session.id, // Ensure `session.id` exists
                });
                console.log(error, "at line 93 subs.ts");
            }

        } catch (error: unknown) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <Elements stripe={stripePromise}>
            <div className="subscription-selection-overlay">
                <div className="subscription-selection-container">
                    <h2 style={{ color: "white" }}>Choose Your Subscription</h2>
                    <div className="subscription-options">
                        <div className="subscription-card">
                            <h2>Basic</h2>
                            <p>Enjoy our Free basic subscription plan.</p>
                            <button disabled={loading}>Pay 0</button>
                        </div>
                        <div className="subscription-card">
                            <h2>Monthly</h2>
                            <p>Enjoy Premium movies and content for a month at Rs 700/- only.</p>
                            <button disabled={loading} onClick={() => handleSubscription("monthly")}>
                                Pay 700
                            </button>
                        </div>
                        <div className="subscription-card">
                            <h2>Yearly</h2>
                            <p>Enjoy all-year premium movies and subscriptions at Rs 8400/- only.</p>
                            <button disabled={loading} onClick={() => handleSubscription("yearly")}>
                                Pay 8400
                            </button>
                        </div>
                    </div>
                    <div className="cancelbutton">
                        <button type="button" className="cancelSubscribe" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </Elements>
    );
};

export default SubscriptionSelection;
