import Actions from './actions';
import AuthNav from './AuthNav';
import Logo from './Logo';
import Nav from './Nav';

export default function Header() {
  return (
    <header>
      <Logo />
      <Nav />
      <Actions />
      <AuthNav />
    </header>
  );
}
