// Statistics.js
import React from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
} from 'recharts';
import css from './Statistics.module.css';
import { useSelector } from 'react-redux';
import { selectMonth } from '../../redux/water/selectors';

const Statistics = () => {
  const data = useSelector(selectMonth);

  const dataCurrent = data.map(el => {
    return {
      Water: el.totalWater,
      date: el.date,
    };
  });

  const sortedData = [...dataCurrent].sort((a, b) => {
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

  const formattedData = sortedData.map(el => ({
    Water: el.Water,
    date: el.date.split('.')[0],
  }));

  const gradientId = 'waterGradient';

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={css.customTooltip}>
          <p className={css.water}>{`Water: ${payload[0].value}`}</p>
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
  return (
    <div className={css.statistics}>
      <AreaChart
        width={730}
        height={350}
        data={formattedData}
        margin={{
          top: 10,
          right: 10,
          bottom: 10,
          left: 10,
        }}
      >
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
          stroke=""
        />
        <YAxis
          padding={{ top: 20, bottom: 20 }}
          tickSize={false}
          tickLine={false}
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
    </div>
  );
};

export default Statistics;
