import React, { useState } from 'react';
import WaterForm  from '../WaterForm/WaterForm';
import ComponentWithModal from '../Modal/Modal';
import css from './WaterModal.module.css';

export const WaterModal = ({ operationType, onSubmit, defaultValues, isOpen, isClose }) => {
  // const [modalIsOpen, setIsOpen] = useState(false);

  // const openModal = () => {
  //   setIsOpen(true);
  // };

  // const closeModal = () => {
  //   setIsOpen(false);
  // };

  return (
    <ComponentWithModal isOpen={isOpen} isClose={isClose}>
      <div className={css.modal}>
        <div className={css.modalContent}>
          <span className={css.close} >&times;</span>
          {operationType === 'add' ? (
          <div>
            <h2>Add Water</h2>
            <h3>Choose a value</h3>
          </div>
        ) : (
          <div>
            <h2>Edit the entered amount of water</h2>
            <h3>Correct entered data:</h3>
          </div>
        )}
          <WaterForm onSubmit={onSubmit} defaultValues={defaultValues} />
        </div>
      </div>
    </ComponentWithModal>
  );
};

export default WaterModal;
