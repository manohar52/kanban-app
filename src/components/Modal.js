import React, { useEffect } from "react";
import "../styles/Modal.css";

const Modal = ({ title, body, onClose, show, onSubmit }) => {
  let modalClass = show ? "modal modal-show" : "modal modal-close";

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <div className={modalClass} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">{title}</h4>
        </div>
        <div className="modal-body">{body}</div>
        <div className="modal-footer">
          <div className="footer-submit">
            <button onClick={onSubmit} className="submit-btn">
              Submit
            </button>
          </div>
          <div className="footer-close">
            <button onClick={onClose} className="close-btn">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
