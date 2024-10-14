import { ReactNode } from 'react';
import { cn } from '@/libs/utils';

interface Props {
  content: string;
  layout?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  readonly children?: ReactNode;
}
const MainStyleButton = ({ layout, content, className, children, onClick, disabled }: Props) => {
  return (
    <div
      className={cn('my-10pxr flex h-50pxr items-center gap-18pxr', layout)}
      onClick={onClick}
    >
      <button
        className={cn(
          'flex h-full flex-grow items-center justify-center rounded-xl bg-main-1 text-layer-1',
          disabled ? 'bg-layer-5' : 'bg-main-1',
          className,
        )}
        disabled={disabled}
      >
        <p>{content}</p>
      </button>
      {children}
    </div>
  );
};

export default MainStyleButton;
