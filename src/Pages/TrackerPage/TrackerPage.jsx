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

const TrackerTour = () => {
  return (
    <TourProvider
      steps={steps}
      styles={{
        tooltip: base => ({
          ...base,
          backgroundColor: 'black',
          color: 'white',
        }),
      }}
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
      <div className={css.TrackerPage}>
        <WaterDetailedInfo className="first-step" />
        <WaterMainInfo className="second-step" />
        <TourButton />
      </div>
    </>
  );
};

const TourButton = () => {
  const { setIsOpen } = useTour();

  return <button onClick={() => setIsOpen(true)}>Почати Тур</button>;
};

export default TrackerTour;
