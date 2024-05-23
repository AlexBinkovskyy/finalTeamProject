import { tipsUkrainian } from 'components/utils/tips';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const TipOfTheDay = () => {
  const isFirstVisit = localStorage.getItem('isFirstVisitTrackerPage');
  
  
  useEffect(() => {
    setTimeout(() => {
      notify(randomTip);
    }, 7000);
  },[]);
  
  if (!isFirstVisit) return;

  const currentTheme = localStorage.getItem('theme');

  const randomTip =
    tipsUkrainian[Math.floor(Math.random() * tipsUkrainian.length)];

  const notify = tip =>
    toast.info(tip, {
      className: 'custom-toast',
      theme: currentTheme,
    });


};
