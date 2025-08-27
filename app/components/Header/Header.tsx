import Actions from './Actions';
import AuthNav from './AuthNav';
import Logo from '../Logo';
import Nav from './Nav';
import { Menu, X } from 'lucide-react';

type HeaderProps = {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onOpenSearchModal: () => void;
};

export default function Header({
  onToggleMenu,
  isMenuOpen,
  onOpenSearchModal,
}: HeaderProps) {
  return (
    <header
      className={`relative z-10 bg-white dark:bg-gray-950 ${isMenuOpen ? '' : 'border-b'} border-neutral-400 dark:border-gray-700`}
    >
      <div className="flex px-2 sm:px-10 lg:px-14 max-w-7xl mx-auto h-20">
        <div className="flex items-center gap-12">
          <Logo />
          <div className="hidden md:block">
            <Nav />
          </div>
        </div>
        <div className="flex ml-auto items-center gap-4">
          <Actions onOpenSearchModal={onOpenSearchModal} />
          <div className="hidden md:block">
            <AuthNav />
          </div>
          <button
            type="button"
            onClick={onToggleMenu}
            className="hover:cursor-pointer md:hidden"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
