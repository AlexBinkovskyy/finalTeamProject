import React, { useState, useEffect } from 'react';
import css from './LogOutModal.module.css';

export default function LogOutModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Функция logOut
  const logOut = () => {
    // Здесь можно добавить логику для удаления записи
    closeModal();
  };

  useEffect(() => {
    const handleEscapeKeyPress = event => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKeyPress);
    } else {
      document.removeEventListener('keydown', handleEscapeKeyPress);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKeyPress);
    };
  }, [isOpen]);

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      {isOpen && (
        <div className={css.modalOverlay} onClick={handleBackdropClick}>
          <div className={css.modalContent}>
            <button className={css.closeButton} onClick={closeModal}>
              ×
            </button>
            <h2 className={css.modalTitle}>Log out</h2>
            <p className={css.modalQuestion}>Do you really want to leave?</p>
            <div className={css.buttonContainer}>
              <button className={css.deleteButton} onClick={logOut}>
                Log out
              </button>
              <button className={css.cancelButton} onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
