import Actions from './Actions';
import AuthNav from './AuthNav';
import Logo from '../Logo';
import Nav from './Nav';
import MobileMenu from './MobileMenu';

export default function Header() {
  return (
    <header className="sticky top-0 z-100 bg-white dark:bg-gray-950 border-b border-neutral-400 dark:border-gray-700">
      <div className="flex px-4 sm:px-10 lg:px-14 max-w-7xl mx-auto h-[80px]">
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
      </div>
    </header>
  );
}
