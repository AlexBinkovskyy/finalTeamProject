import Logo from 'components/Logo/Logo';
import SignUpForm from 'components/SignUpForm/SignUpForm';
import css from './SignUpPage.module.css';
import AdvantagesSection from 'Sections/AdvantagesSection/AdvantagesSection';
import { useSelector } from 'react-redux';
import { selectIsRefreshing } from '../../redux/auth/selectors';
import Loader from 'components/Loader/Loader';

export default function SignUpPage() {
  const loading = useSelector(selectIsRefreshing);

  return (
    <>
      {loading && <Loader />}
      <div className={css.divMain}>
        <div className={css.div}>
          <Logo />
          <SignUpForm />
        </div>
        <div className={css.advantage}>
          {window.innerWidth >= 1440 && <AdvantagesSection />}
        </div>
      </div>
    </>
  );
}
