import i18n from 'i18next';

export default function getBmiResult(bmiValue) {
  const t = i18n.t.bind(i18n);
  if (bmiValue < 16) {
    return t('BMI.SevereThinness');
  } else if (bmiValue >= 16 && bmiValue <= 16.9) {
    return t('BMI.ModerateThinness');
  } else if (bmiValue >= 17 && bmiValue <= 18.4) {
    return t('BMI.MildThinness');
  } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
    return t('BMI.Normal');
  } else if (bmiValue >= 25 && bmiValue <= 29.9) {
    return t('BMI.Overweight');
  } else if (bmiValue >= 30 && bmiValue <= 34.9) {
    return t('BMI.ObeseClassI');
  } else if (bmiValue >= 35 && bmiValue <= 39.9) {
    return t('BMI.ObeseClassII');
  } else if (bmiValue >= 40) {
    return t('BMI.ObeseClassIII');
  }
  return '';
}
