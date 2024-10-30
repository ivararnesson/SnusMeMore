import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../assets/CSS/modal.css";

const Modal = ({ isOpen, onClose }) => {
  const navigate = useNavigate(); 

  if (!isOpen) return null;

  const handleClose = () => {
    navigate('/'); 
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Order Bekräftelse</h3>
          <button className="close" onClick={handleClose}>&times;</button>
        </div>
        <div className="modal-body">
          Din order är bekräftad! <br />
          Vi skickar din order inom kort!
        </div>
        <div className="modal-footer">
          <button onClick={handleClose}>Återgå till startsidan</button>
        </div>
      </div>
    </div>
  );
};

export default Modal; 
