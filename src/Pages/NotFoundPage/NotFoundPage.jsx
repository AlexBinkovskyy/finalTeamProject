import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={css.mainWrapper}>
      <div className={css.textWrapper}>
        <p className={css.title}>404</p>
        <p className={css.subtitle}>
          Схоже, що за цією адресою нічого немає або вона вже застаріла.
          <Link to={'/'} className={css.link}>
            Повернутися на головний екран?
          </Link>
        </p>
      </div>
    </div>
  );
}
