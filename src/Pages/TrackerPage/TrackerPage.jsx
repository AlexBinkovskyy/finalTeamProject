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
import { TipOfTheDay } from 'components/utils/TipOfTheDay/TipOfTheDay';

const TrackerPage = () => {
  return (
    <TourProvider steps={steps} styles={tourStyles}>
      <TrackerPageContent />
    </TourProvider>
  );
};

const TrackerPageContent = () => {
  const checkVerify = useSelector(selectVerified);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setIsOpen } = useTour();

  if (checkVerify) TipOfTheDay();

  useEffect(() => {
    if (!localStorage.getItem('i18nextLng')) {
      localStorage.setItem('i18nextLng', 'en');
    }

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
