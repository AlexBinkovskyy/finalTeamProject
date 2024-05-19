import { useEffect, useId, useState } from 'react';
import css from './ChangePassForm.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import Image from '../../image/sprite.svg';
import { recoverPass } from '../../redux/auth/operations';

const validationSchema = Yup.object().shape({
  resetToken: Yup.string().required('Required'),
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

export default function ChangePassForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const codeFieldId = useId();
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

  const onSubmit = ({ resetToken, password }) => {
    resetToken = resetToken.split(' ').join('').trim();
    dispatch(recoverPass({ resetToken, password }))
      .unwrap()
      .then(() => {
        reset();
        setSubmitted(true);
      });
  };

  useEffect(() => {
    if (submitted) {
      navigate('/signin');
    }
  }, [submitted, navigate]);

  const onClickHandler = () => {
    navigate('/recover-page');
  };

  return (
    <div className={css.divWrap}>
      <p className={css.text}>Fill up form below</p>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <label htmlFor={codeFieldId} className={css.label}>
          Code
        </label>
        <div className={css.errorContainer}>
          <input
            {...register('resetToken')}
            className={`${css.input} ${errors.resetToken && css.errorInput}`}
            id={codeFieldId}
            placeholder="Enter your code"
            autoComplete="off"
          />
          {errors.resetToken && (
            <span className={css.error}>{errors.resetToken.message}</span>
          )}
        </div>

        <label htmlFor={passwordFieldId} className={css.label}>
          Password
        </label>
        <div className={css.errorContainer}>
          <input
            {...register('password')}
            autoComplete="off"
            className={`${css.input} ${errors.password && css.errorInput}`}
            id={passwordFieldId}
            placeholder="Enter new password"
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
          Repeat Password
        </label>
        <div className={css.errorContainer}>
          <input
            {...register('repeatPassword')}
            autoComplete="off"
            className={`${css.input} ${
              errors.repeatPassword && css.errorInput
            }`}
            id={repeatPassword}
            placeholder="Repeat password"
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

        <ul className={css.ul}>
          <li>
            <button type="submit" className={css.button}>
              Send
            </button>
          </li>

          <li>
            <button
              type="button"
              className={css.button}
              onClick={onClickHandler}
            >
              Back
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
}
