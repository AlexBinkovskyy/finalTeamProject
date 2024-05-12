// import css from './WaterForm.module.css';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  waterAmount: Yup.number()
    .required('Water amount is required')
    .positive('Water amount must be positive'),
    time: Yup.string() 
    .required('Time is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format'),
});

const WaterForm = () => {
  // const { register, handleSubmit, errors } = useForm({
  //   validationSchema: schema,
  // });
  // console.log(errors);

  // const onSubmit = data => {
  //   console.log(data); 
  // };

  const [waterAmount, setWaterAmount] = useState(50); // Значення води за замовчуванням - 50ml
  // const [currentTime, setCurrentTime] = useState(getCurrentTime());

  // function getCurrentTime() {
  //   const now = new Date();
  //   const hour = now.getHours().toString().padStart(2, '0');
  //   const minute = now.getMinutes().toString().padStart(2, '0');
  //   return `${hour}:${minute}`;
  // }

  const handleIncrement = () => {
    setWaterAmount(prevAmount => prevAmount + 50);
  };

  const handleDecrement = () => {
    if (waterAmount > 0) {
      setWaterAmount(prevAmount => prevAmount - 50);
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setWaterAmount(parseInt(value) || 0);
  };

  return (
    <form >
      <div>
        <label htmlFor="waterAmount">Amount of water:</label>
        <div>
          <button type="button" onClick={handleDecrement}>-</button>
          <span onChange={handleInputChange}>{waterAmount} ml </span>
          <button type="button" onClick={handleIncrement}>+</button>
        </div>
      </div>
      <div>
        <label htmlFor="time">Recording time:</label>
        <input type="text" name="time"  />
        
      </div>
      <div>
        <label htmlFor="water">Enter the value of water used:</label>
        <input type="number" name="waterAmount" onChange={handleInputChange} />
        
      </div>
      <div>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default WaterForm;
