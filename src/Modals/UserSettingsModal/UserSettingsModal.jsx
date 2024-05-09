import { IoIosCloseCircleOutline } from 'react-icons/io';
import ComponentWithModal from '../Modal/Modal';
import UserSettingsForm from '../UserSettingsForm/UserSettingsForm';
import css from './UserSettingsModal.module.css';

export default function UserSettingsModal({ isOpen, isClose }) {
  return (
    <ComponentWithModal isOpen={isOpen} isClose={isClose}>
      <div>
        <h3>Settings</h3>
        <UserSettingsForm />
        <button onClick={isClose}>
          <IoIosCloseCircleOutline />
        </button>
      </div>
    </ComponentWithModal>
  );
}
