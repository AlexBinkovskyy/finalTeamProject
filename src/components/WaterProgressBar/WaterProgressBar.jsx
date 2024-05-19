import css from './WaterProgressBar.module.css';
import WaterProgressBarStyle from './WaterProgressBarStyle';
import {
  selectChosenDate,
  selectTodayTotal,
} from '../../redux/water/selectors.js';
import { selectGoal } from '../../redux/auth/selectors.js';
import { useSelector } from 'react-redux';
import { format, parse } from 'date-fns';

export default function WaterProgressBar() {
  const chosenDateStr = useSelector(selectChosenDate);
  const todayTotal = useSelector(selectTodayTotal);
  const goal = useSelector(selectGoal);

  if (!chosenDateStr || goal === undefined || goal === 0) {
    return null;
  }

  const chosenDate = parse(chosenDateStr, 'dd.MM.yyyy', new Date());
  const today = format(new Date(), 'd MMMM');
  const chosen = format(chosenDate, 'd MMMM');

  const progress = Math.min(todayTotal / goal, 1);

  const progressProcAll = progress * 100;

  const progressProc = Math.round(progressProcAll / 10) * 10;

  const procStyle = WaterProgressBarStyle({ progressProc });

  const progressProcStyle = {
    left: `calc(${progressProc}% + ${procStyle}%)`,
  };

  return (
    <div className={css.WaterProgressBar}>
      <div className={css.ProgressBar}>
        {chosen === today ? (
          <p className={css.text}>Today</p>
        ) : (
          <p className={css.text}>{chosen}</p>
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
      </div>
    </div>
  );
}
