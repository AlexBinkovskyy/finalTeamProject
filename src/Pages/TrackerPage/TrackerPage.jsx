import React, { useEffect, useState } from 'react';
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

const TrackerTour = () => {
  return (
    <TourProvider steps={steps} accentColor="#000000" styles={tourStyles}>
      <TrackerPageContent />
    </TourProvider>
  );
};

const TrackerPageContent = () => {
  const checkVerify = useSelector(selectVerified);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setIsOpen, currentStep, setCurrentStep } = useTour();

  const [isFirstVisit, setIsFirstVisit] = useState(
    !localStorage.getItem('isFirstVisitTrackerPage')
  );

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
  }, [dispatch, navigate, checkVerify, setIsOpen, isFirstVisit]);

  useEffect(() => {
    if (isFirstVisit && currentStep !== null) {
      const timer = setTimeout(() => {
        setCurrentStep(prevStep => {
          const nextStep = prevStep + 1;
          if (nextStep >= steps.length) {
            setIsOpen(false);
            setIsFirstVisit(false);
            return prevStep;
          }
          return nextStep;
        });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, setCurrentStep, isFirstVisit, setIsOpen]);

  return !checkVerify ? (
    <b>Refreshing user...</b>
  ) : (
    <>
      <div className={css.TrackerPage} data-tut="reactour__fiststep">
        <WaterDetailedInfo />
        <WaterMainInfo />
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
