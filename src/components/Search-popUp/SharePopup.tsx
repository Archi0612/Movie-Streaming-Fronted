import React from "react";
import { FaTimes, FaCopy, FaWhatsapp, FaTwitter } from "react-icons/fa";
import "./SharePopup.css";

interface SharePopupProps {
  url: string;
  onClose: () => void;
}

const SharePopup: React.FC<SharePopupProps> = ({ url, onClose }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="share-popup-overlay" onClick={onClose}>
      <div className="share-popup" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>
        <h3>Share This Movie</h3>
        <input type="text" value={url} readOnly className="share-input" />
        <button className="share-btn copy" onClick={copyToClipboard}>
          <FaCopy /> Copy Link
        </button>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn whatsapp"
        >
          <FaWhatsapp /> Share on WhatsApp
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn twitter"
        >
          <FaTwitter /> Share on Twitter
        </a>
      </div>
    </div>
  );
};

export default SharePopup;
