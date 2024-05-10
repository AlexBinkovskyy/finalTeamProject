import React, { useState } from 'react';
import WaterForm from './WaterForm';
import ComponentWithModal from '../Modal/Modal';
import css from './WaterModal.module.css';

export const WaterModal = ({ operationType, onSubmit, defaultValues }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ComponentWithModal isOpen={modalIsOpen} isClose={closeModal}>
      <button onClick={openModal}>Open Modal</button>
      <div className={css.modal}>
        <div className={css.modalContent}>
          <span className={css.close} onClick={closeModal}>&times;</span>
          <h2>{operationType === 'add' ? 'Add Water' : 'Edit the entered amount of water'}</h2>
          <WaterForm onSubmit={onSubmit} defaultValues={defaultValues} />
        </div>
      </div>
    </ComponentWithModal>
  );
};

export default WaterModal;
