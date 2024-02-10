import ThemeToggle from '@/app/_components/ThemeToggle';
import { ChevronLeftIcon } from 'lucide-react';

const MyPage = () => {
  return (
    <div>
      <div className="flex justify-around">
        <ChevronLeftIcon />
        <ThemeToggle />
      </div>
      myPage
    </div>
  );
};

export default MyPage;
