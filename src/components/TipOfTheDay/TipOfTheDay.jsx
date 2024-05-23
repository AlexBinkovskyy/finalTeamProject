import { tipsUkrainian } from 'components/utils/tips';
// import { useEffect } from 'react';
import { toast } from 'react-toastify';
import css from './TipOfTheDay.module.css';

export const TipOfTheDay = ({ time = 7000 }) => {
  const isFirstVisit = localStorage.getItem('isFirstVisitTrackerPage');
  console.log(time);

  setTimeout(() => {
    notify(randomTip);
  }, time);

  if (!isFirstVisit) return;

  const currentTheme = localStorage.getItem('theme');

  const randomTip =
    tipsUkrainian[Math.floor(Math.random() * tipsUkrainian.length)];

  function notify(tip) {
    toast.info(tip, {
      className: `${css.customToast}`,
      theme: currentTheme,
    });
  }
};
