import AddWaterBtn from 'components/AddWaterBtn/AddWaterBtn';
import css from './DailyInfo.module.css';
import WaterList from 'components/WaterList/WaterList';
import { format } from 'date-fns';

export default function DailyInfo({ selectedDate }) {
  if (!selectedDate) {
    return null;
  }
  const todayDate = format(new Date(), 'd MMMM');
  const incommingDate = format(selectedDate, 'd MMMM');

  return (
    <>
      <div className={css.dailyInfo}>
        <div className={css.header}>
          {incommingDate === todayDate ? (
            <h3 className={css.date}>Today</h3>
          ) : (
            <h3 className={css.date}>{incommingDate}</h3>
          )}
          <AddWaterBtn />
        </div>
        <WaterList selectedDate={selectedDate} />
      </div>
    </>
  );
}
