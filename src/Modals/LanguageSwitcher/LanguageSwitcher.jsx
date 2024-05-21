import { useTranslation } from 'react-i18next';
import ComponentWithModal from '../Modal/Modal';
import css from './LanguageSwitcher.module.css';

export const LanguageSwitcher = ({ isOpen, isClose }) => {
  const { i18n } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <ComponentWithModal isOpen={isOpen} isClose={isClose}>
        <div className={css.modalOverlay}>
          <div className={css.buttonsContainer}>
            <button className={css.langBtn} onClick={() => changeLanguage('en')} >English</button>
            <button className={css.langBtn} onClick={() => changeLanguage('uk')}>Українська</button>
          </div>
        </div>
      </ComponentWithModal>
    </>
  );
};
