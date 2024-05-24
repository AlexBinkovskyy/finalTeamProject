import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ComponentWithModal from '../Modal/Modal';
import css from './LanguageSwitcher.module.css';
import LanguageSwitcherUnique from './LanguageSwitcherUnique/LanguageSwitcherUnique';
import iconUkraine from '../../image/flag/flag-ukraine.svg';
import iconKingdom from '../../image/flag/flag-kingdom.svg';

export const LanguageSwitcher = ({ isOpen, isClose }) => {
  const { i18n } = useTranslation();
  const [activeLanguage, setActiveLanguage] = useState(i18n.language);
    localStorage.setItem('i18nextLng', lng);
    isClose();
    toast.success(
      ` ${
        lng === 'en'
          ? 'Language changed to English'
          : 'Мова змінена на Українську'
      }`
    );

  useEffect(() => {
    const changeFont = lng => {
    const changeFont = lng => {
      const root = document.documentElement;

      if (lng === 'uk') {
        document.body.style.fontFamily = 'Montserrat, sans-serif';
        root.style.setProperty('--font-bold', 'Montserrat-Bold');
        root.style.setProperty('--font-regular', 'Montserrat-Regular');
      } else {
        document.body.style.fontFamily = 'Poppins, sans-serif';
        root.style.setProperty('--font-bold', 'Poppins-Bold');
        root.style.setProperty('--font-regular', 'Poppins-Regular');
      }
      setActiveLanguage(lng);
    };

    changeFont(i18n.language);

    i18n.on('languageChanged', changeFont);

    return () => {
      i18n.off('languageChanged', changeFont);
    };
  }, [i18n]);

  return (
    <>
      <ComponentWithModal isOpen={isOpen} isClose={isClose}>
        <div className={css.modalOverlay}>
          <div className={css.buttonsContainer}>
            <button
              className={css.langBtn}
              onClick={() => changeLanguage('en')}
            >
              English
            </button>
            <button
              className={css.langBtn}
              onClick={() => changeLanguage('uk')}
            >
              Українська
            </button>
          </div>
        </div>
      </ComponentWithModal>
    </>
  );
};
