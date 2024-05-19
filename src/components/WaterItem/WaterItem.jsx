import css from './WaterItem.module.css';
import { DeleteWaterModal } from '../../Modals/DeleteWaterModal/DeleteWaterModal';
import icons from '../../image/sprite.svg';
import { useState } from 'react';
import WaterModal from 'Modals/WaterModal/WaterModal';

export default function WaterItem({ water: { amount, time, _id } }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const openEditModal = () => {
    setModalIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLogOutModal = () => {
    setModalIsOpen(false);
    document.body.style.overflow = '';
  };

  const openDeleteModal = () => {
    setDeleteModalIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
    document.body.style.overflow = '';
  };

  const svgClass = !_id ? css.iconDisabled : css.icon;

  return (
    <>
      <div className={css.card}>
        <svg className={css.waterIcon}>
          <use href={`${icons}#iconVector`}></use>
        </svg>

        <div className={css.data}>
          <p className={css.amount}>{amount} ml</p>
          <p className={css.time}>{time}</p>
        </div>
        <div className={css.buttons}>
          <svg className={svgClass} onClick={openEditModal}>
            <use href={`${icons}#IconEdit2`}></use>
          </svg>
          {modalIsOpen && (
            <WaterModal
              operationType={'edit'}
              defaultValues={(amount, time, _id)}
              isOpen={modalIsOpen}
              isClose={closeLogOutModal}
            />
          )}

          <svg className={svgClass} onClick={openDeleteModal}>
            <use href={`${icons}#IconTrash04`}></use>
          </svg>
          {deleteModalIsOpen && (
            <DeleteWaterModal
              isOpen={deleteModalIsOpen}
              isClose={closeDeleteModal}
              consumptionID={_id}
            />
          )}
        </div>
      </div>
    </>
  );
}
