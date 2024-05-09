import React, { useState, useEffect } from 'react';
import css from './DeleteWaterModal.module.css';

export default function DeleteWaterModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Функция для удаления записи
  const handleDelete = () => {
    // Здесь можно добавить логику для удаления записи
    console.log("Deleting entry...");
    // После удаления можно закрыть модальное окно
    closeModal();
  };

  useEffect(() => {
    const handleEscapeKeyPress = (event) => {
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

  const handleBackdropClick = (event) => {
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
            <button className={css.closeButton} onClick={closeModal}>×</button>
            <h2 className={css.modalTitle}>Delete entry</h2>
            <p className={css.modalQuestion}>Are you sure you want to delete the entry?</p>
            <div className={css.buttonContainer}>
              <button className={css.deleteButton} onClick={handleDelete}>Delete</button>
              <button className={css.cancelButton} onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
