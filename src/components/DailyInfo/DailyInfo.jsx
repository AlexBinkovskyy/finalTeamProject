// import css from './DailyInfo.module.css';

// import AddWaterBtn from 'components/AddWaterBtn/AddWaterBtn';

import { format } from 'date-fns';

export default function DailyInfo({ selectedDate }) {
  if (!selectedDate) {
    return null;
  }

  const formattedDate = format(selectedDate, 'd MMMM');

  return (
    <>
      <div>{formattedDate}</div>
    </>
  );
}
