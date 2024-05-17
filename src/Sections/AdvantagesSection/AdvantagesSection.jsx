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
              <p className={css.drive}>
                <span className={css.circle}>
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="4" cy="4" r="4" fill="#9BE1A0" />
                  </svg>
                </span>
                Habit drive
              </p>
              <div className={css.statistics}>
                <p className={css.statisticsText}>View statistics</p>
              </div>
            </div>
            <div className={css.setting}>
              <p className={css.settingText}>Personal rate setting</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
