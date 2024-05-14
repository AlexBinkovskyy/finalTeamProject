import React from 'react';
import ComponentWithModal from '../Modal/Modal';
import IconX from '../../image/sprite.svg';
import css from './LogOutModal.module.css';

export const LogOutModal = ({ isOpen, isClose }) => {
  // const [modalIsOpen, setIsOpen] = useState(false);

  // const openModal = () => {
  //   setIsOpen(true);
  // };

  // const closeModal = () => {
  //   setIsOpen(false);
  // };

  // Функция logOut
  const logOut = () => {
    // Здесь можно добавить логику для удаления записи
  };

  return (
    <>
      <ComponentWithModal isOpen={isOpen} isClose={isClose}>
        <div className={css.modalOverlay}>
          <div className={css.modalContent}>
            <button className={css.closeButton}>
              <svg className={css.iconClose}>
                <use href={`${IconX}#IconX`}></use>
              </svg>
            </button>
            <h2 className={css.modalTitle}>Log out</h2>
            <p className={css.modalQuestion}>Do you really want to leave?</p>
            <div className={css.buttonContainer}>
              <button className={css.deleteButton} onClick={logOut}>
                Log out
              </button>
              <button className={css.cancelButton} onClick={isClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </ComponentWithModal>
    </>
  );
};
