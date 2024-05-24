import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcherUnique.css';
import { toast } from 'react-toastify';

const LanguageSwitcherUnique = ({ isClose }) => {
  const { i18n } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
    isClose();
    toast.success(
      lng === 'en'
        ? 'Language changed to English'
        : 'Мова змінена на Українську'
    );
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
