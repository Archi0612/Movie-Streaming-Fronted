import React, { useState } from "react";
import "./Feedback.css";
import { FaStar } from "react-icons/fa";
const Feedback: React.FC = () => {
  const [rating, setRating] = useState(0);

  const [recommend, setRecommend] = useState("yes");
  const [review, setReview] = useState("Decent but had room for improvement");
  

  const handleRating = (index: number) => {
    setRating(index * 2 );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ rating, review, recommend});
  };

  return (
    <div className="feedback-container">
      <form className="feedback-form" onSubmit={handleSubmit}>
        <h2>Give Your Feedback</h2>
        <label >Select your review</label>
        <select
            className="feedback-select"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          >
           
           <option value="Exceptional and highly recommended">Exceptional and highly recommended</option>
<option value="A very enjoyable and engaging experience">A very enjoyable and engaging experience</option>
<option value="Decent but had room for improvement">Decent but had room for improvement</option>
<option value="Mediocre, watchable but not outstanding">Mediocre, watchable but not outstanding</option>
<option value="Underwhelming and not worth recommending">Underwhelming and not worth recommending</option>

          </select>

        <div className="recommend-container">
          <label className="label-recom">Would you recommend this movie/web series?</label>
          <select
            className="feedback-select"
            value={recommend}
            onChange={(e) => setRecommend(e.target.value)}

          >
            
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="rating-container">
          <label className="overall-rating">Overall Rating:</label>
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`star ${rating / 2 > index ? "filled" : ""}`}
              onClick={() => handleRating(index + 1)}
            >
              <FaStar/>
            </span>
          ))}
        </div>
          <div className="btn-container">
        <button type="submit" className="feedback-button">
          Submit Feedback
        </button>
        </div>
      </form>
    </div>
  );
};

export default Feedback;