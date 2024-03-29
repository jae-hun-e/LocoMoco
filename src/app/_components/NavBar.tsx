import { routes } from '@/constants/routeURL';
import { MapIcon, MessageCircleIcon, SearchIcon, UserRoundIcon } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="fixed bottom-0 z-20 flex h-50pxr w-full items-center justify-around bg-layer-1">
      <Link href={routes.chat}>
        <MessageCircleIcon />
      </Link>
      <Link href={routes.search}>
        <SearchIcon />
      </Link>
      <Link href={routes.home}>
        <MapIcon />
      </Link>
      <Link href={routes.mypage}>
        <UserRoundIcon />
      </Link>
    </div>
  );
};

export default Navbar;
