import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { GrPowerReset } from 'react-icons/gr';
import { FaRegSave } from 'react-icons/fa';
import { FaCalculator } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { updateUserSettings } from '../../redux/auth/operations';
import BMIImage from '../../image/BMI.png';
import Loader from '../../components/Loader/Loader';
import getBmiResult from 'components/utils/getBmiResult ';
import getColorClass from 'components/utils/getColorClassForBmi';
import css from './BodyMassIndex.module.css';
import { useTranslation } from 'react-i18next';

const schema = yup.object().shape({
  weight: yup
    .number()
    .required('Weight is required')
    .min(0, 'Weight must be a positive number'),
  height: yup
    .number()
    .required('Height is required')
    .min(40, 'Height must be greater than or equal to 40')
    .max(260, 'Height must be a realistic number'),
});

export default function BodyMassIndex() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUser);
  const [bmiValue, setBmiValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataError, setDataError] = useState('');
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      weight: 0,
      height: 0,
    },
  });

  useEffect(() => {
    if (userInfo) {
      const { weight, height, bmi } = userInfo;
      setValue('weight', weight || 0);
      setValue('height', height || 0);
      setBmiValue(bmi || '');
    }
  }, [userInfo, setValue]);

  const calculateBMI = data => {
    const { weight, height } = data;

    if (!weight || !height) {
      setDataError('Please enter both weight and height.');
      return;
    }

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    setBmiValue(bmi.toFixed(1));
    setDataError('');
  };

  const saveBMI = async e => {
    e.preventDefault();
    if (bmiValue === null) {
      setDataError('Please calculate your BMI first.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    console.log(bmiValue);
    formData.append('bmi', bmiValue);

    try {
      dispatch(updateUserSettings(formData));
    } catch (error) {
      console.error('Failed to update user settings', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = () => {
    if (dataError) {
      setDataError('');
    }
  };

  const onReset = () => {
    reset();
    setBmiValue(null);
    setDataError('');
  };

  const bmiColorClass = getColorClass(parseFloat(bmiValue));

  return (
    <div className={css.wrapper}>
      <form onSubmit={handleSubmit(calculateBMI)} className={css.form}>
        <p className={css.text}>
        {t('BMI.BMIpar')}
        </p>
        <div className={css.formElements}>
          <div className={css.labels}>
            <div className={`${css.formGroup} ${css.weightInput}`}>
              <label htmlFor="weight" className={css.label}>
                {t('modals.weight')}
              </label>
              <input
                type="number"
                min="0"
                id="weight"
                {...register('weight')}
                className={css.input}
                autoComplete="weight"
                onInput={handleInputChange}
              />
              {errors.weight && errors.weight.type === 'typeError' ? (
                <span className={`${css.weightError} ${css.error}`}>
                  Weight is required
                </span>
              ) : (
                <span className={`${css.weightError} ${css.error}`}>
                  {errors.weight?.message}
                </span>
              )}
            </div>
            <div className={`${css.formGroup} ${css.heightInput}`}>
              <label htmlFor="height" className={css.label}>
              {t('modals.height')}
              </label>
              <input
                type="number"
                min="40"
                max="260"
                id="height"
                {...register('height')}
                className={css.input}
                autoComplete="height"
                onInput={handleInputChange}
              />
              {errors.height && errors.height.type === 'typeError' ? (
                <span className={`${css.heightError} ${css.error}`}>
                  Height is required
                </span>
              ) : (
                <span className={`${css.heightError} ${css.error}`}>
                  {errors.height?.message}
                </span>
              )}
            </div>
          </div>
          <ul className={css.buttons}>
            <li className={css.buttonsItem}>
              <button type="submit" className={css.btn} disabled={loading}>
                {loading ? (
                  'Calculating...'
                ) : (
                  <FaCalculator className={css.resetIcon} />
                )}
              </button>
            </li>
            <li className={css.buttonsItem}>
              <button
                type="button"
                className={`${css.btn} ${css.resetBtn}`}
                onClick={onReset}
                disabled={loading}
              >
                <GrPowerReset className={css.resetIcon} />
              </button>
            </li>
            <li className={css.buttonsItem}>
              <button
                type="button"
                className={css.btn}
                onClick={saveBMI}
                disabled={loading || bmiValue === null}
              >
                <FaRegSave className={css.resetIcon} />
              </button>
            </li>
          </ul>
          {dataError && (
            <span className={`${css.error} ${css.errorData}`}>{dataError}</span>
          )}
        </div>
        {bmiValue && (
          <div className={css.result}>
            <div className={css.thumb}>
              <img src={BMIImage} alt="Body mass index" className={css.image} />
            </div>
            <p className={`${css.value} ${css[bmiColorClass]}`}>{bmiValue}</p>
            {bmiValue !== null && (
              <p className={`${css.indexMessage} ${css[bmiColorClass]}`}>
                {bmiValue} - {getBmiResult(bmiValue)}
              </p>
            )}
          </div>
        )}
        {loading && <Loader />}
      </form>
    </div>
  );
}
