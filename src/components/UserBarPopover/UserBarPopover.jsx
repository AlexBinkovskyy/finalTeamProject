import React, { useEffect, useRef } from 'react';
import UserSettingsModal from '../../Modals/UserSettingsModal/UserSettingsModal';
import BmiModal from 'Modals/BmiModal/BmiModal';
import { LogOutModal } from '../../Modals/LogOutModal/LogOutModal';
import css from './UserBarPopover.module.css';
import IconSprite from '../../image/sprite.svg';
import { IoMdCalculator } from 'react-icons/io';
import { LanguageSwitcher } from 'Modals/LanguageSwitcher/LanguageSwitcher';
import { useModal } from '../../hooks/useModal';
import { TipOfTheDay } from 'components/TipOfTheDay/TipOfTheDay';

export default function UserBarPopover({ popoverOpen, setPopoverOpen }) {
  const [settingModalIsOpen, openSettingModal, closeSettingModal] =
    useModal(setPopoverOpen);
  const [bMIModalIsOpen, openBMIModal, closeBMIModal] =
    useModal(setPopoverOpen);
  const [logOutlIsOpen, openLogOutModal, closeLogOutModal] =
    useModal(setPopoverOpen);
  const [languageSwitcherIsOpen, openLanguageSwitcher, closeLanguageSwitcher] =
    useModal(setPopoverOpen);

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

  
  const time = 100
  const handleTips = () => TipOfTheDay(time)

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
          <div className={css.iconCalc}>
            <IoMdCalculator className={css.iconCalcItem} />
          </div>
          <p className={css.settingsItem}>BMI calc</p>
        </li>
        <li className={css.listItem} onClick={openLanguageSwitcher}>
          <svg className={css.iconLogout}>
            <use href={`${IconSprite}#IconSettings`}></use>
          </svg>
          <p className={css.settingsItem}>Languages</p>
        </li>
        <li className={css.listItem} onClick={handleTips}>
          <svg className={css.iconLogout}>
            <use href={`${IconSprite}#IconSettings`}></use>
          </svg>
          <p className={css.settingsItem}>Get me tip</p>
        </li>
        <li className={css.listItem} onClick={openLogOutModal}>
          <svg className={css.iconLogout}>
            <use href={`${IconSprite}#IconLogOut`}></use>
          </svg>
          <p className={css.settingsItem}>Log out</p>
        </li>
      </ul>
      <div>

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
    </div>
  );
}
