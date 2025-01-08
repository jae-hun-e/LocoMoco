import React, { FormEvent, useRef, useState } from 'react';
import SearchBar from '@/app/_components/SearchBar';
import CommonSearchBarFilter from '@/app/_components/SearchBarFilter';
import useSearchInputValueStore from '@/store/useSearchValueStore';
import { OpenInfo } from '../page';

interface SearchBarFilter {
  openInfo: { isOpen: boolean; triggerType: 'category' | 'searchType' };
  setOpenInfo: ({ isOpen, triggerType }: OpenInfo) => void;
}

const SearchBarFilter = ({ openInfo, setOpenInfo }: SearchBarFilter) => {
  const { searchValue, setSearchValue } = useSearchInputValueStore();
  const [isFocus, setIsFocus] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputRef.current) return;

    const search = inputRef.current.value.trim();
    if (search.length > 1) {
      setSearchValue({ ...searchValue, search: inputRef.current.value });
    }
  };

  return (
    <CommonSearchBarFilter
      openInfo={openInfo}
      setOpenInfo={setOpenInfo}
      type="search"
      renderComponent={() => (
        <form
          onSubmit={handleSubmit}
          className="relative"
        >
          <SearchBar
            type="flat"
            inputRef={inputRef}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            setOpenInfo={setOpenInfo}
            openInfo={openInfo}
            className={isFocus ? 'border-opacity-main-1 text-black-2' : '' + 'rounded-xl'}
            placeholder="검색어를 두 글자 이상 입력해 주세요."
          />
        </form>
      )}
    />
  );
};

export default SearchBarFilter;
