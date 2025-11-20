// components/MessageBox.jsx
import React, { useState, useEffect } from "react";
import styles from "./css/MessageBox.module.css"; // Import local CSS

function MessageBox({ message, type = "info", visible = false, onClose }) {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.background} onClick={handleClose}></div>
      <div className={`${styles.box} ${styles[type]}`}>
        <p>{message}</p>
        <button className={styles.closeBtn} onClick={handleClose}>
          ×
        </button>
      </div>
    </div>
  );
}

export default MessageBox;
