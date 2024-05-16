import css from './WaterDailyNorma.module.css';
import { selectGoal } from '../../redux/auth/selectors';
import { useSelector } from 'react-redux';

export default function WaterDailyNorma() {
  const goal = useSelector(selectGoal);
  const dailyNorma = Math.round((goal / 1000) * 10) / 10;

  return (
    <>
      <div className={css.WaterDailyNorma}>
        <p className={css.norma}>{dailyNorma} L</p>
        <p className={css.text}>My daily norma</p>
      </div>
    </>
  );
}
