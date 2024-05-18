export default function WaterProgressBarStyle({ progressProc }) {
  switch (progressProc) {
    case 10:
    case 20:
      return 2;
    case 40:
      return window.matchMedia('(min-width: 768px)').matches ? -1.5 : -4;
    case 60:
    case 70:
      return -5;
    case 80:
      return -7;
    case 90:
      return window.matchMedia('(min-width: 768px)').matches ? -12 : -15;
    default:
      return -1;
  }
}
