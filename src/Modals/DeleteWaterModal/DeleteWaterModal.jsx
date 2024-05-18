import ComponentWithModal from '../Modal/Modal';
import { deleteConsumption } from '../../redux/water/operations';
import css from './DeleteWaterModal.module.css';
import IconX from '../../image/sprite.svg';
import { useDispatch } from 'react-redux';

export const DeleteWaterModal = ({ isOpen, isClose, consumptionID }) => {

 
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteConsumption(consumptionID));

  return (
    <>
      <ComponentWithModal isOpen={isOpen} isClose={isClose}>
        <div className={css.modalOverlay}>
            <button className={css.closeButton} onClick={isClose}> 
              <svg className={css.iconClose}>
                <use href={`${IconX}#IconX`}></use>
              </svg>
            </button>
            <h2 className={css.modalTitle}>Delete entry</h2>
            <p className={css.modalQuestion}>
              Are you sure you want to delete the entry?
            </p>
            <div className={css.buttonContainer}>
              <button className={css.deleteButton} onClick={handleDelete}>
                Delete
              </button>
              <button className={css.cancelButton} onClick={isClose}>
                Cancel
              </button>
            </div>
          </div>
      </ComponentWithModal>
    </>
  );
};

