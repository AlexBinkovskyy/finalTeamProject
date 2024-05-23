import { useState } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
  ResponsiveContainer,
} from 'recharts';
import css from './Statistics.module.css';
import { format, subDays, isAfter } from 'date-fns';

const Statistics = ({ data }) => {
  const [daysRange, setDaysRange] = useState(7);
  const today = new Date();

  const filteredData = data.filter(el => {
    const dataDate = parseDate(el.date);
    return isAfter(dataDate, subDays(today, daysRange - 1));
  });

  const formattedChartData = formatDataForChart(filteredData);

  function formatDataForChart(data) {
    const formattedData = [];

    const possibleDates = [];
    for (let i = daysRange - 1; i >= 0; i--) {
      possibleDates.push(format(subDays(today, i), 'dd.MM.yyyy'));
    }

    possibleDates.forEach(date => {
      const foundData = data.find(el => el.date === date);
      if (foundData) {
        formattedData.push({
          Water: foundData.totalWater,
          date: format(parseDate(foundData.date), 'dd'),
        });
      } else {
        formattedData.push({
          Water: 0,
          date: date.split('.')[0],
        });
      }
    });

    return formattedData;
  }
  const allDates = [...new Set(data.map(el => el.date.split('.')[0]))];

  const filledData = allDates.map(date => {
    const existingData = data.find(el => el.date === date);
    return {
      date,
      Water: existingData ? existingData.totalWater : 0,
    };
  });

  filledData.sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateA - dateB;
  });

  function parseDate(dateString) {
    const parts = dateString.split('.');
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    return new Date(`${year}-${month}-${day}`);
  }
  const gradientId = 'waterGradient';

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={css.customTooltip}>
          <p className={css.water}>{`Water: ${payload[0].value}ml`}</p>
        </div>
      );
    }
    return null;
  };
  const formatYAxis = tickItem => {
    if (tickItem === 0) {
      return '0%';
    }
    const valueInLiters = tickItem / 1000;
    return `${valueInLiters}L`;
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('7 days');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = value => {
    setSelectedOption(`${value} days`);
    setDaysRange(value);
    setIsOpen(false);
  };

  return (
    <div className={css.statistics}>
      <div className={css.controls}>
        <label className={css.label} htmlFor="daysRange">
          Select days range:
        </label>
        <div className={css.customSelectWrapper}>
          <div className={css.customSelect} onClick={toggleDropdown}>
            <span>{selectedOption}</span>
            <div
              className={`${css.arrow} ${isOpen ? css.arrowOpen : ''}`}
            ></div>
          </div>
          {isOpen && (
            <div className={css.customOptions}>
              <div className={css.customOption} onClick={() => selectOption(7)}>
                7 days
              </div>
              <div
                className={css.customOption}
                onClick={() => selectOption(14)}
              >
                14 days
              </div>
              <div
                className={css.customOption}
                onClick={() => selectOption(30)}
              >
                30 days
              </div>
            </div>
          )}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={formattedChartData}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9BE1A0" stopOpacity={1} />
              <stop offset="100%" stopColor="#9BE1A0" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3" stroke="none" />
          <XAxis
            dataKey="date"
            padding={{ left: 20, right: 20 }}
            tickSize={false}
            tickLine={false}
            tick={{ fill: 'var(--main-text-color)' }}
            stroke=""
          />
          <YAxis
            padding={{ top: 20, bottom: 20 }}
            tickSize={false}
            tickLine={false}
            tick={{ fill: 'var(--main-text-color)' }}
            stroke=""
            tickFormatter={formatYAxis}
          />
          <Area
            dataKey="Water"
            dot={{
              stroke: '#87D28D',
              strokeWidth: 3,
              r: 9,
              fill: '#fff',
              fillOpacity: '1',
            }}
            stroke="#87D28D"
            strokeWidth={3}
            fill={`url(#${gradientId})`}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: '' }}
            position={{ y: 10 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Statistics;
