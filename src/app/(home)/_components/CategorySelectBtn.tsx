import { ReactNode } from 'react';
import { cn } from '@/libs/utils';

interface CategorySelectBtnProps {
  name: string;
  icon: ReactNode;
  onClick: () => void;
  selectionStep: 'before' | 'in' | 'complete';
  label: string;
}

const CategorySelectBtn = ({
  name,
  icon,
  onClick,
  selectionStep,
  label,
}: CategorySelectBtnProps) => {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={cn(
        'flex items-center gap-8pxr rounded-[30px] border border-main-1 bg-layer-1 px-14pxr py-7pxr text-sm text-main-1 xs:text-xs',
        selectionStep === 'before' && 'border-layer-3 text-black-2',
        selectionStep === 'in' && ' bg-main-6',
      )}
    >
      <div className={cn('text-main-1', selectionStep === 'before' && 'text-gray-400')}>{icon}</div>
      <span>{name}</span>
    </button>
  );
};

export default CategorySelectBtn;
