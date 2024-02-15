import { ReactNode } from 'react';
import { cn } from '@/libs/utils';

interface Props {
  content: string;
  className?: string;
  readonly children?: ReactNode;
}
const MainStyleButton = ({ content, className, children }: Props) => {
  return (
    <div className="my-10pxr flex h-40pxr items-center gap-18pxr">
      <button
        className={cn(
          'flex h-full flex-grow items-center justify-center rounded-xl bg-main-1 text-layer-1 hover:bg-hover',
          className,
        )}
      >
        <p>{content}</p>
      </button>
      {children}
    </div>
  );
};

export default MainStyleButton;
