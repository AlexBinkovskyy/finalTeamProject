import Logo from 'components/Logo/Logo';
import SignInForm from 'components/SignInForm/SignInForm';
import css from './SignInPage.module.css';

export default function SignUpPage() {
  return (
    <div className={css.div}>
      <Logo />
      <SignInForm />
    </div>
  );
}
