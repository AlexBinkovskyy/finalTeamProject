import css from './ResendMail.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { resendMail } from '../../redux/auth/operations';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Must be valid email!').required('Required'),
});

export default function ResendMail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit = data => {
    console.log(data);
    dispatch(resendMail(data)).then(response => {
      console.log(response);
      if (response.type !== 'auth/resend/rejected') navigate('/signin');
    });
  };

  return (
    <div className={css.divWrap}>
      <p className={css.text}>Please put your e-mail in the form </p>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.errorContainer}>
          <input
            {...register('email')}
            className={`${css.input} ${errors.email && css.errorInput}`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <span className={css.error}>{errors.email.message}</span>
          )}
        </div>

        <button type="submit" className={css.button}>
          Resend
        </button>
      </form>
    </div>
  );
}
