import Logo from 'components/Logo/Logo';
import SignInForm from 'components/SignInForm/SignInForm';
import css from './SignInPage.module.css';
import AdvantagesSection from 'Sections/AdvantagesSection/AdvantagesSection';
import { useSelector } from 'react-redux';
import { selectLoading } from '../../redux/auth/selectors';
import Loader from 'components/Loader/Loader';

export default function SignUpPage() {
  const loading = useSelector(selectLoading);

  return (
    <>
      {loading && <Loader />}
      <div className={css.divMain}>
        <div className={css.div}>
          <Logo />
          <SignInForm />
        </div>
        <div className={css.advantage}>
          {window.innerWidth > 1440 && <AdvantagesSection />}
        </div>
      </div>
    </>
  );
}
