import ComponentWithModal from '../Modal/Modal';
import UserSettingsForm from '../UserSettingsForm/UserSettingsForm';
import IconX from '../../image/sprite.svg';
import css from './UserSettingsModal.module.css';
import { useTranslation } from 'react-i18next';

export default function UserSettingsModal({ isOpen, isClose }) {
  const { t } = useTranslation();
  return (
    <ComponentWithModal isOpen={isOpen} isClose={isClose}>
      <div className={css.settingModalWraper}>
        <button className={css.closeBtn} onClick={isClose}>
          <svg className={css.icon}>
            <use href={`${IconX}#IconX`}></use>
          </svg>
        </button>
        <h3 className={css.title}> {t('settingsForm.settings')}</h3>
        <UserSettingsForm closeModal={isClose} />
      </div>
    </ComponentWithModal>
  );
}
