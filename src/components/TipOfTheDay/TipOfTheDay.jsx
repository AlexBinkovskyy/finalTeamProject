// import { tipsEnglish } from "components/utils/tips";
import { toast } from 'react-toastify';

export const TipOfTheDay = () => {
  const isFirstVisit = localStorage.getItem('isFirstVisitTrackerPage');
  if (!isFirstVisit) return;

  setTimeout(() => {
    toast.info('kajsdhkjadhskasd'< {
        
    });
  }, 7000);
};
