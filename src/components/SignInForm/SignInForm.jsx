import css from './SignInForm.module.css';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email!').required('Required'),
  password: Yup.string().min(7, 'Too Short!').required('Required'),
});

export default function SignInForm() {
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

        <button type="submit" className={css.button}>
          Sign In
        </button>
      </form>
    </div>
  );
}
