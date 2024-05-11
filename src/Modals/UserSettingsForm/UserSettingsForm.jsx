import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import sprite from '../../image/sprite.svg';
import css from './UserSettingsForm.module.css';

const schema = yup.object().shape({
  avatar: yup.mixed(),
  gender: yup.string().required('Gender is required'),
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  weight: yup.number().required('Weight is required'),
  sportTime: yup.number().required('Sport time is required'),
  waterIntake: yup.number().required('Water intake is required'),
});

const UserSettingsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <div className={css.formGroup}>
        <img src="" alt="User avatar" className={css.avatar} />
        <label className={css.label}>Upload a photo</label>
        <input type="file" {...register('avatar')} className={css.avatarInput} />
      </div>
      <div className={css.formGroup}>
        <label className={css.accentLabel}>Your gender identity</label>
        {/* <div>
          <input type="radio" value="woman" {...register('gender')} className={css.radio} />
          <label className={css.radioLabel}>Woman</label>
          <input type="radio" value="man" {...register('gender')} className={css.radio} />
          <label className={css.radioLabel}>Man</label>
        </div> */}
        <div>
          <input
            type="radio"
            id="woman"
            value="woman"
            {...register('gender')}
          />
          <label htmlFor="woman">Woman</label>
          <input type="radio" id="man" value="man" {...register('gender')} />
          <label htmlFor="man">Man</label>
        </div>
        {errors.gender && (
          <span className={css.error}>{errors.gender.message}</span>
        )}
      </div>
      <div className={css.formGroup}>
        <label className={css.accentLabel}>Your name</label>
        <input type="text" {...register('name')} className={css.input} />
        {errors.name && (
          <span className={css.error}>{errors.name.message}</span>
        )}
      </div>
      <div className={css.formGroup}>
        <label className={css.accentLabel}>Email</label>
        <input type="text" {...register('email')} className={css.input} />
        {errors.email && (
          <span className={css.error}>{errors.email.message}</span>
        )}
      </div>
      <div className={css.formGroup}>
        <p className={css.infoTitle}>My daily norma</p>
        <ul className={css.list}>
          <li className={css.listItem}>
            <p className={css.listItemText}>For woman:</p>
            <p className={css.listItemNorma}>V=(M*0,03) + (T*0,4)</p>
          </li>
          <li className={css.listItem}>
            <p className={css.listItemText}>For man:</p>
            <p className={css.listItemNorma}>V=(M*0,04) + (T*0,6)</p>
          </li>
        </ul>
        <p className={css.calculation}>
          * V is the volume of the water norm in liters per day, M is your body
          weight, T is the time of active sports, or another type of activity
          commensurate in terms of loads (in the absence of these, you must set
          0)
        </p>
        <p className={css.info}>Active time in hours</p>
      </div>
      <div className={css.formGroup}>
        <label className={css.label}>Your weight in kilograms:</label>
        <input type="number" {...register('weight')} className={css.input} />
        {errors.weight && (
          <span className={css.error}>{errors.weight.message}</span>
        )}
      </div>
      <div className={css.formGroup}>
        <label className={css.label}>
          The time of active participation in sports:
        </label>
        <input type="number" {...register('sportTime')} className={css.input} />
        {errors.sportTime && (
          <span className={css.error}>{errors.sportTime.message}</span>
        )}
      </div>
      <div className={css.formGroup}>
        <p className={css.info}>
          The required amount of water in liters per day:
        </p>
      </div>
      <div className={css.formGroup}>
        <label className={css.accentLabel}>
          Write down how much water you will drink:
        </label>
        <input
          type="number"
          {...register('waterIntake')}
          className={css.input}
        />
        {errors.waterIntake && (
          <span className={css.error}>{errors.waterIntake.message}</span>
        )}
      </div>
      <button type="submit" className={css.submitBtn}>
        Save
      </button>
    </form>
  );
};

export default UserSettingsForm;
