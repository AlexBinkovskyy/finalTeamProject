import css from './WaterDailyNorma.module.css';
import { selectDailyNorma } from '../../redux/auth/selectors';
import { useSelector } from 'react-redux';

export default function WaterDailyNorma() {
  const dailyNorma = useSelector(selectDailyNorma);
  const dailyNormaInLiters = (dailyNorma / 1000).toFixed(1);

  return (
    <>
      <div className={css.WaterDailyNorma}>
        <p className={css.norma}>{dailyNormaInLiters} L</p>
        <p className={css.text}>My daily norma</p>
      </div>
    </>
  );
}
