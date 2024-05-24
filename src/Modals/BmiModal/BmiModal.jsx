import React from 'react';
import ComponentWithModal from '../Modal/Modal';
import BodyMassIndex from '../../components/BodyMassIndex/BodyMassIndex';
import css from './BmiModal.module.css';
import IconX from '../../image/sprite.svg';
import { useTranslation } from 'react-i18next';

export default function BmiModal({ isOpen, isClose }) {
  const { t } = useTranslation();
  return (
    <>
      <ComponentWithModal isOpen={isOpen} isClose={isClose}>
        <div className={css.wrapper}>
          <button className={css.closeBtn} onClick={isClose}>
            <svg className={css.icon}>
              <use href={`${IconX}#IconX`}></use>
            </svg>
          </button>
          <h3 className={css.title}>{t('modals.BMI')}</h3>
          <BodyMassIndex closeModal={isClose} />
        </div>
      </ComponentWithModal>
    </>
  );
}
