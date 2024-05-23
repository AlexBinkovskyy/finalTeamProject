import css from './DailyInfo.module.css';
import WaterList from 'components/WaterList/WaterList';
import ChooseDate from 'components/ChooseDate/ChooseDate';
import AddWaterBtn from 'components/AddWaterBtn/AddWaterBtn';

export default function DailyInfo({ selectedDate }) {
  if (!selectedDate) {
    return null;
  }
  return (
    <>
      <div className={css.dailyInfo}>
        <div className={css.header}>
          <ChooseDate selectedDate={selectedDate} />
          <AddWaterBtn color="white" />
        </div>
        <WaterList selectedDate={selectedDate} />
      </div>
    </>
  );
}
