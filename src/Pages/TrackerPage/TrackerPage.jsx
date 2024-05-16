import WaterDetailedInfo from 'components/WaterMainInfo/WaterMainInfo';
import WaterMainInfo from 'components/WaterDetailedInfo/WaterDetailedInfo';
import { useDispatch, useSelector } from 'react-redux';
import { selectVerified } from '../../redux/auth/selectors';
import { useEffect } from 'react';
import { refreshUser } from '../../redux/auth/operations';
import { useNavigate } from 'react-router-dom';
import { tokenIsInvalid } from '../../redux/auth/slice';
import css from './TrackerPage.module.css';

export default function TrackerPage() {
  const checkVerify = useSelector(selectVerified);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkVerify) {
      dispatch(refreshUser()).then(response => {
        if (response.type === 'auth/refresh/rejected')
          dispatch(tokenIsInvalid());
        navigate('/signin');
      });
    }
  }, [dispatch, navigate, checkVerify]);

  return !checkVerify ? (
    <b>Refreshing user...</b>
  ) : (
    <>
      <div className={css.TrackerPage}>
        <WaterDetailedInfo />
        <WaterMainInfo />
      </div>
    </>
  );
}
