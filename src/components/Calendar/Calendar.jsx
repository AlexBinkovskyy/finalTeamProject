import { useDispatch, useSelector } from 'react-redux';
import CalendarItem from '../CalendarItem/CalendarItem';
import css from './Calendar.module.css';
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns';
import { useEffect } from 'react';
import { fetchMonthlyConsumption } from '../../redux/water/operations';
import Statistics from 'components/Statistics/Statistics';
import { selectMonth } from '../../redux/water/selectors';

export const Calendar = ({ selectedDate, setSelectedDate, showCalendar }) => {
  console.log('Calendar - Test');

  const initialMonth = format(selectedDate, 'MM.yyyy');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMonthlyConsumption(initialMonth));
  }, [dispatch, initialMonth]);

  const monthData = useSelector(selectMonth);

  const getDaysInMonth = () => {
    const start = startOfMonth(selectedDate);
    const end = endOfMonth(selectedDate);
    const days = eachDayOfInterval({ start, end });
    return days;
  };

  return (
    <>
      {showCalendar ? (
        <ul className={css.calendar}>
          {getDaysInMonth().map(day => (
            <li key={day.toISOString()}>
              <CalendarItem
                day={day}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                dayWaterMonth={monthData}
              />
            </li>
          ))}
        </ul>
      ) : (
        <Statistics data={monthData} />
      )}
    </>
  );
};

export default Calendar;
