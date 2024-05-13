import React, { useState } from 'react';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import IconSprite from '../../image/sprite.svg';
import css from './UserBar.module.css';

export default function UserBar({ name, avatarUrl }) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const togglePopover = () => {
    setPopoverOpen(!popoverOpen);
  };

  return (
    <div>
      <button className={css.button}onClick={togglePopover}>
        <span className={css.username}>{name}</span>
        <img src={avatarUrl} className={css.avatar}alt="User Avatar" />
        <svg className={css.iconInfo}>
                <use href={`${IconSprite}#UserBarIcon`}></use>
              </svg>
      </button>
      {popoverOpen && <UserBarPopover />}
    </div>
  );
}


