import React, { useState, useEffect, useRef } from 'react';
import UserSettingsModal from '../../Modals/UserSettingsModal/UserSettingsModal';
import BmiModal from 'Modals/BmiModal/BmiModal';
import { LogOutModal } from '../../Modals/LogOutModal/LogOutModal';
import css from './UserBarPopover.module.css';
import IconSprite from '../../image/sprite.svg';
import {LanguageSwitcher} from 'Modals/LanguageSwitcher/LanguageSwitcher';

export default function UserBarPopover({ popoverOpen, setPopoverOpen }) {
  const [settingModalIsOpen, setSettingModalIsOpen] = useState(false);
  const [bMIModalIsOpen, setBMIModalIsOpen] = useState(false);
  const [logOutlIsOpen, setlogOutModalIsOpen] = useState(false);
  const [languageSwitcherIsOpen, setlanguagesSwitcherModalIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setPopoverOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef, setPopoverOpen]);

  const openSettingModal = () => {
    setPopoverOpen(false);
    setSettingModalIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeSettingModal = () => {
    setSettingModalIsOpen(false);
    document.body.style.overflow = '';
  };

  const openBMIModal = () => {
    setPopoverOpen(false);
    setBMIModalIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeBMIModal = () => {
    setBMIModalIsOpen(false);
    document.body.style.overflow = '';
  };

  const openLogOutModal = () => {
    setPopoverOpen(false);
    setlogOutModalIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLogOutModal = () => {
    setlogOutModalIsOpen(false);
    document.body.style.overflow = '';
  };

  const openLanguageSwitcher = () => {
    setPopoverOpen(false);
    setlanguagesSwitcherModalIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLanguageSwitcher = () => {
    setlanguagesSwitcherModalIsOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <div
      className={
        popoverOpen
          ? `${css.wrapper} ${css.open}`
          : `${css.wrapper} ${css.closed}`
      }
      ref={wrapperRef}
    >
      <ul className={css.list}>
        <li className={css.listItem} onClick={openSettingModal}>
          <svg className={css.iconSettings}>
            <use href={`${IconSprite}#IconSettings`}></use>
          </svg>
          <p className={css.settingsItem}>Settings</p>
        </li>
        <li className={css.listItem} onClick={openBMIModal}>
        <svg className={css.iconSettings}>
            <use href={`${IconSprite}#IconSettings`}></use>
          </svg>
          <p className={css.settingsItem}>BMI calc</p>
        </li>
        <li className={css.listItem} onClick={openLanguageSwitcher}>
          <svg className={css.iconLogout}>
            <use href={`${IconSprite}#IconSettings`}></use>
          </svg>
          <p className={css.settingsItem}>Languages</p>
        </li>
        <li className={css.listItem} onClick={openLogOutModal}>
          <svg className={css.iconLogout}>
            <use href={`${IconSprite}#IconLogOut`}></use>
          </svg>
          <p className={css.settingsItem}>Log out</p>
        </li>
      </ul>
      {settingModalIsOpen && (
        <UserSettingsModal
          isOpen={settingModalIsOpen}
          isClose={closeSettingModal}
        />
      )}
      {languageSwitcherIsOpen && (
        <LanguageSwitcher
          isOpen={languageSwitcherIsOpen}
          isClose={closeLanguageSwitcher}
        />
      )}
      {bMIModalIsOpen && (
        <BmiModal isOpen={bMIModalIsOpen} isClose={closeBMIModal} />
      )}
      {logOutlIsOpen && (
        <LogOutModal isOpen={logOutlIsOpen} isClose={closeLogOutModal} />
      )}
    </div>
  );
}
