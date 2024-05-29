import css from './WaterProgressBar.module.css';
import WaterProgressBarStyle from './WaterProgressBarStyle';
import {
  selectChosenDate,
  selectTodayTotal,
} from '../../redux/water/selectors.js';
import { selectGoal } from '../../redux/auth/selectors.js';
import { useSelector } from 'react-redux';
import { format, parse } from 'date-fns';
import { useTranslation } from 'react-i18next';
import Animation from './Animation';

export default function WaterProgressBar() {
  const chosenDateStr = useSelector(selectChosenDate);
  const todayTotal = useSelector(selectTodayTotal);
  const goal = useSelector(selectGoal);

  const todayTotalLitr = Math.round((todayTotal / 1000) * 10) / 10;
  const { t } = useTranslation();

  if (!chosenDateStr || goal === undefined || goal === 0) {
    return null;
  }

  const chosenDate = parse(chosenDateStr, 'dd.MM.yyyy', new Date());
  const today = format(new Date(), 'dd.MM.yyyy');
  const date = new Date(chosenDate);

  const progress = Math.min(todayTotal / goal, 1);
  const progressProc = Math.floor(progress * 10) * 10;
  const procStyle = WaterProgressBarStyle({ progressProc });
  const progressProcStyle = {
    left: `calc(${progressProc}% + ${procStyle}%)`,
  };

  return (
    <div className={css.WaterProgressBar}>
      <div className={css.ProgressBar} data-tut="reactour__waterprogress">
        {chosenDateStr === today ? (
          <p className={css.text}>
            {t('waterDailyNorma.today')}
            <span className={css.todayTotalLitr}> {todayTotalLitr}L</span>
          </p>
        ) : (
          <p className={css.text}>
            {t('chooseDate.chosen', { date })}
            <span className={css.todayTotalLitr}> {todayTotalLitr}L</span>
          </p>
        )}
        <div className={css.Progress}>
          <div className={css.ProgressAll}>
            <div
              className={css.ProgressResult}
              style={{
                width: `${progressProc}%`,
              }}
            ></div>
          </div>
        </div>
        <div className={css.number}>
          <div>
            <p>0%</p>
          </div>
          <div>
            <p>50%</p>
          </div>
          <div>
            <p>100%</p>
          </div>
        </div>
        {progressProc !== 0 && progressProc !== 50 && progressProc !== 100 && (
          <p className={css.progressProc} style={progressProcStyle}>
            {progressProc}%
          </p>
        )}
        <div className={css.animationContainer}>
          {progressProc === 100 && <Animation />}
        </div>
      </div>
    </div>
  );
}
