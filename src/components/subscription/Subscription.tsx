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
    const [loading, setLoading] = useState<boolean>(false);
    const[billingCycle,setBillingCycle]=useState<"monthly" | "yearly">("monthly");
    const selectedPlanRef = useRef<"monthly" | "yearly" | null>(null);
    const userData: UserData = {
        name: "Priyanshu1",
        email: "p6@gmail.com",
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
                console.log("Step-3: Existing subscription detected");
                const data: StripeRedirect = response.data as StripeRedirect;
                if (data?.redirectUrl) {
                    console.log("Step-4: Redirecting to Stripe portal");
                    window.location.href = data.redirectUrl;
                }
            } else {
                console.log("Step-5: Creating a new checkout session");

                // const session: CheckoutSession = response.data as CheckoutSession;
                const stripe = await stripePromise;

                if (stripe) {
                    console.log("Step-6: Creating a new payment method");
                }
            }
        } catch (error: unknown) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      };
    if (!isOpen) return null;

    return (
        <Elements stripe={stripePromise}>
            <div className="subscription-selection-overlay" onClick={handleOverlayClick}>
                <div className="subscription-selection-container">
                    <h2 style={{ color: "white" }}>Choose Your Subscription</h2>
                    <div className="toggle-container" onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}>
                        <div className={`toggle-slider ${billingCycle === "monthly" ? "left" : "right"}`}></div>
                        <span className={billingCycle === "monthly" ? "active" : ""}>Monthly</span>
                        <span className={billingCycle === "yearly" ? "active" : ""}>Annually</span>
                    </div>
                    {billingCycle === "monthly" ? (
                    <div className="subscription-options">
                        <div className="subscription-card">
                            <h2 className="subscription-card-h2">Free</h2>
                            <h3 className="subscription-card-h3">₹0</h3>
                            <ul className="subscription-card-ul">
                                <li className="subscription-card-li">Access to Movies & Series Trailer</li>
                                <li className="subscription-card-li">Weekly Movie Recommendations</li>
                                <li className="subscription-card-li">24/7 Customer Support</li>
                                <li className="subscription-card-li">Personalized Watchlist & Liked Content</li>
                                <li className="subscription-card-li">Stream on 2 Devices Simultaneously</li>
                                <li className="subscription-card-li">Create a Private Watch Party with Friends</li>
                            </ul>
                            <button disabled={loading}>Selected</button>
                        </div>
                        <div className="subscription-card">
                            <h2 className="subscription-card-h2">Basic</h2>
                            <h3 className="subscription-card-h3">₹199</h3>
                            <ul className="subscription-card-ul">
                                <li className="subscription-card-li">Access to 5000+ Movies & Series </li>
                                <li className="subscription-card-li">Weekly Movie Recommendations</li>
                                <li className="subscription-card-li">24/7 Customer Support</li>
                                <li className="subscription-card-li">Personalized Watchlist & Liked Content</li>
                                <li className="subscription-card-li">Stream on 2 Devices Simultaneously</li>
                                <li className="subscription-card-li">Create a Private Watch Party with Friends</li>
                            </ul>
                            <button disabled={loading} onClick={() => handleSubscription("monthly")}>
                                Select
                            </button>
                        </div>
                        <div className="subscription-card">
                            <h2 className="subscription-card-h2">Premium</h2>
                            <h3 className="subscription-card-h3">₹299</h3>
                            <ul className="subscription-card-ul">
                                <li className="subscription-card-li">Unlimited access to all Movies & Series </li>
                                <li className="subscription-card-li">Weekly Movie Recommendations</li>
                                <li className="subscription-card-li">24/7 Customer Support</li>
                                <li className="subscription-card-li">Personalized Watchlist & Liked Content</li>
                                <li className="subscription-card-li">Stream on 4 Devices Simultaneously</li>
                                <li className="subscription-card-li">Create a Private Watch Party with Friends</li>
                            </ul>
                            <button disabled={loading} onClick={() => handleSubscription("monthly")}>
                                Select
                            </button>
                        </div>
                    </div>

                    ):(
                        <div className="subscription-options">
                        <div className="subscription-card">
                            <h2 className="subscription-card-h2">Free</h2>
                            <h3 className="subscription-card-h3">₹0</h3>
                            <ul className="subscription-card-ul">
                                <li className="subscription-card-li">Access to Movies & Series Trailer</li>
                                <li className="subscription-card-li">Weekly Movie Recommendations</li>
                                <li className="subscription-card-li">24/7 Customer Support</li>
                                <li className="subscription-card-li">Personalized Watchlist & Liked Content</li>
                                <li className="subscription-card-li">Stream on 2 Devices Simultaneously</li>
                                <li className="subscription-card-li">Create a Private Watch Party with Friends</li>
                            </ul>
                            <button disabled={loading}>Selected</button>
                        </div>
                        <div className="subscription-card">
                            <h2 className="subscription-card-h2">Basic</h2>
                            <h3 className="subscription-card-h3">₹2299</h3>
                            <ul className="subscription-card-ul">
                                <li className="subscription-card-li">Access to 5000+ Movies & Series </li>
                                <li className="subscription-card-li">Weekly Movie Recommendations</li>
                                <li className="subscription-card-li">24/7 Customer Support</li>
                                <li className="subscription-card-li">Personalized Watchlist & Liked Content</li>
                                <li className="subscription-card-li">Stream on 2 Devices Simultaneously</li>
                                <li className="subscription-card-li">Create a Private Watch Party with Friends</li>
                            </ul>
                            <button disabled={loading} onClick={() => handleSubscription("yearly")}>
                                Select
                            </button>
                        </div>
                        <div className="subscription-card">
                            <h2 className="subscription-card-h2">Premium</h2>
                            <h3 className="subscription-card-h3">₹3499</h3>
                            <ul className="subscription-card-ul">
                                <li className="subscription-card-li">Unlimited access to all Movies & Series </li>
                                <li className="subscription-card-li">Weekly Movie Recommendations</li>
                                <li className="subscription-card-li">24/7 Customer Support</li>
                                <li className="subscription-card-li">Personalized Watchlist & Liked Content</li>
                                <li className="subscription-card-li">Stream on 4 Devices Simultaneously</li>
                                <li className="subscription-card-li">Create a Private Watch Party with Friends</li>
                            </ul>
                            <button disabled={loading} onClick={() => handleSubscription("yearly")}>
                                Select
                            </button>
                        </div>
                    </div>
                    )}
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