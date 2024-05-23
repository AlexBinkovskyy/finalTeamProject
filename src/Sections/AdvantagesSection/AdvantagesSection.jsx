import React from 'react';
import css from './AdvantagesSection.module.css';
import HappyCostumers from 'components/HappyCostumers/HappyCostumers';
import imageMob1x from '../../image/rectangle_mob@1x.jpg';
import imageMob2x from '../../image/rectangle_mob@2x.jpg';
import imageTab1x from '../../image/rectangle_tab@1x.jpg';
import imageTab2x from '../../image/rectangle_tab@2x.jpg';
import imageDesc1x from '../../image/rectangle_desk@1x.jpg';
import imageDesc2x from '../../image/rectangle_desk@2x.jpg';
import { useSpring, animated } from 'react-spring';

export default function AdvantagesSection() {
  const [props, set] = useSpring(() => ({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  const handleMouseMove = event => {
    const { clientX: x, clientY: y } = event;
    const xPos = x / window.innerWidth - 0.5;
    const yPos = y / window.innerHeight - 0.5;
    const scale = 1 + Math.abs(xPos) * 0.1 + Math.abs(yPos) * 0.1;

    set({
      transform: `perspective(1000px) rotateX(${yPos * 5}deg) rotateY(${
        xPos * 5
      }deg) scale(${scale})`,
    });
  };

  const handleMouseLeave = () => {
    set({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.02)',
    });
  };

  return (
    <section className={css.sectionAdvantages}>
      <div className={css.container}>
        <animated.picture
          className={css.picture}
          style={props}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <source
            media="(min-width: 1440px)"
            srcSet={`${imageDesc1x}, ${imageDesc2x} 2x`}
          />
          <source
            media="(min-width: 768px)"
            srcSet={`${imageTab1x}, ${imageTab2x} 2x`}
          />
          <img
            src={imageMob1x}
            srcSet={`${imageMob1x}, ${imageMob2x} 2x`}
            alt="Background"
            className={css.image}
          />
        </animated.picture>
        <div className={css.contentContainer}>
          <div className={css.customers}>
            <HappyCostumers />
            <p className={css.elements}>
              <span className={css.line}>
                Our <span className={css.happy}>happy</span>
              </span>
              <span className={css.line}>customers</span>
            </p>
          </div>
          <div className={css.staticElements}>
            <div className={css.list}>
              <div className={`${css.drive} ${css.hoverEffect}`}>
                <div className={css.driveText}>
                  <div className={css.circle}></div>
                  <p>Habit drive</p>
                </div>
                <div className={`${css.hoverImage} ${css.imageDrive}`} />
              </div>
              <div className={`${css.statistics} ${css.hoverEffect}`}>
                <p className={css.statisticsText}>View statistics</p>
                <div className={`${css.hoverImage} ${css.imageStatistics}`} />
              </div>
            </div>
            <div className={`${css.setting} ${css.hoverEffect}`}>
              <p className={css.settingText}>Personal rate setting</p>
              <div className={`${css.hoverImage} ${css.imageSetting}`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
