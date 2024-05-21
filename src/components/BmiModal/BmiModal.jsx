import React from 'react';
import ComponentWithModal from '../../Modals/Modal/Modal';
import BodyMassIndex from 'components/BodyMassIndex/BodyMassIndex';
import css from './BmiModal.module.css';
import IconX from '../../image/sprite.svg';

export default function BmiModal({ isOpen, isClose }) {
  return (
    <>
      <ComponentWithModal isOpen={isOpen} isClose={isClose}>
        <div className={css.wrapper}>
          <button className={css.closeBtn} onClick={isClose}>
            <svg className={css.icon}>
              <use href={`${IconX}#IconX`}></use>
            </svg>
          </button>
          <h3 className={css.title}>BMI calculator</h3>
          <BodyMassIndex closeModal={isClose} />
        </div>
      </ComponentWithModal>
    </>
  );
}
