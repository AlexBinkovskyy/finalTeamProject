import { useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { WaterModal } from '../../Modals/WaterModal/WaterModal';
import { selectChosenDate } from '../../redux/water/selectors';
import css from './AddWaterBtn.module.css';
import { useSelector } from 'react-redux';

export default function AddWaterBtn({ selectedDay = new Date() }) {
  const [waterModalIsOpen, setwaterModalIsOpen] = useState(false);
  const [operationType, setOperationType] = useState('');

  const chosenDate = useSelector(selectChosenDate);

  function getCurrentDateFormatted() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}.${month}.${year}`;
  }

  const currentDateFormatted = getCurrentDateFormatted();

  const openWaterModal = () => {
    if (chosenDate <= currentDateFormatted) {
      setwaterModalIsOpen(true);
      setOperationType('add');
      document.body.style.overflow = 'hidden';
    }
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
