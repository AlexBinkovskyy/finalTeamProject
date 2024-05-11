export default function WaterProgressBarStyle({ progress }) {
  switch (progress) {
    case 0.1:
    case 0.2:
      return 2;
    case 0.4:
      return window.matchMedia('(min-width: 768px)').matches ? -1.5 : -4;
    case 0.6:
    case 0.7:
      return -4;
    case 0.8:
      return -7;
    case 0.9:
      return window.matchMedia('(min-width: 768px)').matches ? -12 : -15;
    default:
      return 1;
  }
}
