import css from './WaterProgressBar.module.css';
import ProgressBar from '@atlaskit/progress-bar';

export default function WaterProgressBar() {
  const progressBar = 4;
  const progress = progressBar / 10;
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
        </div>
      </div>
    </>
  );
}
