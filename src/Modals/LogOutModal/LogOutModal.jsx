import React, { useState } from 'react';
import ReactModal from 'react-modal';

import css from './LogOutModal.module.css';

export const LogOutModal = () => {
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

  // Функция logOut
  const logOut = () => {
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
        contentLabel="LogOut Modal"
      >
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
      </ReactModal>
    </>
  );
};
