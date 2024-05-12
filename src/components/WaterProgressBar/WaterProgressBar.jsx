import css from './WaterProgressBar.module.css';
import ProgressBar from '@atlaskit/progress-bar';
import WaterProgressBarStyle from './WaterProgressBarStyle';

export default function WaterProgressBar() {
  let progressBar = 2;
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
          <p className={css.text}>Today</p>
          <div className={css.Progress}>
            <ProgressBar
              appearance="success"
              ariaLabel={`"Done: ${progressBar} of 10 issues"`}
              value={`${progress}`}
            />
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
