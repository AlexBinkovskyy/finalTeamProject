import css from './RecoverPage.module.css';
import Logo from 'components/Logo/Logo';
import PutMailForm from 'components/PutMailForm/PutMailForm';
import { useDispatch, useSelector } from 'react-redux';
import { recoverMail } from '../../redux/auth/operations';
import AdvantagesSection from 'Sections/AdvantagesSection/AdvantagesSection';
import { selectIsRefreshing } from '../../redux/auth/selectors';
import Loader from 'components/Loader/Loader';

export default function RecoverPage() {
  const dispatch = useDispatch();
  const loading = useSelector(selectIsRefreshing);

  const changePassMailFunction = data => {
    return dispatch(recoverMail(data));
  };

  return (
    <>
      {loading && <Loader />}
      <div className={css.divMain}>
        <div className={css.div}>
          <Logo />
          <PutMailForm
            onSubmit={changePassMailFunction}
            btnText="Send"
            operationType="recoverMail"
          />
        </div>
        <div className={css.advantage}>
          {window.innerWidth >= 1440 && <AdvantagesSection />}
        </div>
      </div>
    </>
  );
}
