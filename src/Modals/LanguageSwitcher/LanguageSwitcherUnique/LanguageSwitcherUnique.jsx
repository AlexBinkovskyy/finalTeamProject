import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcherUnique.css';

const LanguageSwitcherUnique = () => {
  const { i18n } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  const handleCheckboxChange = () => {
    if (i18n.language === 'en') {
      changeLanguage('uk');
    } else {
      changeLanguage('en');
    }
  };

  return (
    <div className="switch-container">
      <label className="switch">
        <input
          className="switch__input"
          type="checkbox"
          role="switch"
          onChange={handleCheckboxChange}
          checked={i18n.language === 'uk'}
        />
        <span className="switch__sr">Switch Language</span>
      </label>
    </div>
  );
};

export default LanguageSwitcherUnique;
