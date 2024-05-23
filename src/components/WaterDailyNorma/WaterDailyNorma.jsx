import css from './WaterDailyNorma.module.css';
import { selectGoal } from '../../redux/auth/selectors';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function WaterDailyNorma() {
  const goal = useSelector(selectGoal);
  const { t } = useTranslation();
  const dailyNorma = Math.round((goal / 1000) * 10) / 10;

  return (
    <>
      <div className={css.WaterDailyNorma}>
        <p className={css.norma}>{dailyNorma} L</p>
        <p className={css.text}>{t('waterDailyNorma.dailyNorma')}</p>
      </div>
    </>
  );
}
