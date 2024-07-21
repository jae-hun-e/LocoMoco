import { useState } from 'react';
import { cn } from '@/libs/utils';
import CategoryFilter from './CategoryFilter';
import SearchBar from './SearchBar';

const SearchBarFilter = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn('w-full rounded-b-[30px] px-[5%] pt-20pxr', open && 'bg-layer-1')}>
      <SearchBar />
      <CategoryFilter
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default SearchBarFilter;
