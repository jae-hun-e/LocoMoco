import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ThemeStore {
  theme: string;
  toggleTheme: (theme: string) => void;
}
export const useThemeStore = create<ThemeStore>()(
  devtools(
    persist(
      (set) => ({
        theme: 'light',
        toggleTheme: (theme: string) => set({ theme: theme === 'light' ? 'dark' : 'light' }),
      }),
      {
        name: 'current-theme',
      },
    ),
  ),
);
