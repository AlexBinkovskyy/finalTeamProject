import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import UserBar from '../UserBar/UserBar';
import css from './UserPanel.module.css';
import { useTranslation } from 'react-i18next';

export default function UserPanel() {
  const userInfo = useSelector(selectUser);
  const username = userInfo.name?.split(' ')[0] || userInfo.email.split('@')[0];
  const { t } = useTranslation();

  return (
    <>
      <div className={css.userPanelContainer}>
        <h1 className={css.title}>
          {t('userPanel.welcome')}
          <span className={css.name}>, {username}!</span>
        </h1>
        <UserBar name={username} avatarUrl={userInfo.avatarUrl} />
      </div>
    </>
  );
}
