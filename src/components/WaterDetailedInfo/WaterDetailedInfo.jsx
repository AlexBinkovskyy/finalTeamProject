// import css from './WaterDetailedInfo.module.css';

import UserPanel from 'components/UserPanel/UserPanel';
import DailyInfo from 'components/DailyInfo/DailyInfo';
import MonthInfo from 'components/MonthInfo/MonthInfo';

export default function WaterDetailedInfo() {
  return (
    <>
    <div style={{ display: 'flex', flexDirection:'column', justifyContent: "space-around"}}>
      <UserPanel />
      <DailyInfo />
      <MonthInfo />
      </div>
    </>
  );
}
