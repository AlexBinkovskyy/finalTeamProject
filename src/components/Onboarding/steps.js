const steps = [
  {
    selector: '[data-tut="reactour__fiststep"]',
    content: 'Welcome to the AquaTrack',
    position: 'center',
  },
  {
    selector: '[data-tut="reactour__waterbtn"]',
    content: 'Easy to add amount of water', //Слідкуйте за кількістю випитої води
    position: 'left',
  },
  {
    selector: '[data-tut="reactour__waterprogress"]',
    content: `Achieve daily goal`, //досягнення щоденної мети
  },
  {
    selector: '[data-tut="reactour__btnuserbar"]',
    content: `Calculate daily intake`, //розрахувати добове споживання
  },
  {
    selector: '[data-tut="reactour__waterlist"]',
    content: `Adjust with one slide`, //налаштувати за допомогою одного слайда
  },
  {
    selector: '[data-tut="reactour__statistic"]',
    content: 'Track detailed history',
    position: 'left',
  },
];

export default steps;
