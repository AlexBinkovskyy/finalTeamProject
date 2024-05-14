import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import UserBar from '../UserBar/UserBar';
import css from './UserPanel.module.css';

export default function UserPanel() {
  const userInfo = useSelector(selectUser);
  const username = userInfo.email.split('@')[0];

  return (
    <>
      <div className={css.userPanelContainer}>
        <h1 className={css.title}>Hello, <span className={css.name}>{username}!</span></h1>
        <UserBar name={username} avatarUrl={userInfo.avatarUrl}/>
      </div>
    </>
  );
}
