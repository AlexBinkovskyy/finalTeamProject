import React, { useEffect, useRef } from 'react';
import UserSettingsModal from '../../Modals/UserSettingsModal/UserSettingsModal';
import BmiModal from 'Modals/BmiModal/BmiModal';
import { LogOutModal } from '../../Modals/LogOutModal/LogOutModal';
import css from './UserBarPopover.module.css';
import IconSprite from '../../image/sprite.svg';
import { LanguageSwitcher } from 'Modals/LanguageSwitcher/LanguageSwitcher';
import { useModal } from '../../hooks/useModal';
import { TipOfTheDay } from 'components/utils/TipOfTheDay/TipOfTheDay';
import { UsefullLinks } from 'Modals/UsefullLinks/UsefullLinks';
import { useTranslation } from 'react-i18next';

export default function UserBarPopover({ popoverOpen, setPopoverOpen }) {
  const [settingModalIsOpen, openSettingModal, closeSettingModal] =
    useModal(setPopoverOpen);
  const [bMIModalIsOpen, openBMIModal, closeBMIModal] =
    useModal(setPopoverOpen);
  const [logOutlIsOpen, openLogOutModal, closeLogOutModal] =
    useModal(setPopoverOpen);
  const [languageSwitcherIsOpen, openLanguageSwitcher, closeLanguageSwitcher] =
    useModal(setPopoverOpen);
  const [openLinksIsOpen, openLinksModal, closeLinksModal] =
    useModal(setPopoverOpen);

  const wrapperRef = useRef(null);

  const { t } = useTranslation();

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
          <p className={css.settingsItem}>{t('popover.settings')}</p>
        </li>
        <li className={css.listItem} onClick={openBMIModal}>
          <svg className={css.iconSettings}>
            <use href={`${IconSprite}#iconMeter`}></use>
          </svg>
          <p className={css.settingsItem}>{t('popover.bmiCalc')}</p>
        </li>
        <li className={css.listItem} onClick={openLanguageSwitcher}>
          <svg className={css.iconLogout}>
            <use href={`${IconSprite}#iconEarth`}></use>
          </svg>
          <p className={css.settingsItem}>{t('popover.languages')}</p>
        </li>
        <li className={css.listItem} onClick={() => TipOfTheDay(100)}>
          <svg className={css.iconLogout}>
            <use href={`${IconSprite}#iconTip`}></use>
          </svg>
          <p className={css.settingsItem}>{t('popover.tip')}</p>
        </li>
        <li className={css.listItem} onClick={openLinksModal}>
          <svg className={css.iconLogout}>
            <use href={`${IconSprite}#iconLink`}></use>
          </svg>
          <p className={css.settingsItem}>{t('popover.links')}</p>
        </li>
        <li className={css.listItem} onClick={openLogOutModal}>
          <svg className={css.iconLogout}>
            <use href={`${IconSprite}#IconLogOut`}></use>
          </svg>
          <p className={css.settingsItem}>{t('popover.logout')}</p>
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
        {openLinksIsOpen && (
          <UsefullLinks isOpen={openLinksIsOpen} isClose={closeLinksModal} />
        )}
      </div>
    </div>
  );
}
