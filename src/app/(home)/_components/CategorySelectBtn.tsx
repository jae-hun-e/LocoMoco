import { ReactNode } from 'react';
import { iconSubmitColor } from '@/constants/categoryFilter';
import { cn } from '@/libs/utils';

interface CategorySelectBtnProps {
  name: string;
  icon: ReactNode;
  onClick: () => void;
  selectionStep: 'before' | 'in' | 'complete' | 'submit';
  label: string;
  catetory: 'mgcType' | 'language' | 'area';
  iconPosition: 'left' | 'right';
}

const CategorySelectBtn = ({
  name,
  icon,
  onClick,
  selectionStep,
  label,
  catetory,
  iconPosition,
}: CategorySelectBtnProps) => {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={cn(
        'flex items-center gap-8pxr rounded-[20px] border border-main-1 bg-layer-1 px-14pxr py-7pxr text-sm text-main-1 xs:text-xs',
        selectionStep === 'before' && 'border-layer-3 text-black-2',
        selectionStep === 'in' && ' bg-main-6',
        iconPosition === 'left' && selectionStep === 'submit' && 'border-layer-3 text-black-2',
      )}
    >
      {iconPosition === 'left' ? (
        <div
          className={cn(
            'text-main-1',
            selectionStep === 'before' && 'text-gray-400',
            selectionStep === 'submit' && iconSubmitColor[catetory],
          )}
        >
          {icon}
        </div>
      ) : null}
      <span>{name}</span>
      {iconPosition === 'right' ? (
        <div className={cn('text-main-1', selectionStep === 'before' && 'text-gray-400')}>
          {icon}
        </div>
      ) : null}
    </button>
  );
};

export default CategorySelectBtn;
