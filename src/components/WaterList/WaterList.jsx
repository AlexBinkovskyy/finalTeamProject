import css from './WaterList.module.css';

import WaterItem from '../../components/WaterItem/WaterItem';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { selectDayState } from '../../redux/water/selectors';
import { fetchDailyConsumption } from '../../redux/water/operations';

export default function WaterList({ selectedDate }) {
  const initialDay = format(selectedDate, 'dd.MM.yyyy');
  const waterList = useSelector(selectDayState);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDailyConsumption(initialDay));
  }, [dispatch, initialDay]);

  return (
    <>
      <ul className={css.waterList}>
        {waterList.map(water => (
          <li key={water._id} className={css.waterItem}>
            <WaterItem water={water} />
          </li>
        ))}
      </ul>
    </>
  );
}
