'use client';

import { useEffect } from 'react';
import useMGCTotalList from '@/apis/mgcList/useMGCTotalList';
import MGCList from '@/app/_components/MGCList/MGCList';
import useSearchInputValueStore from '@/store/useSearchValueStore';
import CreateBtn from '../_components/CreateBtn';
import SearchBarFilter from './_components/SearchBarFilter';

const SearchMGC = () => {
  const { searchValue, setSearchValue } = useSearchInputValueStore();

  const { data } = useMGCTotalList({
    search: searchValue.address,
    searchType: 'TITLE_CONTENT',
    tags: searchValue.tags,
  });

  useEffect(() => {
    setSearchValue({ ...searchValue, address: '', tags: [] });
  }, [setSearchValue]);

  return (
    <>
      <section className="absolute left-0 z-40 flex w-full flex-col items-center">
        <SearchBarFilter />
      </section>
      <div className="pt-120pxr">
        <div className="fixed bottom-50pxr right-24pxr z-30">
          <CreateBtn />
        </div>
        <MGCList data={data ?? []}></MGCList>
      </div>
    </>
  );
};

export default SearchMGC;
