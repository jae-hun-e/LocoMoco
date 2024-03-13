'use client';

import { titleMap } from '@/constants/routeURL';
import { ChevronLeftIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const HeaderLeft = () => {
  const pathArray = usePathname().split('/');
  const lastArray = pathArray.at(-1);
  const router = useRouter();

  // TODO: 에러 처리 중앙화 하기 [24/02/14]
  // if (!Object.keys(titleMap).includes(pathname)) throw new Error('잘못된 경로로 들어왔습니다.');
  let title;
  if (Number(lastArray)) title = titleMap[pathArray.at(-2) as keyof typeof titleMap];
  else title = titleMap[lastArray as keyof typeof titleMap];

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
