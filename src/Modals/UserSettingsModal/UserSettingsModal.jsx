import { IoIosCloseCircleOutline } from 'react-icons/io';
import ComponentWithModal from '../Modal/Modal';
import UserSettingsForm from '../UserSettingsForm/UserSettingsForm';
import css from './UserSettingsModal.module.css';

export default function UserSettingsModal({ isOpen, isClose }) {
  return (
    <ComponentWithModal isOpen={isOpen} isClose={isClose}>
      <div>
        <button className={css.closeBtn}onClick={isClose}>
          <IoIosCloseCircleOutline />
        </button>
        <h3 className={css.title}>Settings</h3>
        <UserSettingsForm />
      </div>
    </ComponentWithModal>
  );
}
