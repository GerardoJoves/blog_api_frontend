import { Moon, Search, Sun } from 'lucide-react';
import { useContext } from 'react';

import ThemeContext from '../ThemeContext';

export default function Actions() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="flex gap-4">
      <button type="button">
        <Search />
      </button>
      <button type="button" onClick={toggleTheme}>
        {theme === 'light' ? <Moon /> : <Sun />}
      </button>
    </div>
  );
}
