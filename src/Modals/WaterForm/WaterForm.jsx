import css from './WaterForm.module.css';
import * as yup from 'yup';

const schema = yup.object().shape({
  waterAmount: yup.number().positive().required(),
  time: yup.string().required(),
  keyboardWaterAmount: yup.number().positive().required(),
});

export default function WaterForm() {
  return <></>;
}
