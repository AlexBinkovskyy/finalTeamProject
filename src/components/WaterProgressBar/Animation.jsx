import css from './Animation.module.css';
import { IoWaterOutline } from 'react-icons/io5';
import { IoWater } from 'react-icons/io5';

const Animation = () => {
  return (
    <div>
      <IoWaterOutline className={css.water1} />
      <IoWaterOutline className={css.water2} />
      <IoWaterOutline className={css.water3} />
      <IoWater className={css.rain1} />
      <IoWater className={css.rain2} />
      <IoWater className={css.rain3} />
    </div>
  );
};

export default Animation;
