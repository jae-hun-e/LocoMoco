import { ReactNode } from 'react';
import { cn } from '@/libs/utils';

interface Props {
  content: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  readonly children?: ReactNode;
}
const MainStyleButton = ({ content, className, children, onClick, disabled }: Props) => {
  return (
    <div
      className="my-10pxr flex h-40pxr items-center gap-18pxr"
      onClick={onClick}
    >
      <button
        className={cn(
          'flex h-full flex-grow items-center justify-center rounded-xl bg-main-1 text-layer-1',
          disabled ? 'bg-layer-5' : 'bg-main-1',
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
