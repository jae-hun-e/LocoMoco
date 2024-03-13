'use client';

import { titleMap } from '@/constants/routeURL';
import { ChevronLeftIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const HeaderLeft = () => {
  const pathArray = usePathname().split('/');
  let pathname = pathArray.at(-1);
  const router = useRouter();

  if (!isNaN(Number(pathname))) {
    pathname = pathArray.at(-2);
  }

  // TODO: 에러 처리 중앙화 하기 [24/02/14]
  // if (!Object.keys(titleMap).includes(pathname)) throw new Error('잘못된 경로로 들어왔습니다.');
  const title = titleMap[pathname as keyof typeof titleMap];

  return (
    <div className="flex items-center gap-25pxr">
      <button onClick={() => router.back()}>
        <ChevronLeftIcon />
      </button>
      <div>{title}</div>
    </div>
  );
};

export default HeaderLeft;
