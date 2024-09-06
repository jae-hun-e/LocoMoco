'use client';

import React, { useEffect } from 'react';
import { getItem, setItem } from '@/utils/storage';
import { usePathname } from 'next/navigation';

const PagePathRecorder = () => {
  const pathname = usePathname();
  const PAGES = 'pages';

  useEffect(() => {
    const prev = getItem<string[]>(sessionStorage, PAGES) ?? [];

    if (prev.length === 0 || (prev.length > 0 && prev.at(-1) !== pathname)) {
      setItem(sessionStorage, PAGES, prev.at(-1) ? [prev.at(-1), pathname] : [pathname]);
    }
  }, [pathname]);

  return <></>;
};

export default PagePathRecorder;
