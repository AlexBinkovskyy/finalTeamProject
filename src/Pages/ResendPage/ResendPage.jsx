import ResendMail from 'components/ResendMail/ResendMail';
import css from './ResendPage.module.css';
import Logo from 'components/Logo/Logo';

export default function ResendPage() {
  return (
    <div className={css.divMain}>
      <div className={css.div}>
        <Logo />
        <ResendMail />
      </div>
    </div>
  );
}
