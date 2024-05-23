// import { tipsEnglish } from "components/utils/tips";
import { toast } from 'react-toastify';

export const TipOfTheDay = () => {
  const isFirstVisit = localStorage.getItem('isFirstVisitTrackerPage');
  if (!isFirstVisit) return;

  const notify = () =>
    toast.info(
      , {
      className: 'custom-toast',
    });

  setTimeout(() => {
    notify()
  }, 7000);
};
