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

  const placeholderWater = { amount: '250', time: '12:00', _id: '' };

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
