import css from './AddWaterBtn.module.css';
import { ReactComponent as IconEdit2 } from '../';
export default function AddWaterBtn() {
  return (
    <>
      <IconEdit2 />
      <button className={css.test}>test</button>
    </>
  );
}
