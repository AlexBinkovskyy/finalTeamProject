import css from './SignUpForm.module.css';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { signup } from '../../redux/auth/operations';
import { Link, useNavigate } from 'react-router-dom';
import Image from '../../image/sprite.svg';
import { useTranslation } from 'react-i18next'; 

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Must be valid email!').required('Required'),
  password: Yup.string()
    .min(7, 'Too Short!')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      ' Must contain: capital, uppercase letter, number'
    ) 
    .required('Required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please repeat your password'),
});

export default function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const emailFieldId = useId();
  const passwordFieldId = useId();
  const repeatPassword = useId();

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

  const onSubmit = async ({ email, password }) => {
    dispatch(signup({ email, password }))
      .unwrap()
      .then(() => {
        reset();
        navigate('/confirm-page');
      });
  };

  return (
    <div className={css.divWrap}>
      <h1 className={css.title}>{t('signin_page.signup')}</h1>
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
            placeholder={t('auth_form.passwordEnter')}
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

        <label htmlFor={repeatPassword} className={css.label}>
        {t('auth_form.repeatPassword')}
        </label>
        <div className={css.errorContainer}>
          <input
            {...register('repeatPassword')}
            autoComplete="off"
            className={`${css.input} ${
              errors.repeatPassword && css.errorInput
            }`}
            id={repeatPassword}
            placeholder= {t('auth_form.repeatPassword')}
            type={showPassword ? 'text' : 'password'}
          />
          {errors.repeatPassword && (
            <span className={css.error}>{errors.repeatPassword.message}</span>
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
        {t('signin_page.signup')}
        </button>
      </form>
      <p className={css.text}>
      {t('signin_page.alreadyHave')}{' '}
        <Link to="/signin" className={css.link}>
        {t('signin_page.signin')}
        </Link>
      </p>
    </div>
  );
}
