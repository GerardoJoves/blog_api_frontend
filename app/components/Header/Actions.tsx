import { Moon, Search, Sun } from 'lucide-react';
import { useContext } from 'react';

import ThemeContext from '../ThemeContext';

type ActionsProps = {
  onOpenSearchModal: () => void;
};

export default function Actions({ onOpenSearchModal }: ActionsProps) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="flex gap-4">
      <button
        type="button"
        onClick={onOpenSearchModal}
        className="hover:cursor-pointer"
      >
        <Search />
      </button>
      <button
        type="button"
        onClick={toggleTheme}
        className="hover:cursor-pointer"
      >
        {theme === 'light' ? <Moon /> : <Sun />}
      </button>
    </div>
  );
}
