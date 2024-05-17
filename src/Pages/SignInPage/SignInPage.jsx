import Logo from 'components/Logo/Logo';
import SignInForm from 'components/SignInForm/SignInForm';
import css from './SignInPage.module.css';
import AdvantagesSection from 'Sections/AdvantagesSection/AdvantagesSection';

export default function SignUpPage() {
  return (
    <div className={css.divMain}>
      <div className={css.div}>
        <Logo />
        <SignInForm />
      </div>
      <div className={css.advantage}>
        {window.innerWidth > 1440 && <AdvantagesSection />}
      </div>
    </div>
  );
}
