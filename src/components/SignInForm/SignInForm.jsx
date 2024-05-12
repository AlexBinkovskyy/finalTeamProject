import css from './SignInForm.module.css';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { signin } from '../../redux/auth/operations';
import { Link } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email!').required('Required'),
  password: Yup.string().min(7, 'Too Short!').required('Required'),
});

export default function SignInForm() {
  const dispatch = useDispatch();

  const emailFieldId = useId();
  const passwordFieldId = useId();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = data => {
    dispatch(signin(data));
    console.log(data);
    reset();
  };

  return (
    <div>
      <h1 className={css.title}>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <label htmlFor={emailFieldId} className={css.label}>
          Email
        </label>
        <input
          {...register('email')}
          className={`${css.input} ${errors.email && css.errorInput}`}
          id={emailFieldId}
          placeholder="Enter your email"
        />
        {errors.email && (
          <span className={css.error}>{errors.email.message}</span>
        )}

        <label htmlFor={passwordFieldId} className={css.label}>
          Password
        </label>
        <input
          {...register('password')}
          autoComplete="off"
          className={`${css.input} ${errors.password && css.errorInput}`}
          id={passwordFieldId}
          placeholder="Enter your password"
        />
        {errors.password && (
          <span className={css.error}>{errors.password.message}</span>
        )}

        <button type="submit" className={css.button}>
          Sign In
        </button>
      </form>
      <p className={css.text}>
        Don't have any account?{' '}
        <Link to="/signup" className={css.link}>
          Sign Up
        </Link>
      </p>
    </div>
  );
}
