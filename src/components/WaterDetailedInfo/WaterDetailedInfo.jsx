import UserPanel from 'components/UserPanel/UserPanel';

// import css from './WaterDetailedInfo.module.css';

import DailyInfo from 'components/DailyInfo/DailyInfo';
import MonthInfo from 'components/MonthInfo/MonthInfo';

export default function WaterDetailedInfo() {
  return (
    <>
      <UserPanel />
      <DailyInfo />
      <MonthInfo />
    </>
  );
}
