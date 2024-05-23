import React from 'react';
import css from './AdvantagesSection.module.css';
import HappyCostumers from 'components/HappyCostumers/HappyCostumers';
import { useTranslation } from 'react-i18next';

export default function AdvantagesSection() {
  const { t } = useTranslation(); 
  return (
    <section className={css.sectionAdvantages}>
      <div className={css.container}>
        <div className={css.contentContainer}>
          <div className={css.customers}>
            <HappyCostumers />
            <p className={css.elements}>
              <span className={css.line}>
              {t('advantagesSection.our')} <span className={css.happy}>{t('advantagesSection.happy')}</span>
              </span>
              <span className={css.line}>{t('advantagesSection.customers')}</span>
            </p>
          </div>
          <div className={css.staticElements}>
            <div className={css.list}>
              <div className={`${css.drive} ${css.hoverEffect}`}>
                <div className={css.driveText}>
                  <div className={css.circle}></div>
                  <p>{t('advantagesSection.habitDrive')}</p>
                </div>
                <div className={`${css.hoverImage} ${css.imageDrive}`} />
              </div>
              <div className={`${css.statistics} ${css.hoverEffect}`}>
                <p className={css.statisticsText}>{t('advantagesSection.viewStatistics')}</p>
                <div className={`${css.hoverImage} ${css.imageStatistics}`} />
              </div>
            </div>
            <div className={`${css.setting} ${css.hoverEffect}`}>
              <p className={css.settingText}>{t('advantagesSection.personalRateSetting')}</p>
              <div className={`${css.hoverImage} ${css.imageSetting}`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
