'use client';

import { useEffect, useRef, useState } from 'react';
import useMGCTotalList from '@/apis/mgcList/useMGCTotalList';
import useSearchInputValueStore from '@/store/useSearchValueStore';
import { MGCSummary } from '@/types/MGCList';
import CreateBtn from '../_components/CreateBtn';
import MGCList from '../_components/MGCList/MGCList';
import GeocoderProvider from '../_components/Map/GeocoderProvider';
import MapProvider from '../_components/Map/MapProvider';
import BottomSheet from './_components/BottomSheet';
import HomeMap from './_components/HomeMap';
import HomeMapViewer from './_components/HomeMapViewer';

const Home = () => {
  const [MGCDataList, setMGCDataList] = useState<MGCSummary[]>([]);
  const [open, setOpen] = useState(false);

  const mapRef = useRef<HTMLDivElement>(null);

  const { searchValue } = useSearchInputValueStore();

  const { data } = useMGCTotalList({
    search: searchValue.address,
    searchType: 'LOCATION',
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
      <MapProvider mapRef={mapRef}>
        <GeocoderProvider>
          <HomeMap
            data={data}
            handleMarkerClick={handleMarkerClick}
            openBottomSheetAndUpdate={openBottomSheetAndUpdate}
          />
          <HomeMapViewer
            ref={mapRef}
            timerRef={timerRef}
            onMouseUp={handleMouseUp}
          />
        </GeocoderProvider>
      </MapProvider>

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
