import ThemeToggle from '@/app/_components/ThemeToggle';
import { AlignJustifyIcon, ChevronLeftIcon } from 'lucide-react';

const Header = () => {
  return (
    <div className="flex h-14 w-full items-center justify-around">
      <ChevronLeftIcon />
      <div>LocoMoco</div>
      <AlignJustifyIcon />
      <ThemeToggle />
    </div>
  );
};

export default Header;
