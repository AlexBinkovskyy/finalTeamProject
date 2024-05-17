// import css from './WaterDetailedInfo.module.css';

import UserPanel from 'components/UserPanel/UserPanel';
import DailyInfo from 'components/DailyInfo/DailyInfo';
import MonthInfo from 'components/MonthInfo/MonthInfo';
import css from './WaterDetailedInfo.module.css';

export default function WaterDetailedInfo() {
  return (
    <>
      <div className={css.WaterDetailedInfo}>
        <UserPanel />
        <DailyInfo />
        <MonthInfo />
      </div>
    </>
  );
}
