import React, { useEffect, useState } from 'react';
import CalendarPagination from '../CalendarPagination/CalendarPagination';
import css from './MonthInfo.module.css';
import Calendar from '../Calendar/Calendar';
import IconPieChart from '../../image/sprite.svg';
import { format } from 'date-fns';
import axios from 'axios';
import DailyInfo from 'components/DailyInfo/DailyInfo';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMonthlyConsumption } from '../../redux/water/operations';
import { selectMonth } from '../../redux/water/selectors';

const getMounth = async mounth => {
  const response = await axios.get(`/water/monthconsumption/${mounth}`);
  return response.data;
};

export default function MonthInfo() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const initialMonth = format(selectedDate, 'MM.yyyy');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMonthlyConsumption(initialMonth));
  }, [initialMonth]);

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <div className={css.monthInfo}>
      <DailyInfo selectedDate={selectedDate} />
      <div className={css.monthInfo__wrapper}>
        <h1 className={css.title}>Month</h1>
        <div className={css.paginationIcon__wrapper}>
          <CalendarPagination
            currentDate={selectedDate}
            setCurrentDate={setSelectedDate}
          />
          <svg className={css.icon}>
            <use href={`${IconPieChart}#IconPieChart02`}></use>
          </svg>
        </div>
      </div>
      <Calendar
        selectedDate={selectedDate}
        setSelectedDate={handleDateChange}
      />
    </div>
  );
}

// ('https://finalteamproject-backend.onrender.com/api/water/monthconsumption/05.2024');
// https://finalteamproject-backend.onrender.com/api/water/monthconsumption/05.2024
