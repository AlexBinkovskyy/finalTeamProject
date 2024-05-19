import Logo from 'components/Logo/Logo';
import css from './ChangePassPage.module.css';
import ChangePassForm from 'components/ChangePassForm/ChangePassForm';
import AdvantagesSection from 'Sections/AdvantagesSection/AdvantagesSection';

export default function ChangePassPage() {
  return (
    <div className={css.divMain}>
      <div className={css.div}>
        <Logo />
        <ChangePassForm />
      </div>
      <div className={css.advantage}>
        {window.innerWidth > 1440 && <AdvantagesSection />}
      </div>
    </div>
  );
}
