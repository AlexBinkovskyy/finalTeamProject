import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoadingStatus } from '../../redux/water/selectors';
import { selectUser } from '../../redux/auth/selectors';
import { refreshUser, updateUserSettings } from '../../redux/auth/operations';
import IconSprite from '../../image/sprite.svg';
import css from './UserSettingsForm.module.css';

const schema = yup.object().shape({
  avatar: yup.mixed(),
  gender: yup
    .string()
    .required('Gender is required')
    .oneOf(['male', 'female'], 'Gender must be either male or female'),
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(20, 'Name must be at most 20 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  weight: yup
    .number()
    .required('Weight is required')
    .min(0, 'Weight must be a positive number'),
  activeTime: yup
    .number()
    .required('Sport time is required')
    .positive('Active time must be a positive number'),
  goal: yup
    .number()
    .required('Water intake is required')
    .min(0, 'Water intake must be a positive number'),
});

const UserSettingsForm = ({ closeModal }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUser);
  const loading = useSelector(selectLoadingStatus);
  // const error = useSelector(selectError);
  const [avatarUrl, setAvatarUrl] = useState(userInfo.avatarUrl);
  const [userInfoUpdated, setUserInfoUpdated] = useState(false);

  // console.log(userInfo);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      avatar: '',
      gender: '',
      name: '',
      email: '',
      weight: 0,
      activeTime: 0,
      goal: 0,
    },
  });

  useEffect(() => {
    if (userInfo && userInfo.email && !userInfoUpdated) {
      const email = userInfo.email;
      const name = userInfo.name ? userInfo.name : email.split('@')[0];
      const gender = userInfo.gender ? userInfo.gender : '';
      const weight = userInfo.weight ? userInfo.weight : '';
      const activeTime = userInfo.activeTime ? userInfo.activeTime : '';
      const goal = userInfo.goal ? userInfo.goal : '';
      setValue('email', email);
      setValue('name', name);
      setValue('gender', gender);
      setValue('weight', weight);
      setValue('activeTime', activeTime);
      setValue('goal', goal);
      setUserInfoUpdated(true);
    }
  }, [userInfo, setValue, userInfoUpdated]);

  // useEffect(() => {
  //   dispatch(refreshUser());
  // }, [dispatch]);

  const gender = watch('gender');
  const weight = watch('weight');
  const activeTime = watch('activeTime');

  useEffect(() => {
    if (gender && weight && activeTime) {
      const setDailyNorma =

        gender === 'female'
          ? weight * 0.03 + activeTime * 0.4
          : weight * 0.04 + activeTime * 0.6;
      setValue('goal', setDailyNorma.toFixed(1));
    }
  }, [gender, weight, activeTime, setValue]);

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
    if (avatarUrl !== userInfo.avatarUrl) {
    const formData = new FormData();
    const avatarFile = new File([avatarUrl], 'avatar.jpg', {
      type: 'image/jpeg',
    });

    formData.append('avatar', avatarFile);
    formData.append('gender', data.gender);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('weight', data.weight);
    formData.append('activeTime', data.activeTime);
    formData.append('goal', data.goal*1000);

    dispatch(updateUserSettings(formData)).then(() => {
      closeModal();
      dispatch(refreshUser());
    });
  } else {
    const formData = {
      gender: data.gender,
      name: data.name,
      email: data.email,
      weight: data.weight,
      activeTime: data.activeTime,
      goal: data.goal*1000,
    };

    dispatch(updateUserSettings(formData)).then(() => {
      closeModal();
      dispatch(refreshUser());
    });
  }
};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={css.form}
      action="/profile"
      method="put"
      encType="multipart/form-data"
    >
      <div className={`${css.formGroup} ${css.avatarContainer}`}>
        <div className={css.thumb}>
          <img src={avatarUrl} alt="User avatar" className={css.avatar} />
        </div>
        <label
          htmlFor="uploadInput"
          className={`${css.uploadLabel} ${css.uploadText}`}
        >
          <svg className={css.icon}>
            <use href={`${IconSprite}#IconUpload`}></use>
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
      <div className={css.formWraper}>
        <div className={css.formWrap_1}>
          <div className={css.formGroup}>
            <label className={css.accentLabel}>Your gender identity</label>
            <div className={css.genderInput}>
              <input
                type="radio"
                id="female"
                value="female"
                {...register('gender')}
              />
              <label htmlFor="female" className={css.genderLabel}>
                Woman
              </label>
              <input
                type="radio"
                id="male"
                value="male"
                {...register('gender')}
              />
              <label htmlFor="male" className={css.genderLabel}>
                Man
              </label>
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
              <span className={css.calcIcon}>*</span>V is the volume of the
              water norm in liters per day, M is your body weight, T is the time
              of active sports, or another type of activity commensurate in
              terms of loads (in the absence of these, you must set 0)
            </p>
            <p className={css.info}>
              <svg className={css.iconInfo}>
                <use href={`${IconSprite}#Attention`}></use>
              </svg>
              Active time in hours
            </p>
          </div>
        </div>
        <div className={css.formWrap_2}>
          <div className={css.formGroup}>
            <label className={css.label}>Your weight in kilograms:</label>
            <input
              type="number"
              {...register('weight')}
              className={css.input}
            />
            {/* {errors.weight && (
              <span className={css.error}>{errors.weight.message}</span>
            )} */}
            {errors.weight && errors.weight.type === 'typeError' && (
              <span className={css.error}>Weight is required</span>
            )}
          </div>
          <div className={css.formGroup}>
            <label className={css.label}>
              The time of active participation in sports:
            </label>
            <input
              type="number"
              {...register('activeTime')}
              className={css.input}
            />
            {/* {errors.activeTime && (
              <span className={css.error}>{errors.activeTime.message}</span>
            )} */}
            {errors.activeTime && errors.activeTime.type === 'typeError' && (
              <span className={css.error}>ActiveTime is required</span>
            )}
          </div>
          <div className={css.formGroup}>
            <p className={css.info}>
              The required amount of water in liters per day:
              {watch('goal') ? `${watch('goal')}L` : ''}
            </p>
          </div>
          <div className={css.formGroup}>
            <label className={css.accentLabel}>
              Write down how much water you will drink:
            </label>
            <input
              type="number"
              {...register('goal')}
              className={css.input}
              // value={waterIntakeValue}
              step="0.1"
              value={(watch('goal'))}
              // placeholder={Math.round(parseFloat(watch('goal')))}

            />
            {/* {errors.goal && (
              <span className={css.error}>{errors.goal.message}</span>
            )} */}
            {errors.goal && errors.goal.type === 'typeError' && (
              <span className={css.error}>Goal is required</span>
            )}
          </div>
        </div>
      </div>
      <button type="submit" className={css.submitBtn} disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
};

export default UserSettingsForm;
