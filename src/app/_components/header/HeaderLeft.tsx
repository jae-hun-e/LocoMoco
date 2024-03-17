'use client';

import { titleMap } from '@/constants/routeURL';
import { ChevronLeftIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const HeaderLeft = () => {
  const pathArray = usePathname().split('/');
  const lastArray = pathArray.at(-1);
  const router = useRouter();

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
