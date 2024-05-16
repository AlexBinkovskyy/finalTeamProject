import css from './WaterProgressBar.module.css';
import WaterProgressBarStyle from './WaterProgressBarStyle';
import { selectChosenDate } from '../../redux/water/selectors';
import { useSelector } from 'react-redux';
import { format, parse } from 'date-fns';

export default function WaterProgressBar() {
  const chosenDateStr = useSelector(selectChosenDate);
  if (!chosenDateStr) {
    return null;
  }
  const chosenDate = parse(chosenDateStr, 'dd.MM.yyyy', new Date());
  const today = format(new Date(), 'd MMMM');
  const chosen = format(chosenDate, 'd MMMM');
  let progressBar = 8;
  let progress = Math.round(progressBar) / 10;
  progress = Math.min(progress, 1);
  const progressProc = progress * 100;
  const procStyle = WaterProgressBarStyle({ progress });

  const progressProcStyle = {
    left: `calc(${progressProc}% + ${procStyle}%)`,
  };

  return (
    <>
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
          {progress !== 0 && progress !== 0.5 && progress !== 1 && (
            <p className={css.progressProc} style={progressProcStyle}>
              {progressProc}%
            </p>
          )}
        </div>
      </div>
    </>
  );
}
