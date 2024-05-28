import css from './WaterList.module.css';

import WaterItem from '../../components/WaterItem/WaterItem';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { selectDayState, selectTodayTotal } from '../../redux/water/selectors';
import { fetchDailyConsumption } from '../../redux/water/operations';

export default function WaterList({ selectedDate }) {
  const initialDay = format(selectedDate, 'dd.MM.yyyy');
  const waterList = useSelector(selectDayState);
  const init = useSelector(selectTodayTotal);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDailyConsumption(initialDay));
  }, [dispatch, initialDay, init]);

  const placeholderWater = {
    amount: '250',
    time: '12:00',
    // _id: 'placeholderWater',
  };

  return (
    <div className={css.waterListWrapper}>
      {!waterList.length ? (
        <div
          key={'placeholderWater'}
          className={`${css.placeholder} ${css.waterItem}`}
          data-tut="reactour__waterlist"
        >
          <WaterItem water={placeholderWater} />
        </div>
      ) : (
        <ul className={css.waterList}>
          {waterList.map(water => (
            <li key={water._id} className={css.waterItem}>
              <WaterItem water={water} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
