import { Link } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';

export default function WelcomeSection() {
  return (
    <section>
      <Logo />
      <h3>Record daily water intake and track</h3>
      <h1>Water consumption tracker</h1>
      <Link to="/signup">Try tracker</Link>
      <Link to="/signin">Sign in</Link>
    </section>
  );
}
