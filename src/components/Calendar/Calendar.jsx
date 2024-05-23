import { useDispatch } from 'react-redux';
import CalendarItem from '../CalendarItem/CalendarItem';
import css from './Calendar.module.css';
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns';
import { useEffect } from 'react';
import { fetchMonthlyConsumption } from '../../redux/water/operations';
import Statistics from 'components/Statistics/Statistics';
// import { selectMonth } from '../../redux/water/selectors';
// import { useSelector } from 'react-redux';

export const Calendar = ({ selectedDate, setSelectedDate, showCalendar }) => {
  console.log('Calendar - Test');

  const initialMonth = format(selectedDate, 'MM.yyyy');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMonthlyConsumption(initialMonth));
  }, [dispatch, initialMonth]);

  const getDaysInMonth = () => {
    const start = startOfMonth(selectedDate);
    const end = endOfMonth(selectedDate);
    const days = eachDayOfInterval({ start, end });
    return days;
  };
  // const testDays = eachDayOfInterval(
  //   startOfMonth(selectedDate),
  //   endOfMonth(selectedDate)
  // );

  // const incommingMonthConsumption = useSelector(selectMonth);
  // const monthConsumption = incommingMonthConsumption.map(el => {
  //   return {
  //     date: el.date,
  //     totalWater: el.totalWater,
  //   };
  // });
  // console.log(monthConsumption);
  // console.log(
  //   getDaysInMonth().map(el => {
  //     return el.toISOString();
  //   })
  // );

  return (
    <>
      {showCalendar ? (
        <ul className={css.calendar}>
          {getDaysInMonth().map(day => (
            <CalendarItem
              key={day.toISOString()}
              day={day}
              setSelectedDate={setSelectedDate}
            />
          ))}
        </ul>
      ) : (
        <Statistics />
      )}
    </>
  );
};

export default Calendar;
