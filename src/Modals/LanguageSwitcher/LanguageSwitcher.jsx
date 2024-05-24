import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import ComponentWithModal from '../Modal/Modal';
import css from './LanguageSwitcher.module.css';
import LanguageSwitcherUnique from './LanguageSwitcherUnique/LanguageSwitcherUnique';
import iconUkraine from '../../image/flag/flag-ukraine.svg';
import iconKingdom from '../../image/flag/flag-kingdom.svg';

export const LanguageSwitcher = ({ isOpen, isClose }) => {
  const { i18n } = useTranslation();
  const [activeLanguage, setActiveLanguage] = useState(i18n.language);

  useEffect(() => {
    const changeFont = lng => {
      if (lng === 'uk') {
        document.body.style.fontFamily = 'Montserrat, sans-serif';
      } else {
        document.body.style.fontFamily = 'Poppins, sans-serif';
      }
      setActiveLanguage(lng);
    };

    changeFont(i18n.language);

    i18n.on('languageChanged', changeFont);

    return () => {
      i18n.off('languageChanged', changeFont);
    };
  }, [i18n]);

  const handleLanguageChange = lng => {
    i18n.changeLanguage(lng);
  };

  return (
    <ComponentWithModal isOpen={isOpen} isClose={isClose}>
      <div className={css.modalOverlay}>
        <div className={css.buttonsContainer}>
          <h3 className={css.title}>Choose your preferred language:</h3>

          <div className={css.flagContainer}>
            <img
              className={`${css.flag} ${
                activeLanguage === 'en' ? css.active : css.inactive
              }`}
              src={iconKingdom}
              alt="Kingdom"
              width="48"
              height="48"
              onClick={() => handleLanguageChange('en')}
            />
            <LanguageSwitcherUnique />
            <img
              className={`${css.flag} ${
                activeLanguage === 'uk' ? css.active : css.inactive
              }`}
              src={iconUkraine}
              alt="Ukraine"
              width="48"
              height="48"
              onClick={() => handleLanguageChange('uk')}
            />
          </div>
        </div>
      </div>
    </ComponentWithModal>
  );
};
