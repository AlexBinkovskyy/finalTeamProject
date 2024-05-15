import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import css from './WaterForm.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

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
    if (waterAmount >= 50) {
      setWaterAmount(prevAmount => prevAmount - 50);
    } else {
      setWaterAmount(0);
    }
  };

  const handleInputChange = event => {
    const { value } = event.target;
    if (parseInt(value) >= 0) {
      setWaterAmount(parseInt(value));
    }
  };
  const [currentTime, setCurrentTime] = useState(dayjs()); 

  const handleTimeChange = (newValue) => {
    setCurrentTime(newValue); 
    setValue('time', newValue); 
  }

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <form className={css.waterForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.inputGroup}>
        <label htmlFor="waterAmount" className={css.inputParagraph}>Amount of water:</label>
        <div className={css.buttonsContainer}>
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DesktopTimePicker']}>
            <DemoItem label="" className={css.inputParagraph}>Recording time:
            <DesktopTimePicker
            value={currentTime}
            // className={css.inputTime}
            onChange={handleTimeChange}
            renderInput={(params) => <input {...params} />}
          />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </div>
      {/* {errors && errors.time && <p>{errors.time.message}</p>} */}
      <div className={css.inputGroupWater}>
        <label htmlFor="water" className={css.labelWater}>Enter the value of water used:</label>
        <input
          type="number"
          name="waterAmount"
          className={css.waterInput}
          onChange={handleInputChange}
          min="0"
        />
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
