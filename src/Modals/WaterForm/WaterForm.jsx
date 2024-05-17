// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import * as Yup from 'yup';
// import css from './WaterForm.module.css';
// import { yupResolver } from '@hookform/resolvers/yup';
// // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
// // import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// // import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// // import dayjs from 'dayjs';
// import { addConsumption } from  '../../redux/water/operations.js';
// import { useDispatch } from 'react-redux';

// // const schema = Yup.object().shape({
// //   waterAmount: Yup.number()
// //     .required('Water amount is required')
// //     .positive('Water amount must be positive'),
// //   time: Yup.string()
// //     .required('Time is required')
// //     .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format'),
// // });
// const schema = Yup.object().shape({
//   waterAmount: Yup.number()
//     .required('Water amount is required')
//     .positive('Water amount must be positive')
// });

// const WaterForm = () => {
//   const {
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     register,
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const [waterAmount, setWaterAmount] = useState(50);

//   useEffect(() => {
//     setValue('waterAmount', waterAmount);
//   }, [waterAmount, setValue]);

//   const handleIncrement = () => {
//     setWaterAmount(prevAmount => prevAmount + 50);
//   };

//   const handleDecrement = () => {
//     if (waterAmount >= 50) {
//       setWaterAmount(prevAmount => prevAmount - 50);
//     } else {
//       setWaterAmount(0);
//     }
//   };

//   const handleInputChange = event => {
//     const { value } = event.target;
//     if (parseInt(value) >= 0) {
//       setWaterAmount(parseInt(value));
//       setValue('waterAmount', parseInt(value));
//     }
//   };
//   // const [currentTime, setCurrentTime] = useState(dayjs()); 

//   // const handleTimeChange = (newValue) => {
//   //   setCurrentTime(newValue); 
//   //   setValue('time', newValue); 
//   // }

  
//   const dispatch = useDispatch();
//   // const onSubmit = async (event) => {
//   //   event.preventDefault();
    
//   //   const values = {
//   //     amount: event.target.amount.value,
//   //   };
    
//   //   dispatch(addConsumption(values));
//   // };
//   // const onSubmit = async (values) => {
//   //   console.log('Submitting data:', values);
//   //   dispatch(addConsumption(values));
//   // };
//   const onSubmit = async (data) => {
//     console.log('Submitting data:', { waterAmount: data.waterAmount }); // Лог для отладки
//     dispatch(addConsumption({ waterAmount: data.waterAmount }));
//   };

//   return (
//     <form className={css.waterForm}  onSubmit={handleSubmit(onSubmit)}>
//       <div className={css.inputGroup}>
//         <label htmlFor="waterAmount" className={css.inputParagraph} >Amount of water:</label>
//         <div className={css.buttonsContainer}>
//           <button
//             type="button"
//             onClick={handleDecrement}
//             className={css.buttonIncrement}
//           >
//             -
//           </button>
//           <span className={css.waterAmount}>{waterAmount} ml </span>
//           <button
//             type="button"
//             onClick={handleIncrement}
//             className={css.buttonIncrement}
//           >
//             +
//           </button>
//         </div>
//         {errors && errors.waterAmount && <p>{errors.waterAmount.message}</p>}
//       </div>
//       {/* <div className={css.inputGroup}>
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <DemoContainer components={['DesktopTimePicker']}>
//             <DemoItem label="" className={css.inputParagraph}>Recording time:
//             <DesktopTimePicker
//             value={currentTime}
//             // className={css.inputTime}
//             onChange={handleTimeChange}
//             {...register("time")}
//             renderInput={(params) => <input {...params} />}
//           />
//             </DemoItem>   
//           </DemoContainer>
//         </LocalizationProvider>
//       </div> */}
//       {/* {errors && errors.time && <p>{errors.time.message}</p>} */}
//       <div className={css.inputGroupWater}>
//         <label htmlFor="water" className={css.labelWater}>Enter the value of water used:</label>
//         <input
//           type="number"
//           name="waterAmount"
//           className={css.waterInput}
     
//           onChange={handleInputChange}
//           {...register("water")}
//           min="0"
         
//         />
//       </div>
//       <div>
//         <button type="submit" className={css.saveBtn}>
//           Save
//         </button>
//       </div>
//     </form>
//   );
// };

// export default WaterForm;
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import css from './WaterForm.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { addConsumption } from '../../redux/water/operations.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectDay } from '../../redux/water/selectors';

const schema = Yup.object().shape({
  waterAmount: Yup.number()
    .required('Water amount is required')
    .positive('Water amount must be positive'),
  time: Yup.string()
    .required('Time is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:mm)')
});

const WaterForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    register,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const date = useSelector(selectDay);
  console.log(date);

  const [waterAmount, setWaterAmount] = useState(50);
  const [time, setTime] = useState('');

  useEffect(() => { 
    setValue('waterAmount', waterAmount);
    setValue('time', time);
  }, [waterAmount, time, setValue]);

  const handleIncrement = () => {
    setWaterAmount(prevAmount => prevAmount + 50);
  };

  const handleDecrement = () => {
    setWaterAmount(prevAmount => Math.max(0, prevAmount - 50));
  };

  const handleInputChange = event => {
    const { value } = event.target;
    if (parseInt(value) >= 0) {
      setWaterAmount(parseInt(value));
    }
  };

  const handleTimeChange = event => {
    setTime(event.target.value);
  };

  const onSubmit = async (data) => {
    const postData = {
      date: date,
      time: data.time,
      amount: data.waterAmount
    };
    console.log('Submitting data:', postData); // Лог для отладки
    const result = await dispatch(addConsumption(postData));
    console.log('Result:', result); // Лог для проверки результата
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
        {errors.waterAmount && <p>{errors.waterAmount.message}</p>}
      </div>
      <div className={css.inputGroupWater}>
        <label htmlFor="waterAmount" className={css.labelWater}>Enter the value of water used:</label>
        <input
          type="number"
          name="waterAmount"
          className={css.waterInput}
          id="waterAmount"
          value={waterAmount}
          onChange={handleInputChange}
          {...register('waterAmount')}
          min="0"
        />
      </div>
      <div className={css.inputGroup}>
        <label htmlFor="time" className={css.inputParagraph}>Time:</label>
        <input
          type="text"
          name="time"
          className={css.timeInput}
          // value={time}
          onChange={handleTimeChange}
          {...register('time')}
        />
        {errors.time && <p>{errors.time.message}</p>}
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
