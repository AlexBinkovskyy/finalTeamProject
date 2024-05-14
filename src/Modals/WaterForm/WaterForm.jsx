import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import css from './WaterForm.module.css';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = Yup.object().shape({
  waterAmount: Yup.number()
    .required('Water amount is required')
    .positive('Water amount must be positive'),
  time: Yup.string()
    .required('Time is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format'),
});

const WaterForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [waterAmount, setWaterAmount] = useState(50);

  const handleIncrement = () => {
    setWaterAmount(prevAmount => prevAmount + 50);
  };

  const handleDecrement = () => {
    if (waterAmount > 0) {
      setWaterAmount(prevAmount => prevAmount - 50);
    }
  };

  const handleInputChange = event => {
    const { value } = event.target;
    setWaterAmount(parseInt(value) || 0);
    setValue('time', getCurrentTime());
  };
  
  const getCurrentTime = () => {
    const now = new Date();
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    return `${hours}:${minutes}`;
  };

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <form className={css.waterForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.inputGroup}>
        <label htmlFor="waterAmount">Amount of water:</label>
        <div>
          <button
            type="button"
            onClick={handleDecrement}
            className={css.buttonIncrement}
          >
            -
          </button>
          <span className={css.waterAmount}>{waterAmount} ml </span>
          <button
            type="button"
            onClick={handleIncrement}
            className={css.buttonIncrement}
          >
            +
          </button>
        </div>
        {errors && errors.waterAmount && <p>{errors.waterAmount.message}</p>}
      </div>
      <div className={css.inputGroup}>
        <label htmlFor="time">Recording time:</label>
        <input type="text" name="time" defaultValue={getCurrentTime()} />
      </div>
      {/* {errors && errors.time && <p>{errors.time.message}</p>} */}
      <div className={css.inputGroup}>
        <label htmlFor="water">Enter the value of water used:</label>
        <input type="number" name="waterAmount" onChange={handleInputChange} />
      </div>
      <div>
        <button type="submit" className={css.saveBtn}>
          Save
        </button>
      </div>
    </form>
  );
};

export default WaterForm;
