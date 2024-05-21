import React from 'react';
import css from './AdvantagesSection.module.css';
import HappyCostumers from 'components/HappyCostumers/HappyCostumers';

export default function AdvantagesSection() {
  return (
    <section className={css.sectionAdvantages}>
      <div className={css.container}>
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
