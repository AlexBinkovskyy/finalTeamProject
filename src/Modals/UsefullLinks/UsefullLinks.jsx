import React from 'react';
import ComponentWithModal from '../Modal/Modal';
import IconX from '../../image/sprite.svg';
import css from './UsefullLinks.module.css';
import { useTranslation } from 'react-i18next';
import { usefulLinks } from 'components/utils/UsefullLinks';
import {nanoid} from 'nanoid';

export const UsefullLinks = ({ isOpen, isClose }) => {
  const { t } = useTranslation();

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
            <h3 className={css.modalTitle}>Usefull links to discover something new about water</h3>
            <div className={css.wrapper}>
              <ul className={css.linksList}>
                {usefulLinks.map(link => {
                    console.log(link);
                  return <li key={(nanoid())}>
                    <a href={link.url} target='_blank' rel='noreferrer' className={css.listItem} dataText={link.description} >{link.url.split('/')[2]}</a>
                  </li>;
                })}
              </ul>
            </div>

            <button className={css.cancelButton} onClick={isClose}>
              {t('modals.cancel')}
            </button>
          </div>
        </div>
      </ComponentWithModal>
    </>
  );
};
