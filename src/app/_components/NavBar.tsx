'use client';

import { routes } from '@/constants/routeURL';
import { cn } from '@/libs/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ChatIcon from '../../../public/chat.svg';
import MapIcon from '../../../public/map.svg';
import MypageIcon from '../../../public/mypage.svg';
import SearchIcon from '../../../public/search-icon.svg';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div
      id="navbar"
      className="fixed bottom-0 z-20 flex h-64pxr w-full items-center justify-around bg-layer-1"
    >
      <Link
        href={routes.home}
        className={cn('flex flex-col gap-3pxr', pathname === routes.home && 'text-main-1')}
      >
        <MapIcon />
        <span className="text-xs">주변</span>
      </Link>
      <Link
        href={routes.search}
        className={cn('flex flex-col gap-3pxr', pathname === routes.search && 'text-main-1')}
      >
        <SearchIcon />
        <span className="text-xs">검색</span>
      </Link>
      <Link
        href={routes.chat}
        className={cn('flex flex-col gap-3pxr', pathname === routes.chat && 'text-main-1')}
      >
        <ChatIcon />
        <span className="text-xs">채팅</span>
      </Link>
      <Link
        href={routes.mypage}
        className={cn('flex flex-col gap-3pxr', pathname === routes.mypage && 'text-main-1')}
      >
        <MypageIcon />
        <span className="text-xs">MY</span>
      </Link>
    </div>
  );
};

export default Navbar;
