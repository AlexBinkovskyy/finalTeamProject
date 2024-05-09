import React, { useState } from 'react';
import css from './DeleteWaterModal.module.css';
import ReactModal from 'react-modal';

export const DeleteWaterModal = () => {
  ReactModal.setAppElement('#root');
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Функция handleDelete
  const handleDelete = () => {
    // Здесь можно добавить логику для удаления записи
    closeModal();
  };

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Delete Modal"
      >
        <div className={css.modalOverlay}>
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
      </ReactModal>
    </>
  );
};
