export default function getColorClass(bmi) {
  if (bmi < 18.5) {
    return 'blueText';
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'greenText';
  } else if (bmi >= 25) {
    return 'redText';
  } else {
    return '';
  }
}
