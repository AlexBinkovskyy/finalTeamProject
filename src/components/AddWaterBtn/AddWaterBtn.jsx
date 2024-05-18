import { useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { WaterModal } from '../../Modals/WaterModal/WaterModal';
import css from './AddWaterBtn.module.css';

export default function AddWaterBtn({ selectedDay = new Date() }) {
  const [waterModalIsOpen, setwaterModalIsOpen] = useState(false);
  const [operationType, setOperationType] = useState('');

  const openWaterModal = () => {
    setwaterModalIsOpen(true);
    setOperationType('add');
    document.body.style.overflow = 'hidden';
  };

  const closeWaterModal = () => {
    setwaterModalIsOpen(false);
    setOperationType('');
    document.body.style.overflow = '';
  };

  const onSubmit = values => {
    console.log(values);
  };

  return (
    <>
      <button
        className={css.AddWaterBtn}
        data-tut="reactour__waterbtn"
        onClick={openWaterModal}
      >
        <div className={css.GoPlus}>
          <GoPlus className={css.icon} strokeWidth={1} />
        </div>
        <div>Add water</div>
      </button>
      {waterModalIsOpen && (
        <WaterModal
          onSubmit={onSubmit}
          operationType={operationType}
          isOpen={waterModalIsOpen}
          isClose={closeWaterModal}
        />
      )}
    </>
  );
}
