// import css from './DailyInfo.module.css';

// import AddWaterBtn from 'components/AddWaterBtn/AddWaterBtn';

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
      {incommingDate === todayDate ? <h3>Today</h3> : <h3>{incommingDate}</h3>}
      <WaterList selectedDate={selectedDate} />
    </>
  );
}
