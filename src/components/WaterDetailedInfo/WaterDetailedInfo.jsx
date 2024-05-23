import UserPanel from 'components/UserPanel/UserPanel';
import DailyInfo from 'components/DailyInfo/DailyInfo';
import MonthInfo from 'components/MonthInfo/MonthInfo';
import css from './WaterDetailedInfo.module.css';
import { useState } from 'react';

export default function WaterDetailedInfo() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  console.log('WaterDetailedInfo - Test');

  return (
    <>
      <div className={css.WaterDetailedInfo}>
        <UserPanel />
        <DailyInfo selectedDate={selectedDate} />
        <MonthInfo
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </>
  );
}
