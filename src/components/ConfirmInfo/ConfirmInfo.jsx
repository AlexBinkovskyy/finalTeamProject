import { Link } from 'react-router-dom';
import css from './ConfirmInfo.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { resendMail } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';

export default function ConfirmInfo() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleClick = user => {
    dispatch(resendMail({ email: user.email }));
  };

  return (
    <div>
      <h1 className={css.title}>Confirm Your Email Address</h1>
      <div className={css.div}>
        <p>
          Before you can sign in and access all the features of our service, you
          need to confirm your email address.
        </p>
        <p>
          We've sent you an email to the address you provided with instructions
          on how to confirm. Please check your inbox (including your "Spam"
          folder), find the email from us, and follow the instructions inside.
        </p>
        <p>
          If you haven't received the email, you can{' '}
          <Link to="/resend-page" className={css.btn}>
            {' '}
            request to resend
          </Link>{' '}
          it.
        </p>
        <p>
          Once your email address is confirmed, you'll be resend to our main
          page.
        </p>
      </div>
      <Link to="/signin" className={css.link}>
        Got It
      </Link>{' '}
    </div>
  );
}
