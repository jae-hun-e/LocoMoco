import { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/libs/utils';

// Todo: 취소를 할 수 있는 태그인지 상태와 onChange를 받아올 수 있게 바꿀 예정 [2023/2/11]
const Tag = ({
  children,
  theme,
  onClick,
}: Readonly<{
  children: ReactNode;
  theme?: 'green' | 'gray';
  onClick?: () => void;
}>) => {
  const css = cn(
    'mr-10pxr h-22pxr text-sm font-normal cursor-pointer',
    `${theme === 'gray' ? 'bg-layer-7 text-layer-1 hover:bg-layer-9' : 'bg-main-5 text-main-1 hover:bg-main-4'}`,
  );

  return (
    <Badge
      className={css}
      onClick={onClick}
    >
      {children}
    </Badge>
  );
};

export default Tag;
