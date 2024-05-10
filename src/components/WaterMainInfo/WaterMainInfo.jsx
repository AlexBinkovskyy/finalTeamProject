import Logo from 'components/Logo/Logo';
import css from './WaterMainInfo.module.css';
import WaterDailyNorma from 'components/WaterDailyNorma/WaterDailyNorma';
import WaterProgressBar from 'components/WaterProgressBar/WaterProgressBar';
import AddWaterBtn from 'components/AddWaterBtn/AddWaterBtn';
// import imagemob1x from '../../image/transparent_bottle_for_water_mob@1x.png';
// import imagemob2x from '../../image/transparent_bottle_for_water_mob@2x.png';
// import imagetab1x from '../../image/transparent_bottle_for_water_tab@1x.png';
// import imagetab2x from '../../image/transparent_bottle_for_water_tab@2x.png';
// import imagedesk1x from '../../image/transparent_bottle_for_water_desk@1x.png';
// import imagedesk2x from '../../image/transparent_bottle_for_water_desk@2x.png';

export default function WaterMainInfo() {
  return (
    <div className={css.MainInfo}>
      <div className={css.WaterMainInfo}>
        {/* <picture>
          <source srcset={`${imagemob1x}`} />
          <source media="(min-width: 768px)" srcset={`${imagetab1x}`} />
          <source media="(min-width: 1440px)" srcset={`${imagedesk1x}`} />
          <img
            className={css.backgroundImage}
            src={imagemob1x}
            alt="опис малюнка"
            width={262}
            height={335}
          />
        </picture> */}
        {/* <div className={css.content}> */}
        <Logo />
        <WaterDailyNorma />
        <WaterProgressBar />
        <AddWaterBtn />
        {/* </div> */}
      </div>
    </div>
  );
}
