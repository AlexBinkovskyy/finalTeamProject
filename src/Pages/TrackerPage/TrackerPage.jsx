import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TourProvider, useTour } from '@reactour/tour';

import WaterDetailedInfo from 'components/WaterMainInfo/WaterMainInfo';
import WaterMainInfo from 'components/WaterDetailedInfo/WaterDetailedInfo';
import { selectVerified } from '../../redux/auth/selectors';
import { refreshUser } from '../../redux/auth/operations';
import { tokenIsInvalid } from '../../redux/auth/slice';

import steps from '../../components/Onboarding/steps.js';

import css from './TrackerPage.module.css';
import tourStyles from 'components/Onboarding/StylesTour';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const TrackerPage = () => {
  const disableBody = target => disableBodyScroll(target);
  const enableBody = target => enableBodyScroll(target);
  return (
    <TourProvider
      steps={steps}
      styles={tourStyles}
      afterOpen={disableBody}
      beforeClose={enableBody}
    >
      <TrackerPageContent />
    </TourProvider>
  );
};

const TrackerPageContent = () => {
  const checkVerify = useSelector(selectVerified);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setIsOpen } = useTour();

  useEffect(() => {
    if (!checkVerify) {
      dispatch(refreshUser()).then(response => {
        if (response.type === 'auth/refresh/rejected')
          dispatch(tokenIsInvalid());
        navigate('/signin');
      });
    } else {
      const isFirstVisit = localStorage.getItem('isFirstVisitTrackerPage');
      if (!isFirstVisit) {
        setIsOpen(true);
        localStorage.setItem('isFirstVisitTrackerPage', 'true');
      }
    }
  }, [dispatch, navigate, checkVerify, setIsOpen]);

  return !checkVerify ? (
    <b>Refreshing user...</b>
  ) : (
    <>
      <div className={css.TrackerPage} data-tut="reactour__fiststep">
        <WaterDetailedInfo />
        <WaterMainInfo />
      </div>
    </>
  );
};

export default TrackerPage;
