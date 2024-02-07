'use client';

import { useState } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const darkModeHandler = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return <button onClick={darkModeHandler}>{isDarkMode ? <MoonIcon /> : <SunIcon />}</button>;
};

export default ThemeToggle;
