import Logo from 'components/Logo/Logo';
import css from './WaterMainInfo.module.css';
import WaterDailyNorma from 'components/WaterDailyNorma/WaterDailyNorma';
import WaterProgressBar from 'components/WaterProgressBar/WaterProgressBar';
import AddWaterBtn from 'components/AddWaterBtn/AddWaterBtn';

export default function WaterMainInfo() {
  return (
    <div className={css.MainInfo}>
      <div className={css.WaterMainInfo}>
        <Logo />
        <WaterDailyNorma />
        <WaterProgressBar />
        <AddWaterBtn />
      </div>
    </div>
  );
}
