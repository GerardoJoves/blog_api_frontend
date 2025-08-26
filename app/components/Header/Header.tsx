import Actions from './Actions';
import AuthNav from './AuthNav';
import Logo from '../Logo';
import Nav from './Nav';
import { Menu } from 'lucide-react';

type HeaderProps = {
  onToggleMenu: () => void;
};

export default function Header({ onToggleMenu }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-950 border-b border-neutral-400 dark:border-gray-700">
      <div className="flex px-2 sm:px-10 lg:px-14 max-w-7xl mx-auto h-20">
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
          <button
            type="button"
            onClick={onToggleMenu}
            className="hover:cursor-pointer md:hidden"
          >
            <Menu />
          </button>
        </div>
      </div>
    </header>
  );
}
