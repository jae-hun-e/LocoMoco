'use client';

import { useEffect, useState } from 'react';
import useMGCTotalList from '@/apis/mgcList/useMGCTotalList';
import MGCList from '@/app/_components/MGCList/MGCList';
import useSearchInputValueStore from '@/store/useSearchValueStore';
import ThunderModal from '../(home)/_components/ThunderModal/ThunderModal';
import CreateBtn from '../_components/CreateBtn';
import SearchBarFilter from './_components/SearchBarFilter';

export interface OpenInfo {
  isOpen: boolean;
  triggerType: 'category' | 'searchType';
}

const SearchMGC = () => {
  const [openInfo, setOpenInfo] = useState<OpenInfo>({ isOpen: false, triggerType: 'category' });
  const [paddingTop, setPaddingTop] = useState(7.5); // 기본 값

  const { searchValue, setSearchValue } = useSearchInputValueStore();

  const { data } = useMGCTotalList({
    search: searchValue.search,
    searchType: searchValue.searchType,
    tags: searchValue.tags,
  });

  useEffect(() => {
    setSearchValue({ ...searchValue, search: '' });
  }, [setSearchValue]);

  useEffect(() => {
    if (openInfo.isOpen && window.scrollY < 126) {
      if (openInfo.triggerType === 'category') {
        setPaddingTop((260 + window.scrollY) / 16);
      } else {
        setPaddingTop((220 + window.scrollY) / 16);
      }
    } else {
      setPaddingTop(7.5);
    }
  }, [openInfo.isOpen, openInfo.triggerType]);

  return (
    <>
      <section className="fixed left-0 z-40 flex w-full flex-col items-center">
        <SearchBarFilter
          openInfo={openInfo}
          setOpenInfo={setOpenInfo}
        />
      </section>
      <div
        className="pt-120pxr"
        style={{ paddingTop: `${paddingTop}rem` }}
      >
        <div className="fixed bottom-79pxr right-24pxr z-30">
          <CreateBtn />
        </div>
        <MGCList data={data ?? []}></MGCList>
      </div>
      <ThunderModal />
    </>
  );
};

export default SearchMGC;
