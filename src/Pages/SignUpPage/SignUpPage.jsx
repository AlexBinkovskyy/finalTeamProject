import Logo from 'components/Logo/Logo';
import SignUpForm from 'components/SignUpForm/SignUpForm';
import css from './SignUpPage.module.css';

export default function SignUpPage() {
  return (
    <div className={css.div}>
      <Logo />
      <SignUpForm />
    </div>
  );
}
