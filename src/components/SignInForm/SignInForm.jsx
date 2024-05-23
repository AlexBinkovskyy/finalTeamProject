import css from './SignInForm.module.css';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { signin } from '../../redux/auth/operations';
import { Link } from 'react-router-dom';
import Image from '../../image/sprite.svg';
import { useTranslation } from 'react-i18next';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Must be valid email!').required('Required'),
  password: Yup.string().min(7, 'Too Short!').required('Required'),
});

export default function SignInForm() {
  const dispatch = useDispatch();
  const { t } = useTranslation();  
  const [showPassword, setShowPassword] = useState(false);

  const emailFieldId = useId();
  const passwordFieldId = useId();

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit = data => {
    dispatch(signin(data));
    reset();
  };

  return (
    <div className={css.divWrap}>
      <h1 className={css.title}>{t('signin_page.signin')}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <label htmlFor={emailFieldId} className={css.label}>
        {t('auth_form.email')}
        </label>
        <div className={css.errorContainer}>
          <input
            {...register('email')}
            className={`${css.input} ${errors.email && css.errorInput}`}
            id={emailFieldId}
            placeholder={t('auth_form.emailEnter')}
          />
          {errors.email && (
            <span className={css.error}>{errors.email.message}</span>
          )}
        </div>

        <label htmlFor={passwordFieldId} className={css.label}>
        {t('auth_form.password')}
        </label>
        <div className={css.errorContainer}>
          <input
            {...register('password')}
            autoComplete="off"
            className={`${css.input} ${errors.password && css.errorInput}`}
            id={passwordFieldId}
            placeholder={t('auth_form.password')}
            type={showPassword ? 'text' : 'password'}
          />
          {errors.password && (
            <span className={css.error}>{errors.password.message}</span>
          )}

          <button
            type="button"
            className={css.eyeBtn}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <svg className={css.eyeIcon} width="18" height="18">
                <use href={`${Image}#IconEye`} />
              </svg>
            ) : (
              <svg className={`${css.eyeIcon}`} width="18" height="18">
                <use href={`${Image}#IconEye-off`} />
              </svg>
            )}
          </button>
        </div>

        <button type="submit" className={css.button}>
        {t('signin_page.signin')} 
        </button>
      </form>
      <ul className={css.ul}>
        <li>
          <p className={css.text}>
          {t('signin_page.account')}{' '}
            <Link to="/signup" className={css.link}>
            {t('signin_page.signup')} 
            </Link>
          </p>
        </li>

        <li>
          <p className={css.text}>
            <Link to="/resend-page" className={css.link}>
            {t('auth_form.resend')}
            </Link>{' '}
            {t('auth_form.verfpassword')}
          </p>
        </li>

        <li>
          <p className={css.text}>
            <Link to="/recover-page" className={css.link}>
            {t('signin_page.forgot')} 
            </Link>{' '}
            {t('auth_form.password')}
          </p>
        </li>
      </ul>
    </div>
  );
}
