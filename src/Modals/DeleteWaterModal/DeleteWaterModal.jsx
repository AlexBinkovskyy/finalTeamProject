import ComponentWithModal from '../Modal/Modal';
import { deleteConsumption } from '../../redux/water/operations';
import css from './DeleteWaterModal.module.css';
import IconX from '../../image/sprite.svg';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

export const DeleteWaterModal = ({ isOpen, isClose, consumptionID }) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const handleDelete = () => {
    dispatch(deleteConsumption(consumptionID));
    isClose();
  };

  return (
    <>
      <ComponentWithModal isOpen={isOpen} isClose={isClose}>
        <div className={css.modalOverlay}>
          <button className={css.closeButton} onClick={isClose}>
            <svg className={css.iconClose}>
              <use href={`${IconX}#IconX`}></use>
            </svg>
          </button>
          <h2 className={css.modalTitle}> {t('modals.deleteEntry')} </h2>
          <p className={css.modalQuestion}>
            {t('modals.sureDelete')} 
          </p>
          <div className={css.buttonContainer}>
            <button className={css.deleteButton} onClick={handleDelete}>
            {t('modals.delete')} 
            </button>
            <button className={css.cancelButton} onClick={isClose}>
            {t('modals.cancel')} 
            </button>
          </div>
        </div>
      </ComponentWithModal>
    </>
  );
};
