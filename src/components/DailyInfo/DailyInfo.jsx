// import css from './DailyInfo.module.css';

import AddWaterBtn from 'components/AddWaterBtn/AddWaterBtn';

export default function DailyInfo({ selectedDate }) {
  return <>{selectedDate?.toString()}</>;
}
