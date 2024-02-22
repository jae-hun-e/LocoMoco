'use client';

import { useState } from 'react';
import useMGCList from '@/apis/mgcList/useMGCList';
import useKakaoMap from '@/hooks/useKakaoMap';
import { MGCDetail } from '@/types/MGCList';
import CreateBtn from '../_components/CreateBtn';
import BottomSheet from './_components/BottomSheet';
import Map from './_components/Map';
import SearchBarFilter from './_components/SearchBarFilter';

const Home = () => {
  const { data } = useMGCList([1, 2]);
  const [MGCDataList, setMGCDataList] = useState<MGCDetail[]>(data?.data ?? []);
  const [open, setOpen] = useState(false);

  const openSheetUpdate = (mapData: MGCDetail[]) => {
    setMGCDataList(mapData);
    setOpen(true);
  };

  const { mapRef, changeCenter, setCurrentLocation } = useKakaoMap({
    mapMGCData: MGCDataList,
    openSheetUpdate,
  });

  return (
    <div className="relative -left-20pxr w-[100vw]">
      <section className="flex w-full flex-col items-center">
        <SearchBarFilter changeCenter={changeCenter} />
      </section>
      <Map
        setCurrentLocation={setCurrentLocation}
        ref={mapRef}
      />

      <div className="absolute bottom-0 right-24pxr z-30">
        <CreateBtn />
      </div>
      <div className="absolute bottom-15pxr z-10 flex w-full justify-center">
        <BottomSheet
          open={open}
          setOpen={setOpen}
        >
          {/* TODO: 백엔드 더미데이터 사용중이라 id값이 없는 관계로 임시 index값을 사용. 백엔드 완성시 변경해야함 [24.02.21] */}
          <>{data?.data.map((data, idx) => <li key={idx}>{data.title}</li>)}</>
        </BottomSheet>
      </div>
    </div>
  );
};

export default Home;
