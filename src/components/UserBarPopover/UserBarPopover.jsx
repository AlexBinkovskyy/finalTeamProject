import React, { useState, useRef, useEffect } from 'react';
import UserSettingsModal from '../../Modals/UserSettingsModal/UserSettingsModal';
import { LogOutModal } from '../../Modals/LogOutModal/LogOutModal';
import css from './UserBarPopover.module.css';

export default function UserBarPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [settingModalIsOpen, setSettingModalIsOpen] = useState(false);
  const [logOutlIsOpen, setlogOutModalIsOpen] = useState(false);
  const ref = useRef();

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const openSettingModal = () => {
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
    setlogOutModalIsOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <button className={css.button} onClick={openSettingModal}>
        Settings
      </button>
      <button className={css.button} onClick={openLogOutModal}>
        Log out
      </button>
      {logOutlIsOpen && (
        <LogOutModal
          isOpen={logOutlIsOpen}
          isClose={closeLogOutModal}
        />
      )}
      {settingModalIsOpen && (
        <UserSettingsModal
          isOpen={openSettingModal}
          isClose={closeSettingModal}
        />
      )}
    </>
  );
}
