import Actions from './Actions';
import AuthNav from './AuthNav';
import Logo from './Logo';
import Nav from './Nav';

export default function Header() {
  return (
    <header className="flex px-18 py-4 border-b border-gray-800">
      <div className="flex items-center gap-12">
        <Logo />
        <Nav />
      </div>
      <div className="flex ml-auto items-center gap-4">
        <Actions />
        <AuthNav />
      </div>
    </header>
  );
}
