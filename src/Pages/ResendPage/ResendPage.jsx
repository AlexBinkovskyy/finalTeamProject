import css from './ResendPage.module.css';
import Logo from 'components/Logo/Logo';
import PutMailForm from 'components/PutMailForm/PutMailForm';
import { useDispatch, useSelector } from 'react-redux';
import { resendMail } from '../../redux/auth/operations';
import AdvantagesSection from 'Sections/AdvantagesSection/AdvantagesSection';
import { selectIsRefreshing } from '../../redux/auth/selectors';
import Loader from 'components/Loader/Loader';

export default function ResendPage() {
  const dispatch = useDispatch();
  const loading = useSelector(selectIsRefreshing);

  const resendMailFunction = data => {
    return dispatch(resendMail(data));
  };

  return (
    <>
      {loading && <Loader />}
      <div className={css.divMain}>
        <div className={css.div}>
          <Logo />
          <PutMailForm
            onSubmit={resendMailFunction}
            btnText="Resend"
            operationType="resend"
          />
        </div>
        <div className={css.advantage}>
          {window.innerWidth > 1440 && <AdvantagesSection />}
        </div>
      </div>
    </>
  );
}
