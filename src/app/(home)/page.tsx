import { Search } from 'lucide-react';
import dynamic from 'next/dynamic';
import CreateBtn from '../_components/CreateBtn';
import Filter from '../_components/filter/Filter';
import BottomSheet from './_components/BottomSheet';

const Home = () => {
  const Map = dynamic(() => import('@/app/(home)/_components/Map'));

  return (
    <div className="relative -left-20pxr w-[100vw]">
      <section className="flex w-full flex-col items-center">
        <div className="w-[90%] pt-20pxr">
          <div
            id="input-wrap"
            className="flex h-50pxr flex-row items-center rounded-lg border"
          >
            <Search
              width={20}
              height={20}
              color="gray"
              className="m-10pxr"
            />
            <input
              placeholder="장소를 입력해 주세요."
              className="h-10 w-full text-sm focus:outline-none"
            />
          </div>
          <Filter />
        </div>
      </section>
      <Map />
      <div className="absolute bottom-0 right-24pxr z-30">
        <CreateBtn />
      </div>

      <div className="absolute bottom-0 z-10 w-full rounded-t-xl bg-layer-2">
        <BottomSheet>
          <>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
          </>
        </BottomSheet>
      </div>
    </div>
  );
};

export default Home;
