import { tipsEnglish, tipsUkrainian } from 'components/utils/tips';
import { toast } from 'react-toastify';
import css from './TipOfTheDay.module.css';

export const TipOfTheDay = (time = 5000) => {
  const isFirstVisit = localStorage.getItem('isFirstVisitTrackerPage');
  const customId = 'customID';

  const currentTheme = localStorage.getItem('theme');
  const tipsLanguage =
    localStorage.getItem('i18nextLng') === 'en' ? tipsEnglish : tipsUkrainian;

  const randomTip =
    tipsLanguage[Math.floor(Math.random() * tipsEnglish.length)];

  setTimeout(() => {
    notify(randomTip);
  }, time);

  if (!isFirstVisit) return;

  function notify(tip) {
    toast.info(tip, {
      className: `${css.customToast}`,
      theme: currentTheme,
      toastId: customId,
      autoClose: 2500,
    });
  }
};
