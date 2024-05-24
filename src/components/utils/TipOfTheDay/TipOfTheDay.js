import { tipsEnglish } from 'components/utils/tips';
import { toast } from 'react-toastify';
import css from './TipOfTheDay.module.css';

export const TipOfTheDay = ( time = 5000 ) => {
  const isFirstVisit = localStorage.getItem('isFirstVisitTrackerPage');
  console.log(time);

  setTimeout(() => {
    notify(randomTip);
  }, time);

  if (!isFirstVisit) return;

  const currentTheme = localStorage.getItem('theme');

  const randomTip =
  tipsEnglish[Math.floor(Math.random() * tipsEnglish.length)];

  function notify(tip) {
    toast.info(tip, {
      className: `${css.customToast}`,
      theme: currentTheme,
    });
  }
};
