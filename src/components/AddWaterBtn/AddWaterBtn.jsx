import { GoPlus } from 'react-icons/go';
import css from './AddWaterBtn.module.css';

export default function AddWaterBtn() {
  return (
    <>
      <button className={css.AddWaterBtn}>
        <div className={css.GoPlus}>
          <GoPlus className={css.icon} strokeWidth={1} />
        </div>
        <div>Add water</div>
      </button>
    </>
  );
}
