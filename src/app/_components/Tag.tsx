import { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';

// Todo: 취소를 할 수 있는 태그인지 상태와 onChange를 받아올 수 있게 바꿀 예정 [2023/2/11]
const Tag = ({
  children,
  theme,
}: Readonly<{
  children: ReactNode;
  theme?: 'green' | 'gray';
}>) => {
  const css = `mr-10pxr h-22pxr text-sm font-normal cursor-pointer ${theme === 'gray' ? '' : 'bg-main-5 text-main-1 hover:bg-main-4'}`;

  return <Badge className={css}>{children}</Badge>;
};

export default Tag;
