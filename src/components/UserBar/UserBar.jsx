import React, { useState } from 'react';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import IconSprite from '../../image/sprite.svg';
import css from './UserBar.module.css';

export default function UserBar({ name, avatarUrl }) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const togglePopover = event => {
    setPopoverOpen(!popoverOpen);
  };

  return (
    <div>
      <button
        className={css.button}
        data-tut="reactour__btnuserbar"
        onClick={togglePopover}
      >
        <span className={css.username}>{name}</span>
        <img src={avatarUrl} className={css.avatar} alt="User Avatar" />
        {!popoverOpen ? (
          <svg
            className={css.iconInfo}
            width="100%"
            height="100%"
            viewBox="0 0 11 5"
            preserveAspectRatio="xMidYMid meet"
          >
            <use href={`${IconSprite}#UserBarIconDown`}></use>
          </svg>
        ) : (
          <svg
            className={css.iconInfo}
            width="100%"
            height="100%"
            viewBox="0 0 16 16"
            preserveAspectRatio="xMidYMid meet"
          >
            <use href={`${IconSprite}#UserBarIconUp`}></use>
          </svg>
        )}
      </button>
      <div className={css.menuWrapper}>
        <UserBarPopover
          popoverOpen={popoverOpen}
          setPopoverOpen={setPopoverOpen}
        />
      </div>
    </div>
  );
}
