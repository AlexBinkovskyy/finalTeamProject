import React, { useState} from 'react';
import UserSettingsModal from '../../Modals/UserSettingsModal/UserSettingsModal';
import { LogOutModal } from '../../Modals/LogOutModal/LogOutModal';
import css from './UserBarPopover.module.css';
import IconSprite from '../../image/sprite.svg';

export default function UserBarPopover({ popoverOpen, setPopoverOpen }) {
  // const [setIsOpen] = useState(false);
  const [settingModalIsOpen, setSettingModalIsOpen] = useState(false);
  const [logOutlIsOpen, setlogOutModalIsOpen] = useState(false);
  // const ref = useRef();

  // useEffect(() => {
  //   const handleClickOutside = event => {
  //     if (ref.current && !ref.current.contains(event.target)) {
  //       setIsOpenPop(false);
  //     }
  //   };
  //   document.addEventListener('click', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   };
  // }, [setIsOpenPop]);

  const openSettingModal = () => {
    setPopoverOpen(false);
    setSettingModalIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeSettingModal = () => {
    setSettingModalIsOpen(false);
    document.body.style.overflow = '';
  };

  const openLogOutModal = () => {
    setlogOutModalIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLogOutModal = () => {
    setPopoverOpen(false);
    setlogOutModalIsOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <div
      className={
        popoverOpen ? `${css.wrapper} ${css.open}` : `${css.wrapper} ${css.closed}`
      }
    >
      <div className={css.button} onClick={openSettingModal}>
        <svg className={css.iconSettings}>
          <use href={`${IconSprite}#IconSettings`}></use>
        </svg>
        <span className={css.settingsItem}>Settings</span>
      </div>
      {logOutlIsOpen && (
        <LogOutModal isOpen={logOutlIsOpen} isClose={closeLogOutModal} />
      )}
      {settingModalIsOpen && (
        <UserSettingsModal
          isOpen={settingModalIsOpen}
          isClose={closeSettingModal}
        />
      )}
      <div className={css.button} onClick={openLogOutModal}>
        <svg className={css.iconLogout}>
          <use href={`${IconSprite}#IconLogOut`}></use>
        </svg>
        <span className={css.settingsItem}>Log out</span>
      </div>
    </div>
  );
}
