import css from './WaterDailyNorma.module.css';
import { selectGoal } from '../../redux/auth/selectors';
import { useSelector } from 'react-redux';

export default function WaterDailyNorma() {
  const dailyNorma = useSelector(selectGoal);

  return (
    <>
      <div className={css.WaterDailyNorma}>
        <p className={css.norma}>{dailyNorma} L</p>
        <p className={css.text}>My daily norma</p>
      </div>
    </>
  );
}
