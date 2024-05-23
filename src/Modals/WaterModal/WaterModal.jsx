import WaterForm from '../WaterForm/WaterForm';
import ComponentWithModal from '../Modal/Modal';
import IconX from '../../image/sprite.svg';
import { useTranslation } from 'react-i18next';
import css from './WaterModal.module.css';

export const WaterModal = ({
  operationType,
  defaultValues,
  isOpen, 
  isClose,
}) => {
  const { t } = useTranslation();
  
  return (
    <ComponentWithModal isOpen={isOpen} isClose={isClose}>
      <div className={css.modalOverlay}>
        <div className={css.modalContent}>
          <button className={css.closeButton} onClick={isClose}>
            <svg className={css.iconClose}>
              <use href={`${IconX}#IconX`}></use>
            </svg>
          </button>
          {operationType === 'add' ? (
            <div>
              <h2 className={css.title}> {t('modals.addWater')}</h2>
              <h3 className={css.paragraph}> {t('modals.chooseValue')}</h3>
            </div>
          ) : (
            <div>
              <h2 className={css.title}> {t('modals.editWater')}</h2>
              <h3 className={css.paragraph}> {t('modals.correctData')}</h3>
            </div>
          )}
          <WaterForm
            operationType={operationType}
            defaultValues={defaultValues}
            isClose={isClose}
          />
        </div>
      </div>
    </ComponentWithModal>
  );
};

export default WaterModal;
