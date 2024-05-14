import React from 'react';
import css from './AdvantagesSection.module.css';
import group from '../../image/group.jpg';

export default function AdvantagesSection() {
  return (
    <section className={css.sectionAdvantages}>
      <div className={css.container}>
        <div className={css.contentContainer}>
          <div className={css.customers}>
            <img className={css.img_group} src={`${group}`} alt="group"></img>
            <p className={css.elements}>
              Our <span className={css.happy}>happy </span>
              customers
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
              <p className={css.statistics}>View statistics</p>
            </div>
            <p className={css.setting}>Personal rate setting</p>
          </div>
        </div>
      </div>
    </section>
  );
}
