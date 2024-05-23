export default function getBmiResult(bmiValue) {
  if (bmiValue < 16) {
    return 'Severe Thinness';
  } else if (bmiValue >= 16 && bmiValue <= 16.9) {
    return 'Moderate Thinness';
  } else if (bmiValue >= 17 && bmiValue <= 18.4) {
    return 'Mild Thinness';
  } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
    return 'Normal';
  } else if (bmiValue >= 25 && bmiValue <= 29.9) {
    return 'Overweight';
  } else if (bmiValue >= 30 && bmiValue <= 34.9) {
    return 'Obese Class I';
  } else if (bmiValue >= 35 && bmiValue <= 39.9) {
    return 'Obese Class II';
  } else if (bmiValue >= 40) {
    return 'Obese Class III';
  }
  return '';
}
