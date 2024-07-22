import { useState } from 'react';
import useClickAway from '@/hooks/useClickaway';
import { cn } from '@/libs/utils';
import CategoryFilter from './CategoryFilter';
import SearchBar from './SearchBar';

const SearchBarFilter = () => {
  const [open, setOpen] = useState(false);

  const handleClickAway = () => {
    setOpen(false);
  };

  const clickAwayRef = useClickAway<HTMLDivElement>(handleClickAway);

  return (
    <div className={cn('h-0 w-full', open && 'h-[100svh] bg-shadow')}>
      <div
        ref={clickAwayRef}
        className={cn('w-full rounded-b-[30px] px-[5%] pt-20pxr', open && 'bg-layer-1')}
      >
        <SearchBar />
        <CategoryFilter
          open={open}
          setOpen={setOpen}
        />
      </div>
    </div>
  );
};

export default SearchBarFilter;
