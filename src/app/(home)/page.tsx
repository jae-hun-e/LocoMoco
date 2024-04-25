'use client';

import { useEffect, useRef, useState } from 'react';
import useMGCTotalList from '@/apis/mgcList/useMGCTotalList';
import { Separator } from '@/components/ui/separator';
import { useThunderModalStore } from '@/store/thunderModalStore';
import useInfoWindowPosition from '@/store/useInfoWindowPosition';
import useSearchInputValueStore from '@/store/useSearchValueStore';
import { MGCSummary } from '@/types/MGCList';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CreateBtn from '../_components/CreateBtn';
import MGCList from '../_components/MGCList/MGCList';
import Map from '../_components/Map/Map';
import InfoWindow from '../_components/infoWindow/InfoWindow';
import BottomSheet from './_components/BottomSheet';
import HomeMap from './_components/HomeMap';
import HomeMapViewer from './_components/HomeMapViewer';

const Home = () => {
  const router = useRouter();

  const [MGCDataList, setMGCDataList] = useState<MGCSummary[]>([]);
  const [open, setOpen] = useState(false);

  const mapRef = useRef<HTMLDivElement>(null);

  const { toggleModal } = useThunderModalStore();

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

  const { infoWindowPosition, setInfoWindowPosition } = useInfoWindowPosition();

  const closeInfoWindow = () => {
    setInfoWindowPosition({ latitude: 0, longitude: 0 });
  };

  return (
    <div className="relative -left-20pxr w-[100vw]">
      <Map
        render={() => (
          <HomeMapViewer
            ref={mapRef}
            timerRef={timerRef}
            onMouseUp={handleMouseUp}
          />
        )}
        mapRef={mapRef}
      >
        <HomeMap
          data={data}
          handleMarkerClick={handleMarkerClick}
          openBottomSheetAndUpdate={openBottomSheetAndUpdate}
        />
        <InfoWindow
          show={infoWindowPosition.latitude !== 0 && infoWindowPosition.longitude !== 0}
          position={infoWindowPosition}
          getNewPosition={() => {}}
        >
          <div
            id="infowindow-content"
            // TODO: 임시로 위치 top: -52px해둔 것. 인포윈도우 자체적으로 위치가 이동할 수 았도록 수정 필요 [24.03.18]
            className="bubble-tail relative -top-52pxr flex h-80pxr flex-col rounded-md bg-white shadow-md"
          >
            <div className="flex justify-end">
              <button
                className="pr-10pxr pt-7pxr"
                onClick={closeInfoWindow}
              >
                <X
                  width={13}
                  height={13}
                  fill="gray"
                />
              </button>
            </div>
            <div className="flex grow flex-col items-start justify-evenly">
              <button
                className="w-full px-10pxr text-sm"
                onClick={() => {
                  router.push('/create');
                  closeInfoWindow();
                }}
              >
                모각코 생성
              </button>
              <Separator />
              <button
                className="w-full px-10pxr text-sm"
                onClick={() => {
                  toggleModal();
                  closeInfoWindow();
                }}
              >
                ⚡번개 모각코 생성
              </button>
            </div>
          </div>
        </InfoWindow>
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
