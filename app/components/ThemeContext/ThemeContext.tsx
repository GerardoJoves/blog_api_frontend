import { createContext } from 'react';

type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {
    console.warn(
      'toggleTheme was called outside of a ThemeContext provider. Please ensure your component is wrapped in <ThemeContext value={...}>.',
    );
  },
});

export default ThemeContext;
