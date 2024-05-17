import React from 'react';
import ComponentWithModal from '../Modal/Modal';
import IconX from '../../image/sprite.svg';
import css from './LogOutModal.module.css';
import {signout} from '../../redux/auth/operations.js'
import { useDispatch } from 'react-redux';

export const LogOutModal = ({ isOpen, isClose }) => {
  const dispatch = useDispatch();

  const logOut = () => dispatch(signout());
  

  return (
    <>
      <ComponentWithModal isOpen={isOpen} isClose={isClose}>
        <div className={css.modalOverlay}>
          <div className={css.modalContent}>
            <button className={css.closeButton} onClick={isClose}>
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
