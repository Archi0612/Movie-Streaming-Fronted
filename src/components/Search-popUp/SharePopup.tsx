import React from "react";
import { 
  FaTimes, FaCopy, FaWhatsapp, FaTwitter, 
  FaFacebook, FaEnvelope, FaVideo 
} from "react-icons/fa";
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
        <h3 className="share-movie">Share This Movie</h3>

        {/* Social Media Buttons */}
        <div className="share-social-media">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn whatsapp"
          >
            <FaWhatsapp />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn twitter"
          >
            <FaTwitter />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn facebook"
          >
            <FaFacebook />
          </a>
          <a
            href={`mailto:?subject=Check this out!&body=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn email"
          >
            <FaEnvelope />
          </a>
        </div>

        {/* Copy Link Section */}
        <div className="copy-link">
          <input
            type="text"
            value={url}
            readOnly
            className="copy-link-input"
          />
          <button className="copy-btn" onClick={copyToClipboard}>
            <FaCopy />
          </button>
        </div>

        {/* Create Room */}
        <button className="create-room">
          <FaVideo /> Create Room
        </button>
      </div>
    </div>
  );
};

export default SharePopup;
