import React, { useState } from "react";
import { Image } from "react-bootstrap";

const ImagePopup = ({ imageUrl,alt  }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Image
        src={imageUrl}
        alt={alt} 
        onClick={openPopup}
        className="imagealert"
      />

      {isOpen && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content">
            <Image src={imageUrl} alt={alt} className="popup-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePopup;