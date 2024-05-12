import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import {
  // selectConsumptionItem,
  selectLoadingStatus,
  selectError,
} from '../../redux/water/selectors';
import { selectUser } from '../../redux/auth/selectors';
import IconUpload from '../../image/sprite.svg';
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

const UserSettingsForm = ({ closeModal }) => {
  // const dispatch = useDispatch();
  const userInfo = useSelector(selectUser);
  // const user = useSelector(selectConsumptionItem);
  const loading = useSelector(selectLoadingStatus);
  const error = useSelector(selectError);
  const [calculatedWaterIntake, setCalculatedWaterIntake] = useState(0);
  const [waterIntakeValue, setWaterIntakeValue] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(userInfo.avatarUrl);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (userInfo && userInfo.email) {
      const email = userInfo.email;
      const name = email.split('@')[0];
      setValue('name', name);
      setValue('email', email);
    }
  }, [userInfo, setValue]);

  const gender = watch('gender');
  const weight = watch('weight');
  const sportTime = watch('sportTime');

  useEffect(() => {
    if (gender && weight && sportTime) {
      const setDailyNorma =
        gender === 'woman'
          ? weight * 0.03 + sportTime * 0.4
          : weight * 0.04 + sportTime * 0.6;
      setCalculatedWaterIntake(setDailyNorma);
      // setWaterIntakeValue(Number(calculatedWaterIntake.toFixed(1)));
    }
  }, [gender, weight, sportTime, calculatedWaterIntake]);

  // const handleAvatarChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     setAvatarUrl(imageUrl);
  //   }
  // };

  const handleAvatarChange = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = data => {
    console.log(data.avatar);
    const formData = new FormData();
    formData.append('avatar', data.avatar[0] || userInfo.avatarUrl);
    formData.append('gender', data.gender);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('weight', data.weight);
    formData.append('sportTime', data.sportTime);
    formData.append('waterIntake', data.waterIntake);

    console.log('FormData content:');
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    // dispatch(updateUserInfo(data));
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <div className={`${css.formGroup} ${css.avatarContainer}`}>
        <div class="thumb">
          <img src={avatarUrl} alt="User avatar" className={css.avatar} />
        </div>
        <label htmlFor="uploadInput" className={css.label}>
          <svg className={css.icon}>
            <use href={`${IconUpload}#IconUpload`}></use>
          </svg>
          Upload a photo
          <input
            id="uploadInput"
            type="file"
            {...register('avatar')}
            className={css.avatarInput}
            accept="image/*, .png, .jpg, .jpeg"
            onChange={handleAvatarChange}
          />
        </label>
      </div>
      <div className={css.formGroup}>
        <label className={css.accentLabel}>Your gender identity</label>
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
          {calculatedWaterIntake.toFixed(1)}L
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
          // value={waterIntakeValue}
          placeholder={calculatedWaterIntake.toFixed(1)}
          onChange={e => setWaterIntakeValue(e.target.value)}
        />
        {errors.waterIntake && (
          <span className={css.error}>{errors.waterIntake.message}</span>
        )}
      </div>
      <button type="submit" className={css.submitBtn} disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </button>
      {error && <span className={css.error}>{error}</span>}
    </form>
  );
};

export default UserSettingsForm;
