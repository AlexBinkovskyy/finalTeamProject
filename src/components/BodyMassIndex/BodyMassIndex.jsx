import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import BMIImage from '../../image/BMI.png';
import Loader from '../../components/Loader/Loader';
import getBmiResult from 'components/utils/getBmiResult ';
import getColorClass from 'components/utils/getColorClassForBmi';
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
  const [bmiData, setBmiData] = useState(null);
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
    const storedData = JSON.parse(localStorage.getItem('bmiData'));
    if (storedData) {
      setBmiData(storedData);
      setValue('weight', storedData.weight);
      setValue('height', storedData.height);
    } else if (userInfo) {
      setValue('weight', userInfo.weight || 0);
      setValue('height', 0);
    }
  }, [userInfo, setValue]);

  function onSubmit(data) {
    setLoading(true);
    try {
      const { weight, height } = data;

      if (!weight || !height) {
        setDataError('Please enter both weight and height.');
        setLoading(false);
        return;
      }

      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      const newBmiData = { weight, height, bmiValue: bmi.toFixed(1) };
      localStorage.setItem('bmiData', JSON.stringify(newBmiData));
      setBmiData(newBmiData);
      setDataError('');
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const bmiColorClass = getColorClass(parseFloat(bmiData?.bmiValue));

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
            <div className={`${css.formGroup} ${css.weightInput}`}>
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
                <span className={`${css.weightError} ${css.error}`}>
                  Weight is required
                </span>
              )}
            </div>
            <div className={`${css.formGroup} ${css.heightInput}`}>
              <label htmlFor="height" className={css.label}>
                Height (cm):
              </label>
              <input
                type="number"
                min="40"
                max="300"
                id="height"
                {...register('height', { value: bmiData?.height })}
                className={css.input}
                autoComplete="height"
              />
              {errors.height && (
                <span className={`${css.heightError} ${css.error}`}>
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
        {bmiData && (
          <div className={css.result}>
            <div className={css.thumb}>
              <img src={BMIImage} alt="Body mass index" className={css.image} />
            </div>
            <p className={`${css.value} ${css[bmiColorClass]}`}>
              {bmiData.bmiValue}
            </p>
            {bmiData !== null && (
              <p className={`${css.indexMessage} ${css[bmiColorClass]}`}>
                {bmiData.bmiValue} - {getBmiResult(bmiData.bmiValue)}
              </p>
            )}
          </div>
        )}
        {loading && <Loader />}
      </form>
    </div>
  );
}
