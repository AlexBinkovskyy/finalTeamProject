import Logo from 'components/Logo/Logo';
import css from './ChangePassPage.module.css';
import ChangePassForm from 'components/ChangePassForm/ChangePassForm';
import AdvantagesSection from 'Sections/AdvantagesSection/AdvantagesSection';
import { useSelector } from 'react-redux';
import { selectIsRefreshing } from '../../redux/auth/selectors';
import Loader from 'components/Loader/Loader';

export default function ChangePassPage() {
  const isRefreshing = useSelector(selectIsRefreshing);

  return (
    <>
      {isRefreshing && <Loader />}
      <div className={css.divMain}>
        <div className={css.div}>
          <Logo />
          <ChangePassForm />
        </div>
        <div className={css.advantage}>
          {window.innerWidth > 1440 && <AdvantagesSection />}
        </div>
      </div>
    </>
  );
}
