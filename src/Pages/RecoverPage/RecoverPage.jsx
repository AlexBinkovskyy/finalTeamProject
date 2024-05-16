import css from './RecoverPage.module.css';
import Logo from 'components/Logo/Logo';
import PutMailForm from 'components/PutMailForm/PutMailForm';
import { useDispatch } from 'react-redux';
import { recoverMail } from '../../redux/auth/operations';
import AdvantagesSection from 'Sections/AdvantagesSection/AdvantagesSection';

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
      <div className={css.advantage}>
        {window.innerWidth > 1440 && <AdvantagesSection />}
      </div>
    </div>
  );
}
