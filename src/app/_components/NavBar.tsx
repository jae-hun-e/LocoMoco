import React from 'react';
import { routes } from '@/constants/routeURL';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="fixed bottom-0 flex h-14 w-full items-center justify-around">
      <Link href={routes.search}>검색</Link>
      <Link href={routes.chat}>채팅</Link>
      <Link href={routes.home}>홈</Link>
      <Link href={routes.mypage}>마이페이지</Link>
    </div>
  );
};

export default Navbar;
