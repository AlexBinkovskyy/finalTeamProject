import Logo from 'components/Logo/Logo';
import SignUpForm from 'components/SignUpForm/SignUpForm';
import css from './SignUpPage.module.css';
import AdvantagesSection from 'Sections/AdvantagesSection/AdvantagesSection';

export default function SignUpPage() {
  return (
    <div className={css.divMain}>
      <div className={css.div}>
        <Logo />
        <SignUpForm />
      </div>
      <div className={css.advantage}>
        {window.innerWidth > 1440 && <AdvantagesSection />}
      </div>
    </div>
  );
}
