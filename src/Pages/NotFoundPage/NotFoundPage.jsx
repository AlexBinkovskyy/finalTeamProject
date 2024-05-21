import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={css.mainWrapper}>
      <div className={css.textWrapper}>
        <p className={css.title}>404</p>
        <p className={css.subtitle}>
          It's seems, that is forbidden rout for request you are trying to reach, or maybe page didn't exist anymore... <br/>
          <Link to={'/'} className={css.link}>
            Safely back to home page
          </Link>
        </p>
      </div>
    </div>
  );
}
