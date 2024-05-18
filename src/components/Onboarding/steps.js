const commonStyle = {
  backgroundColor: 'black',
  color: 'white',
};

const steps = [
  {
    selector: '[data-tut="reactour__waterbtn"]',
    content: 'Watch out for the amount of water drunk', //Слідкуйте за кількість випитої води
    style: commonStyle,
  },
  {
    selector: '[data-tut="reactour__buttoncalendar"]',
    content: `Achieve daily goal`, //досягнення щоденної мети
    style: commonStyle,
  },
  {
    selector: '[data-tut="reactour__btnuserbar"]',
    content: `Calculate daily intake`, //розрахувати добове споживання
    style: commonStyle,
  },
  {
    selector: '[data-tut="reactour__waterlist"]',
    content: `Adjust with one slide`, //налаштувати за допомогою одного слайда
    style: commonStyle,
  },
];

export default steps;
