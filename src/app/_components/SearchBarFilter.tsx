import { ReactNode } from 'react';
import useClickAway from '@/hooks/useClickaway';
import { cn } from '@/libs/utils';
import CategoryFilter from '../(home)/_components/CategoryFilter';

interface SearchBarFilterProps {
  renderComponent: () => ReactNode;
  type: 'search' | 'map';
  open: boolean;
  setOpen: (show: boolean) => void;
}

const SearchBarFilter = ({ renderComponent, type, open, setOpen }: SearchBarFilterProps) => {
  const handleClickAway = () => {
    setOpen(false);
  };

  const clickAwayRef = useClickAway<HTMLDivElement>(handleClickAway);

  return (
    <div className={cn('h-0 w-full', open && 'h-[100svh] bg-shadow')}>
      <div
        ref={clickAwayRef}
        className={cn(
          'w-full rounded-b-[30px] px-[5%] pt-20pxr',
          open && 'bg-layer-1',
          type === 'search' && 'bg-layer-1',
        )}
      >
        {renderComponent ? renderComponent() : null}
        <CategoryFilter
          open={open}
          setOpen={setOpen}
          type={type}
        />
      </div>
    </div>
  );
};

export default SearchBarFilter;
