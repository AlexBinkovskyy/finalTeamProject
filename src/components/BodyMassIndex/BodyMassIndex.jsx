import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import BMIImage from '../../image/BMI.png';
import Loader from '../../components/Loader/Loader';
import css from './BodyMassIndex.module.css';

const schema = yup.object().shape({
  weight: yup
    .number()
    .required('Weight is required')
    .min(0, 'Weight must be a positive number'),
  height: yup
    .number()
    .required('Height is required')
    .min(0, 'Height must be a positive number'),
});

export default function BodyMassIndex() {
  const userInfo = useSelector(selectUser);
  const [bmiValue, setBmiValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataError, setDataError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (userInfo) {
      setValue('weight', userInfo.weight || 0);
      setValue('height', userInfo.height || 0);
    }
  }, [userInfo, setValue]);

  const onSubmit = async data => {
    setLoading(true);
    try {
      const { weight, height } = data;

      setDataError('');

      if (!weight || !height) {
        setDataError('Please enter both weight and height.');
        setBmiValue(null);
        setLoading(false);
        return;
      }

      if (height < 40 || height > 250) {
        if (height !== '') {
          setDataError('Height must be between 40 cm and 250 cm.');
          setBmiValue(null);
          setLoading(false);
          return;
        }
      }

      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      setBmiValue(bmi.toFixed(2));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      //   setBmiValue(0);
      setLoading(false);
    }
  };

  const getColorClass = bmi => {
    if (bmi < 18.5) {
      return css.blueText;
    } else if (bmi >= 18.5 && bmi < 25) {
      return css.greenText;
    } else if (bmi >= 25) {
      return css.redText;
    } else {
      return '';
    }
  };

  return (
    <div className={css.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <p className={css.text}>
          Body mass index (BMI) is a calculated value that allows you to assess
          the degree of correspondence between a person's body weight and
          height. Such a ratio gives us information about whether the weight is
          normal, insufficient or excessive. The BMI indicator reflects the fat
          reserves in the human body, which can timely signal its excess, the
          risk of developing obesity and related diseases. Enter your data below
          to calculate your BMI.
        </p>
        <div className={css.formElements}>
          <div className={css.labels}>
            <div className={css.formGroup}>
              <label htmlFor="weight" className={css.label}>
                Weight (kg):
              </label>
              <input
                type="number"
                min="0"
                id="weight"
                {...register('weight')}
                className={css.input}
                autoComplete="weight"
              />
              {errors.weight && (
                <span className={`${css.weight} ${css.error}`}>
                  Weight is required
                </span>
              )}
            </div>
            <div className={css.formGroup}>
              <label htmlFor="height" className={css.label}>
                Height (cm):
              </label>
              <input
                type="number"
                min="0"
                id="height"
                {...register('height')}
                className={css.input}
                autoComplete="height"
              />
              {errors.height && (
                <span className={`${css.height} ${css.error}`}>
                  Height is required
                </span>
              )}
            </div>
          </div>
          <button type="submit" className={css.btn} disabled={loading}>
            {loading ? 'Calculating...' : 'Calculate BMI'}
          </button>
        </div>

        {dataError && <span className={css.error}>{dataError}</span>}
        {bmiValue !== null && (
          <div className={css.result}>
            <div className={css.thumb}>
              <img src={BMIImage} alt="Body mass index" className={css.image} />
            </div>
            <p className={`${css.value} ${getColorClass(bmiValue)}`}>
              {bmiValue}
            </p>
            {bmiValue !== null && (
              <p className={`${css.indexMessage} ${getColorClass(bmiValue)}`}>
                {bmiValue < 18.5
                  ? 'BMI is LOW'
                  : bmiValue < 25
                  ? 'BMI is NORMAL'
                  : 'BMI is HIGH'}
              </p>
            )}
          </div>
        )}
        {loading && <Loader />}
      </form>
    </div>
  );
}
