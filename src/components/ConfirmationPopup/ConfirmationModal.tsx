import React from "react";
import "./ConfirmationModal.css";
import { CiCircleQuestion } from "react-icons/ci";
interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmation",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-content-icon">
        <CiCircleQuestion size={80}/>
        </div>
        <div className="modal-content-data">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="confirm-btn" onClick={onConfirm}>
            {confirmText}
          </button>
          <button className="cancel-btn" onClick={onClose}>
            {cancelText}
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
