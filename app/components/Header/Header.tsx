import Actions from './Actions';
import AuthNav from './AuthNav';
import Logo from './Logo';
import Nav from './Nav';
import MobileMenu from './MobileMenu';

export default function Header() {
  return (
    <header className="flex h-[80px] px-4 md:px-6 xl:px-18 border-b border-neutral-400 dark:border-gray-700">
      <div className="flex items-center gap-12">
        <Logo />
        <div className="hidden md:block">
          <Nav />
        </div>
      </div>
      <div className="flex ml-auto items-center gap-4">
        <Actions />
        <div className="hidden md:block">
          <AuthNav />
        </div>
        <MobileMenu />
      </div>
    </header>
  );
}
