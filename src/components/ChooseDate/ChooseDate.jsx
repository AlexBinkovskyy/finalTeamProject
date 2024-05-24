import css from './ChooseDate.module.css';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

export default function ChooseDate({ selectedDate }) {
  const todayDate = format(new Date(), 'd MMMM');
  const incommingDate = format(selectedDate, 'd MMMM');
  const { t } = useTranslation();

  return (
    <>
      <div>
        {incommingDate === todayDate ? (
          <h3 className={css.date}>{t('chooseDate.today')}</h3>
        ) : (
          <h3 className={css.date}>{incommingDate}</h3>
        )}
      </div>
    </>
  );
}
