import { useContext } from 'react';
import { ToastContainer, Flip } from 'react-toastify';
import { ThemeContext } from '../ThemeContext';
import 'react-toastify/dist/ReactToastify.css';

const ThemedToastContainer = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <ToastContainer
      hideProgressBar={true}
      position="top-center"
      transition={Flip}
      theme={theme}
      autoClose={3000}
    />
  );
};
export default ThemedToastContainer;
