import css from './WaterProgressBar.module.css';
import ProgressBar from '@atlaskit/progress-bar';

export default function WaterProgressBar() {
  const progressBar = 3;
  const progress = Math.round(progressBar) / 10;
  const progressProc = progress * 100;
  let procStyle;
  if (progress === 0.1 || progress === 0.2) {
    procStyle = 2;
  } else if (progress === 0.4) {
    if (window.matchMedia('(min-width: 768px)').matches) {
      procStyle = -1.5;
    } else {
      procStyle = -4;
    }
  } else if (progress === 0.6 || progress === 0.7) {
    procStyle = -4;
  } else if (progress === 0.8) {
    procStyle = -7;
  } else if (progress === 0.9) {
    if (window.matchMedia('(min-width: 768px)').matches) {
      procStyle = -12;
    } else {
      procStyle = -15;
    }
  } else {
    procStyle = 1;
  }
  const notProgressProc = progress === 0 || progress === 0.5 || progress === 1;

  const progressProcStyle = {
    left: `calc(${progressProc}% + ${procStyle}%)`,
  };

  return (
    <>
      <div className={css.WaterProgressBar}>
        <div className={css.ProgressBar}>
          <p className={css.text}>Today</p>
          <ProgressBar
            appearance="success"
            ariaLabel={`"Done: ${progressBar} of 10 issues"`}
            value={`${progress}`}
          />
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
          {!notProgressProc && (
            <p className={css.progressProc} style={progressProcStyle}>
              {progressProc}%
            </p>
          )}
        </div>
      </div>
    </>
  );
}
