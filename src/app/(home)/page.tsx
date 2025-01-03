'use client';

import { useEffect, useRef, useState } from 'react';
import useMGCTotalList from '@/apis/mgcList/useMGCTotalList';
import useSearchValueStore from '@/store/useSearchValueStore';
import { MGCSummary } from '@/types/MGCList';
import Image from 'next/image';
import GeocoderProvider from '../_components/Map/GeocoderProvider';
import MapProvider from '../_components/Map/MapProvider';
import HomeMapContent from './_components/HomeMapContent';
import HomeMapFooter from './_components/HomeMapFooter ';
import HomeMapViewer from './_components/HomeMapViewer';

const Home = () => {
  const [MGCDataList, setMGCDataList] = useState<MGCSummary[]>([]);
  const [open, setOpen] = useState(false);
  const [coached, setCoached] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);

  const { searchValue } = useSearchValueStore();

  const { data } = useMGCTotalList({
    search: searchValue.search,
    searchType: 'location',
    tags: searchValue.tags,
  });

  useEffect(() => {
    if (data) {
      setMGCDataList(data);
    }
  }, [data]);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
    if (!sessionStorage.getItem('coach')) {
      setCoached(false);
    }
  }, []);

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

  const handleCoach = () => {
    sessionStorage.setItem('coach', 'true');
    setCoached(true);
  };

  return (
    <div className="relative -left-20pxr w-[100vw]">
      <MapProvider
        mapRef={mapRef}
        isCustomlevelController
      >
        <GeocoderProvider>
          <HomeMapContent
            data={data}
            handleMarkerClick={handleMarkerClick}
            openBottomSheetAndUpdate={openBottomSheetAndUpdate}
          />
          {!coached && (
            <Image
              onClick={handleCoach}
              className="absolute left-0 top-0 z-40 flex h-full w-full items-center justify-center"
              alt="coach_mark"
              src={'/coach.png'}
              width={400}
              height={400}
            />
          )}
          <HomeMapViewer
            ref={mapRef}
            timerRef={timerRef}
            onMouseUp={handleMouseUp}
          />
        </GeocoderProvider>
      </MapProvider>

      <HomeMapFooter
        open={open}
        setOpen={setOpen}
        MGCDataList={MGCDataList}
      />
    </div>
  );
};

export default Home;
