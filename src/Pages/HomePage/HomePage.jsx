import AdvantagesSection from 'Sections/AdvantagesSection/AdvantagesSection';
import WelcomeSection from 'Sections/WelcomeSection/WelcomeSection';
import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <>
      <div className={css.sections_home}>
        <WelcomeSection />
        <AdvantagesSection />
      </div>
    </>
  );
}
