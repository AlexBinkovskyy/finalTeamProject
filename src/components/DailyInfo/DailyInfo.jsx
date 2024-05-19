import css from './DailyInfo.module.css';

import AddWaterBtn from 'components/AddWaterBtn/AddWaterBtn';
import WaterList from 'components/WaterList/WaterList';
import ChooseDate from 'components/ChooseDate/ChooseDate';

export default function DailyInfo({ selectedDate }) {
  if (!selectedDate) {
    return null;
  }

  return (
    <>
      <div className={css.dailyInfo}>
        <div className={css.header}>
          <ChooseDate selectedDate={selectedDate} />
          <AddWaterBtn />
        </div>
        <WaterList selectedDate={selectedDate} />
      </div>
    </>
  );
}
