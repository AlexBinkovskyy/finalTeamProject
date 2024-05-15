import AdvantagesSection from 'Sections/AdvantagesSection/AdvantagesSection';
import WelcomeSection from 'Sections/WelcomeSection/WelcomeSection';
import css from './HomePage.module.css';
import { useDispatch } from 'react-redux';
import { verifyEmailSuccess } from '../../redux/auth/slice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function HomePage() {
  const storedData = JSON.parse(localStorage.getItem('persist:auth'));
  console.log(storedData);
  // const token = storedData.token;
  // console.log(token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (storedData && storedData.token !== 'null') {
      dispatch(verifyEmailSuccess());
      console.log('Inside');
      navigate('/tracker');
    }
  }, [dispatch, navigate, storedData]);

  return (
    <>
      <div className={css.sections_home}>
        <WelcomeSection />
        <AdvantagesSection />
      </div>
    </>
  );
}
