import css from './SignUpForm.module.css';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { signup } from '../../redux/auth/operations';
import { Link } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email!').required('Required'),
  password: Yup.string()
    .min(7, 'Too Short!')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'The password must contain at least one capital letter, one uppercase letter and one number'
    )
    .required('Required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please repeat your password'),
});

export default function SignUpForm() {
  const dispatch = useDispatch();

  const emailFieldId = useId();
  const passwordFieldId = useId();
  const repeatPassword = useId();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = ({ email, password }) => {
    dispatch(signup({ email, password }));
    console.log({ email, password });
    reset();
  };

  return (
    <div>
      <h1 className={css.title}>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <label htmlFor={emailFieldId} className={css.label}>
          Email
        </label>
        <input
          {...register('email')}
          className={css.input}
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
          className={css.input}
          id={passwordFieldId}
          placeholder="Enter your password"
        />
        {errors.password && (
          <span className={css.error}>{errors.password.message}</span>
        )}

        <label htmlFor={repeatPassword} className={css.label}>
          Repeat Password
        </label>
        <input
          {...register('repeatPassword')}
          autoComplete="off"
          className={css.input}
          id={repeatPassword}
          placeholder="Repeat password"
        />
        {errors.repeatPassword && (
          <span className={css.error}>{errors.repeatPassword.message}</span>
        )}

        <button type="submit" className={css.button}>
          Sign Up
        </button>
      </form>
      <p className={css.text}>
        Already have account?{' '}
        <Link to="/signin" className={css.link}>
          Sign In
        </Link>
      </p>
    </div>
  );
}
