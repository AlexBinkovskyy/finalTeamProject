import ConfirmInfo from 'components/ConfirmInfo/ConfirmInfo';
import Logo from 'components/Logo/Logo';
import css from './ConfirmPage.module.css';

export default function ConfirmPage() {
  return (
    <div className={css.divMain}>
      <div className={css.div}>
        <Logo />
        <ConfirmInfo />
      </div>
    </div>
  );
}
