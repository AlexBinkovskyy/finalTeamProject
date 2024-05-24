import css from './WaterItem.module.css';
import { DeleteWaterModal } from '../../Modals/DeleteWaterModal/DeleteWaterModal';
import icons from '../../image/sprite.svg';
import { useState } from 'react';
import WaterModal from 'Modals/WaterModal/WaterModal';
import { useTranslation } from 'react-i18next';

export default function WaterItem({ water }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const { t } = useTranslation();

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

  const svgClass = !water._id ? css.iconDisabled : css.icon;
  const svgOnclickEdit = !water._id ? undefined : openEditModal;
  const svgOnclickDelete = !water._id ? undefined : openDeleteModal;

  return (
    <>
      <div className={css.card}>
        <svg className={css.waterIcon}>
          <use href={`${icons}#iconVector`}></use>
        </svg>

        <div className={css.data}>
          <p className={css.amount}>{water.amount}  {t('modals.ml')}</p>
          <p className={css.time}>{water.time}</p>
        </div>
        <div className={css.buttons}>
          <svg className={svgClass} onClick={svgOnclickEdit}>
            <use href={`${icons}#IconEdit2`}></use>
          </svg>
          <div>
            {modalIsOpen && (
              <WaterModal
                operationType={'edit'}
                defaultValues={water}
                isOpen={modalIsOpen}
                isClose={closeLogOutModal}
              />
            )}

            <svg className={svgClass} onClick={svgOnclickDelete}>
              <use href={`${icons}#IconTrash04`}></use>
            </svg>
            {deleteModalIsOpen && (
              <DeleteWaterModal
                isOpen={deleteModalIsOpen}
                isClose={closeDeleteModal}
                consumptionID={water._id}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
