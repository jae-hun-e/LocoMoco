'use client';

import useMGCTotalList from '@/apis/mgcList/useMGCTotalList';
import useSearchInputValueStore from '@/store/useSearchValueStore';
import MapSection from './_components/MapSection';
import SearchBarFilter from './_components/SearchBarFilter';

const Home = () => {
  const { searchValue } = useSearchInputValueStore();
  const { data } = useMGCTotalList({
    search: searchValue.address,
    searchType: 'LOCATION',
    tags: searchValue.tags,
  });

  return (
    <div className="relative -left-20pxr w-[100vw]">
      <section className="flex w-full flex-col items-center">
        <SearchBarFilter />
      </section>
      <MapSection data={data ?? []} />
    </div>
  );
};

export default Home;
