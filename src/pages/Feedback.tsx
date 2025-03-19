import React, { useState } from "react";
import "./Feedback.css";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Feedback: React.FC = () => {
  const [rating, setRating] = useState(0);
    const [review, setReview] = useState("Needs Improvement");
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const reviewOptions: { [key: string]: number } = {
    "Excellent": 10,
    "Very Good": 8,
    "Good": 6,
    "Needs Improvement": 4,
    "Poor": 2,
  };

  const ratingToReview: { [key: number]: string } = {
    10: "Excellent",
    8: "Very Good",
    6: "Good",
    4: "Needs Improvement",
    2: "Poor",
  };

  const handleRating = (index: number) => {
    const newRating = index * 2;
    setRating(newRating);
    setReview(ratingToReview[newRating] || "Needs Improvement");
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedReview = e.target.value;
    setReview(selectedReview);
    setRating(reviewOptions[selectedReview] || 4);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleSkip = () => {
    setRating(0);
    setReview("Needs Improvement");
    setComment("");
    navigate(-1);

  };

  return (
    <div className="page-container">
      <div className="feedback-container">
        <form className="feedback-form" onSubmit={handleSubmit}>
          <h2 className="auth-heading">Give Your Feedback</h2>
          <p className="feedback-description">
            Your opinion matters! Help us improve by sharing your thoughts.
          </p>
          
          <label className="feedback-label">Select your review</label>
          <select
            className="feedback-select"
            value={review}
            onChange={handleReviewChange}
            required
          >
            {Object.keys(reviewOptions).map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

         

          <div className="rating-container">
            <label className="feedback-label">Overall Rating:</label>
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`star ${rating / 2 > index ? "filled" : ""}`}
                onClick={() => handleRating(index + 1)}
              >
                <FaStar />
              </span>
            ))}
          </div>
          
          <div className="comment-container">
            <label className="feedback-label">Additional Comments:</label>
            <textarea
              className="feedback-textarea"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts..."
            ></textarea>
          </div>

          <div className="btn-container">
            <button type="submit" className="feedback-button">
              Submit
            </button>
            <button type="button" className="feedback-button skip-button" onClick={handleSkip}>
              Skip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
