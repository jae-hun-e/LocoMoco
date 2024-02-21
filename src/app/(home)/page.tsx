'use client';

import { useState } from 'react';
import useKakaoMap from '@/hooks/useKakaoMap';
import useMapMGCDataStore, { DUMMYDATAS } from '@/store/useMapMGCDataStore';
import { MGCSummary } from '@/types/MGCSummary';
import CreateBtn from '../_components/CreateBtn';
import BottomSheet from './_components/BottomSheet';
import Map from './_components/Map';
import SearchBarFilter from './_components/SearchBarFilter';

const Home = () => {
  const [MGCDataList, setMGCDataList] = useState<MGCSummary[]>(DUMMYDATAS);
  const [open, setOpen] = useState(false);
  const { mapMGCData } = useMapMGCDataStore();

  const openSheetUpdate = (mapData: MGCSummary[]) => {
    setMGCDataList(mapData);
    setOpen(true);
  };

  const { mapRef, changeCenter, setCurrentLocation } = useKakaoMap({ mapMGCData, openSheetUpdate });

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
      <div className="absolute bottom-0 z-10 w-full rounded-t-xl bg-layer-2">
        <BottomSheet
          open={open}
          setOpen={setOpen}
        >
          <>
            {MGCDataList.map((data) => (
              <li key={data.id}>{data.title}</li>
            ))}
          </>
        </BottomSheet>
      </div>
    </div>
  );
};

export default Home;
