import { Link } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import { useTranslation } from 'react-i18next';
import css from './WelcomeSection.module.css';

export default function WelcomeSection() {
  const { t } = useTranslation();
  return (   
    <section className={css.section}>  
      <div className={css.container}>
        <Logo />
        <div className={css.hero}>
          <h3 className={css.subtitle}>{t('welcomeSection.recordDaily')}</h3>
          <h1 className={css.title}>{t('welcomeSection.waterTracker')}</h1>
          <div className={css.link}>
            <Link to="/signup" className={css.try}>
            {t('welcomeSection.tryTracker')}
            </Link>
            <Link to="/signin" className={css.sign}>
            {t('signin_page.signin')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
