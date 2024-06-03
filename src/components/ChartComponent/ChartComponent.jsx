import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { useTranslation } from 'react-i18next';
import getBmiResult from 'components/utils/getBmiResult ';
import getColorClass from 'components/utils/getColorClassForBmi';
import css from './ChartComponent.module.css';

const ChartComponent = ({ bmiValue }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [offsetYPercent, setOffsetYPercent] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      let offsetYPercent;
      if (width <= 320) {
        offsetYPercent = 67;
      } else if (width <= 768) {
        offsetYPercent = 65;
      } else if (width <= 1440) {
        offsetYPercent = 57;
      } else {
        offsetYPercent = 57;
      }

      setOffsetYPercent(offsetYPercent);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');

    chartInstanceRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [
          `${t('BMI.MildThinness')} (16-18.5)`,
          `${t('BMI.Normal')} (18.5-25)`,
          `${t('BMI.Overweight')} (25-40)`,
        ],
        datasets: [
          {
            data: [1, 1, 1],
            backgroundColor: [
              'rgba(0, 0, 255, 0.5)',
              'rgba(0, 255, 0, 0.5)',
              'rgba(255, 0, 0, 0.5)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        cutout: '50%',
        rotation: -90,
        circumference: 180,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
        },
        animation: false,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
        maintainAspectRatio: true,
      },
    });

    const drawNeedle = (chart, needleValue) => {
      const ctx = chart.ctx;
      let centerX =
        chart.chartArea.left +
        (chart.chartArea.right - chart.chartArea.left) / 2;
      let centerY =
        chart.chartArea.top +
        (chart.chartArea.bottom - chart.chartArea.top) / 2;
      const radius = Math.min(centerX, centerY);
      const needleLength = radius * 0.8;
      const baseWidth = 40;
      let angle = 0;

      centerY += radius * (offsetYPercent / 100);

      if (needleValue < 18.5) {
        angle = -Math.PI / 2 + ((needleValue / 18.5) * Math.PI) / 3;
      } else if (needleValue < 25) {
        angle =
          -Math.PI / 6 + (((needleValue - 18.5) / (25 - 18.5)) * Math.PI) / 3;
      } else if (needleValue <= 40) {
        angle = Math.PI / 6 + (((needleValue - 25) / (40 - 25)) * Math.PI) / 3;
      } else {
        angle = Math.PI / 2;
      }

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle);

      ctx.beginPath();
      ctx.moveTo(-baseWidth / 2, 0);
      ctx.lineTo(baseWidth / 2, 0);
      ctx.lineTo(0, -needleLength);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.restore();
    };

    drawNeedle(chartInstanceRef.current, bmiValue);
  }, [bmiValue, offsetYPercent, t]);

  const bmiColorClass = getColorClass(parseFloat(bmiValue));

  return (
    <div className={css.chartWrapper}>
      <canvas className={css.chartCanvas} ref={chartRef} />
      <p className={`${css.indexMessage} ${css[bmiColorClass]}`}>
        {bmiValue} - {getBmiResult(bmiValue)}
      </p>
    </div>
  );
};

export default ChartComponent;
