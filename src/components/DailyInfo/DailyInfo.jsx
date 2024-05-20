import css from './DailyInfo.module.css';
import AddWaterBtnToday from 'components/AddWaterBtnToday/AddWaterBtnToday';
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
          <AddWaterBtnToday/>
        </div>
        <WaterList selectedDate={selectedDate} />
      </div>
    </>
  );
}
