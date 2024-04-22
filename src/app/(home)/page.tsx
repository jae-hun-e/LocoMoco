'use client';

import { useEffect, useRef, useState } from 'react';
import useMGCTotalList from '@/apis/mgcList/useMGCTotalList';
import Map from '@/app/_components/Map/Map';
import useSearchInputValueStore from '@/store/useSearchValueStore';
import { MGCSummary } from '@/types/MGCList';
import CreateBtn from '../_components/CreateBtn';
import MGCList from '../_components/MGCList/MGCList';
import BottomSheet from './_components/BottomSheet';
import HomeMap from './_components/HomeMap';

const Home = () => {
  const [MGCDataList, setMGCDataList] = useState<MGCSummary[]>([]);
  const [open, setOpen] = useState(false);

  const { searchValue } = useSearchInputValueStore();
  const { data } = useMGCTotalList({
    search: searchValue.address,
    // TODO: 처음 위치의 주소를 받아오는 기능을 추가한 다음 LOCATION으로 변경하기 [24.04.20]
    searchType: 'TOTAL',
  });

  useEffect(() => {
    if (data) {
      setMGCDataList(data);
    }
  }, [data]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseUp = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const openBottomSheetAndUpdate = (mapData: MGCSummary[]) => {
    setMGCDataList(mapData);
    setOpen(true);
  };

  const handleMarkerClick = (mapData: MGCSummary[]) => {
    openBottomSheetAndUpdate(mapData);
    handleMouseUp();
  };

  return (
    <div className="relative -left-20pxr w-[100vw]">
      <Map>
        <HomeMap
          data={data}
          handleMarkerClick={handleMarkerClick}
          openBottomSheetAndUpdate={openBottomSheetAndUpdate}
        />
      </Map>

      <div className="absolute bottom-0 right-24pxr z-30">
        <CreateBtn />
      </div>
      <div className="absolute bottom-15pxr z-10 flex w-full justify-center">
        <BottomSheet
          open={open}
          setOpen={setOpen}
        >
          <MGCList data={MGCDataList} />
        </BottomSheet>
      </div>
    </div>
  );
};

export default Home;
