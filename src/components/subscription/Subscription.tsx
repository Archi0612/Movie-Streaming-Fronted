import { useState, useRef } from 'react';
import * as React from "react";
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import "./Subscription.css";
import { loadStripe, Stripe } from '@stripe/stripe-js';

// Define subscription types and pricing
interface SubscriptionPlan {
    type: 'monthly' | 'yearly';
    tier: 'free' | 'basic' | 'premium';
    price: number;
}

// Pricing configuration
const SUBSCRIPTION_PRICES = {
    free: {
        monthly: 0,
        yearly: 0
    },
    basic: {
        monthly: 199,
        yearly: 2299
    },
    premium: {
        monthly: 299,
        yearly: 3499
    }
};

interface SubscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const publishKey: string = import.meta.env.VITE_STRIPE_PUBLISH_KEY!;
const stripePromise: Promise<Stripe | null> = loadStripe(publishKey);

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
    isOpen,
    onClose,
}) => {

    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const [loading, setLoading] = useState(false);
    const selectedPlanRef = useRef<SubscriptionPlan | null>(null);

    const handleSubscription = async (tier: 'basic' | 'premium'): Promise<void> => {
        try {
            const plan: SubscriptionPlan = {
                type: billingCycle,
                tier,
                price: SUBSCRIPTION_PRICES[tier][billingCycle],
            };
            selectedPlanRef.current = plan;

            // Validate plan selection
            if (!plan.tier) {
                alert("Please select a valid subscription plan.");
                return;
            }
            setLoading(true);

            // Prepare the payload for API call
            const subscriptionPayload = {
                selectedPlan: {
                    type: plan.type,
                    tier: plan.tier,
                },
            };
            console.log("Subscription Payload:", subscriptionPayload);
            const response = await axios.post(
                "http://localhost:7777/stripe/membersubscription",
                subscriptionPayload,
                {withCredentials: true}
            );

            if (response.data.status === "existing_subscription" && response.data.redirectUrl) {
                window.location.href = response.data.redirectUrl;
                return;
            }

            const stripe = await stripePromise;
            if (stripe) {
                const { error } = await stripe.redirectToCheckout({ sessionId: response.data.id });
                if (error) alert("There was an error processing your subscription.");
            }
        } catch {
            alert("An error occurred while processing your subscription.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <Elements stripe={stripePromise}>
            <div className="subscription-selection-overlay" onClick={onClose}>
                <div className="subscription-selection-container">
                    <h2 style={{ color: "white" }}>Choose Your Subscription</h2>

                    {/* Billing Cycle Toggle */}
                    <div
                        className="toggle-container"
                        onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                    >
                        <div className={`toggle-slider ${billingCycle === "monthly" ? "left" : "right"}`}></div>
                        <span className={billingCycle === "monthly" ? "active" : ""}>Monthly</span>
                        <span className={billingCycle === "yearly" ? "active" : ""}>Annually</span>
                    </div>

                    {/* Subscription Options */}
                    <div className="subscription-options">
                        {/* Free Plan - Always the same */}
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
                            <button disabled>Selected</button>
                        </div>

                        {/* Basic Plan */}
                        <div className="subscription-card">
                            <h2 className="subscription-card-h2">Basic</h2>
                            <h3 className="subscription-card-h3">
                                ₹{SUBSCRIPTION_PRICES.basic[billingCycle]}
                                {billingCycle === 'yearly'}
                            </h3>
                            {/* && <span className="savings-badge">Save 16%</span> */}
                            <ul className="subscription-card-ul">
                                <li className="subscription-card-li">Access to 5000+ Movies & Series</li>
                                <li className="subscription-card-li">Weekly Movie Recommendations</li>
                                <li className="subscription-card-li">24/7 Customer Support</li>
                                <li className="subscription-card-li">Personalized Watchlist & Liked Content</li>
                                <li className="subscription-card-li">Stream on 2 Devices Simultaneously</li>
                                <li className="subscription-card-li">Create a Private Watch Party with Friends</li>
                            </ul>
                            <button
                                disabled={loading}
                                onClick={() => handleSubscription("basic")}
                            >
                                {loading ? "Processing..." : "Select"}
                            </button>
                        </div>

                        {/* Premium Plan */}
                        <div className="subscription-card">
                            <h2 className="subscription-card-h2">Premium</h2>
                            <h3 className="subscription-card-h3">
                                ₹{SUBSCRIPTION_PRICES.premium[billingCycle]}
                                {billingCycle === 'yearly'}
                            </h3>
                            <ul className="subscription-card-ul">
                                <li className="subscription-card-li">Unlimited access to all Movies & Series</li>
                                <li className="subscription-card-li">Weekly Movie Recommendations</li>
                                <li className="subscription-card-li">24/7 Customer Support</li>
                                <li className="subscription-card-li">Personalized Watchlist & Liked Content</li>
                                <li className="subscription-card-li">Stream on 4 Devices Simultaneously</li>
                                <li className="subscription-card-li">Create a Private Watch Party with Friends</li>
                            </ul>
                            <button
                                disabled={loading}
                                onClick={() => handleSubscription("premium")}
                            >
                                {loading ? "Processing..." : "Select"}
                            </button>
                        </div>
                    </div>

                    {/* Cancel Button */}
                    <div className="cancelbutton">
                        <button
                            type="button"
                            className="cancelSubscribe"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    </div >
                </div >
            </div >
        </Elements >
    );
};

export default SubscriptionModal;