import WaterForm  from '../WaterForm/WaterForm';
import ComponentWithModal from '../Modal/Modal';
import IconX from '../../image/sprite.svg';
import css from './WaterModal.module.css';

export const WaterModal = ({ operationType, onSubmit, defaultValues, isOpen, isClose }) => {

  return (
    <ComponentWithModal isOpen={isOpen} isClose={isClose}>
      <div className={css.modal}>
        <div className={css.modalContent}>
        <button className={css.closeButton} onClick={isClose}>
              <svg className={css.iconClose}>
                <use href={`${IconX}#IconX`}></use>
              </svg>
            </button>
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
