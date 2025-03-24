import React from "react";
import "./DeleteConfirmationModal.css";
import { SlClose } from "react-icons/sl";
interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div className="delete-modal-overlay" onClick={handleOverlayClick}>
      <div className="delete-modal-content">
        <SlClose color="red" size={"50"}/>
        <h2 className="delete-modal-h2">Are you sure?</h2>
        <p className="delete-modal-p">Do you really want to delete these records? This process cannot be undone.</p>
        <div className="delete-modal-buttons">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="confirm-btn" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
