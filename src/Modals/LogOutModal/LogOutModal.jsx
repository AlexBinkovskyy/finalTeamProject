import React from 'react';
import ComponentWithModal from '../Modal/Modal';
import IconX from '../../image/sprite.svg';
import css from './LogOutModal.module.css';
import { signout } from '../../redux/auth/operations.js';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

export const LogOutModal = ({ isOpen, isClose }) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const logOut = () => dispatch(signout(i18n));

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
            <h2 className={css.modalTitle}>{t('modals.logOut')} </h2>
            <p className={css.modalQuestion}>{t('modals.wantLeave')}?</p>
            <div className={css.buttonContainer}>
              <button className={css.deleteButton} onClick={logOut}>
                {t('modals.logOut')}
              </button>
              <button className={css.cancelButton} onClick={isClose}>
                {t('modals.cancel')}
              </button>
            </div>
          </div>
        </div>
      </ComponentWithModal>
    </>
  );
};
