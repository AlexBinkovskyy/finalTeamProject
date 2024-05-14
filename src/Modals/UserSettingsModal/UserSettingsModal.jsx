import ComponentWithModal from '../Modal/Modal';
import UserSettingsForm from '../UserSettingsForm/UserSettingsForm';
import IconX from '../../image/sprite.svg';
import css from './UserSettingsModal.module.css';

export default function UserSettingsModal({ isOpen, isClose }) {
  return (
    <ComponentWithModal isOpen={isOpen} isClose={isClose}>
      <div>
        <button className={css.closeBtn} onClick={isClose}>
          <svg className={css.icon}>
            <use href={`${IconX}#IconX`}></use>
          </svg>
        </button>
        <h3 className={css.title}>Settings</h3>
        <UserSettingsForm closeModal={isClose} />
      </div>
    </ComponentWithModal>
  );
}
