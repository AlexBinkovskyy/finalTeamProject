import css from './PutMailForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Must be valid email!').required('Required'),
});

export default function PutMailForm({ onSubmit, btnText, operationType }) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmitHandler = data => {
    onSubmit({ credentials: data, i18n }).then(response => {
      if (
        operationType === 'resend' &&
        response.type !== `auth/${operationType}/rejected`
      ) {
        navigate('/signin');
      } else if (
        operationType === 'recoverMail' &&
        response.type !== `auth/${operationType}/rejected`
      ) {
        navigate('/change-pass-page');
      }
    });
  };

  const onClickHandler = () => {
    navigate('/signin');
  };

  return (
    <div className={css.divWrap}>
      <p className={css.text}>{t('auth_form.provideEmail')} </p>
      <form onSubmit={handleSubmit(onSubmitHandler)} className={css.form}>
        <div className={css.errorContainer}>
          <input
            {...register('email')}
            className={`${css.input} ${errors.email && css.errorInput}`}
            placeholder={t('auth_form.emailEnter')}
          />
          {errors.email && (
            <span className={css.error}>{errors.email.message}</span>
          )}
        </div>

        <ul className={css.ul}>
          <li>
            <button type="submit" className={css.button}>
              {t('auth_form.resend')}
            </button>
          </li>

          <li>
            <button
              type="button"
              className={css.button}
              onClick={onClickHandler}
            >
              {t('auth_form.back')}
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
}
