import React from "react";
import "../styles/client/ImageModal.css"; // Add your styling here

const ImageModal = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;

  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt="Product" className="modal-image" />
        <button className="modal-close-button" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
