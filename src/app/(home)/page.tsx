'use client';

import useMGCList from '@/apis/mgcList/useMGCList';
import MapSection from './_components/MapSection';
import SearchBarFilter from './_components/SearchBarFilter';

const Home = () => {
  const { data } = useMGCList([1, 2]);

  return (
    <div className="relative -left-20pxr w-[100vw]">
      <section className="flex w-full flex-col items-center">
        <SearchBarFilter />
      </section>
      <MapSection data={data?.data ?? []} />
    </div>
  );
};

export default Home;
