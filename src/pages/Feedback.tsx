import React, { useState } from "react";
import "./Feedback.css";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { ratingToReview } from "../utils/MediaConstants";
import { useNavigate } from "react-router-dom";

const Feedback: React.FC = () => {
  const [feedback, setFeedback] = useState({
    rating: 1,
    review: "Needs Improvement",
    comment: "",
  });
  const navigate = useNavigate();


  const handleRating = (star: number, event: React.MouseEvent<HTMLSpanElement>) => {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const newRating = (star - 1) * 2 + ((event.clientX - left) < width / 2 ? 1 : 2);
    setFeedback({
      ...feedback,
      rating: newRating,
      review: ratingToReview[newRating] || "Needs Improvement",
    });
  };
  

  const handleReviewChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const reviewText = e.target.value;
    const newRating = Object.keys(ratingToReview).find(
      (key) => ratingToReview[parseInt(key)] === reviewText
    );
    if (newRating) {
      setFeedback({
        ...feedback,
        rating: parseInt(newRating),
        review: reviewText,
      });
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback({ ...feedback, comment: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback submitted:", feedback);

  };


  const handleSkip = () => {
    //close this modal
    navigate(-1);
  };

  return (
      <div className="feedback-container">
        <form className="feedback-form" onSubmit={handleSubmit}>
          <h2 className="auth-heading">Give Your Feedback</h2>
          <p className="feedback-description">
            Your opinion matters! Help us improve by sharing your thoughts.
          </p>

          <label className="feedback-label">Select your review</label>
          <select
            className="feedback-select"
            value={feedback.review}
            onChange={handleReviewChange}
            required
          >
            {Object.values(ratingToReview).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <div className="feedback-rating-container">
            <label className="feedback-label">Overall Rating:</label>
            {[...Array(5)].map((_, i) => {
              const star = i + 1;
              const fullValue = star * 2;
              const halfValue = fullValue - 1;
              let icon;
              if (feedback.rating >= fullValue) {
                icon = <FaStar style={{ color: "yellow" }} />;
              } else if (feedback.rating === halfValue) {
                icon = <FaStarHalfAlt style={{ color: "yellow" }} />;
              } else {
                icon = <FaStar style={{ color: "gray" }} />;
              }
              return (
                <span key={i} className="feedback-star" onClick={(e) => handleRating(star, e)}>
                  {icon}
                </span>
              );
            })}
          </div>

          <div className="comment-container">
            <label className="feedback-label">Additional Comments:</label>
            <textarea
              className="feedback-textarea"
              value={feedback.comment}
              onChange={handleCommentChange}
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
  );
};

export default Feedback;
