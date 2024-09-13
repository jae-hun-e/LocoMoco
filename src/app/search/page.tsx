'use client';

import { useEffect, useState } from 'react';
import useMGCTotalList from '@/apis/mgcList/useMGCTotalList';
import MGCList from '@/app/_components/MGCList/MGCList';
import useSearchInputValueStore from '@/store/useSearchValueStore';
import CreateBtn from '../_components/CreateBtn';
import SearchBarFilter from './_components/SearchBarFilter';

const SearchMGC = () => {
  const [open, setOpen] = useState(false);
  const [paddingTop, setPaddingTop] = useState(7.5); // 기본 값

  const { searchValue, setSearchValue } = useSearchInputValueStore();

  const { data } = useMGCTotalList({
    search: searchValue.address,
    searchType: 'TITLE_CONTENT',
    tags: searchValue.tags,
  });

  useEffect(() => {
    setSearchValue({ ...searchValue, address: '', tags: [] });
  }, [setSearchValue]);

  useEffect(() => {
    if (open && window.scrollY < 126) {
      setPaddingTop((260 + window.scrollY) / 16);
    } else {
      setPaddingTop(7.5);
    }
  }, [open]);

  return (
    <>
      <section className="fixed left-0 z-40 flex w-full flex-col items-center">
        <SearchBarFilter
          open={open}
          setOpen={setOpen}
        />
      </section>
      <div
        className="pt-120pxr"
        style={{ paddingTop: `${paddingTop}rem` }}
      >
        <div className="fixed bottom-50pxr right-24pxr z-30">
          <CreateBtn />
        </div>
        <MGCList data={data ?? []}></MGCList>
      </div>
    </>
  );
};

export default SearchMGC;
