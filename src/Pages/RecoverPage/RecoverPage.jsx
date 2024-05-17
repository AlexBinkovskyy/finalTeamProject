import css from './RecoverPage.module.css';
import Logo from 'components/Logo/Logo';
import PutMailForm from 'components/PutMailForm/PutMailForm';
import { useDispatch } from 'react-redux';
import { recoverMail } from '../../redux/auth/operations';

export default function RecoverPage() {
  const dispatch = useDispatch();

  const changePassMailFunction = data => {
    return dispatch(recoverMail(data));
  };

  return (
    <div className={css.divMain}>
      <div className={css.div}>
        <Logo />
        <PutMailForm
          onSubmit={changePassMailFunction}
          btnText="Recover"
          operationType="recover"
        />
      </div>
    </div>
  );
}
