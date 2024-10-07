import { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/libs/utils';
import { X } from 'lucide-react';

interface TagProps {
  children: ReactNode;
  theme?: 'green' | 'gray';
  onClick?: () => void;
  className?: string;
  type: 'default' | 'removable';
}

const Tag = ({ children, theme, onClick, type = 'default', className }: TagProps) => {
  const css = cn(
    'mr-10pxr h-22pxr text-sm font-normal cursor-pointer py-4pxr px-8pxr gap-4pxr box-border',
    theme === 'gray'
      ? 'bg-layer-7 text-layer-1 hover:bg-layer-9'
      : 'bg-main-6 text-main-1 hover:bg-main-5',
    className,
  );

  return (
    <Badge
      className={css}
      onClick={onClick}
    >
      {children}
      {type === 'removable' ? (
        <X
          width={14}
          height={14}
        />
      ) : null}
    </Badge>
  );
};

export default Tag;
