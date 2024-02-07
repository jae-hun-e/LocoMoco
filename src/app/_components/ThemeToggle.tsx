'use client';

import { useState } from 'react';
import { useThemeStore } from '@/store/themeStore';
import { MoonIcon, SunIcon } from 'lucide-react';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // todo: zustand 에시 코드임 merge 시 삭제 할 겁니다.  [24/02/07]
  const { theme, toggleTheme } = useThemeStore((state) => state);
  console.log('currnet theme', theme);

  const darkModeHandler = () => {
    setIsDarkMode(!isDarkMode);

    // todo: zustand 에시 코드임 merge 시 삭제 할 겁니다.  [24/02/07]
    toggleTheme(theme);

    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return <button onClick={darkModeHandler}>{isDarkMode ? <MoonIcon /> : <SunIcon />}</button>;
};

export default ThemeToggle;
