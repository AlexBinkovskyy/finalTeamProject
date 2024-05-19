import css from './ChooseDate.module.css';
import { format } from 'date-fns';

export default function ChooseDate({ selectedDate }) {
  const todayDate = format(new Date(), 'd MMMM');
  const incommingDate = format(selectedDate, 'd MMMM');

  return (
    <>
      <div>
        {incommingDate === todayDate ? (
          <h3 className={css.date}>Today</h3>
        ) : (
          <h3 className={css.date}>{incommingDate}</h3>
        )}
      </div>
    </>
  );
}
