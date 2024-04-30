import React, { useCallback, useEffect, useRef, useState } from 'react';
import CreateBtn from '@/app/_components/CreateBtn';
import MGCList from '@/app/_components/MGCList/MGCList';
import InfoWindow from '@/app/_components/infoWindow/InfoWindow';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import useCreateKakaoMap from '@/hooks/useCreateKakaoMap';
import useRenderMarkerByData from '@/hooks/useRenderMarkerByData';
import { useThunderModalStore } from '@/store/thunderModalStore';
import useCenterPosition from '@/store/useCenterPosition';
// import useCreatedPositionInfo from '@/store/useCreatedPositionInfo';
import useInfoWindowPosition from '@/store/useInfoWindowPosition';
import useSearchInputValueStore from '@/store/useSearchValueStore';
import { MGCList as MGCListType, MGCSummary } from '@/types/MGCList';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import BottomSheet from './BottomSheet';
import Map from './Map';

// interface Location {
//   latitude: number;
//   longitude: number;
// }

const MapSection = ({ data }: MGCListType) => {
  const [MGCDataList, setMGCDataList] = useState<MGCSummary[]>([]);
  const [open, setOpen] = useState(false);
  const { centerPosition } = useCenterPosition();

  // const { setCreatedPositionInfo } = useCreatedPositionInfo();
  const { toggleModal } = useThunderModalStore();

  const router = useRouter();

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

  const {
    clusterer,
    map,
    mapRef,
    createMarker,
    changeCenter,
    removeMarker,
    movePosition,
    isLoad,
    getAddressByCoorinates,
  } = useCreateKakaoMap({ isCustomlevelControl: false, handleMouseUp: handleMouseUp });
  const renderMarker = useRenderMarkerByData(openBottomSheetAndUpdate, handleMouseUp);

  const { infoWindowPosition, setInfoWindowPosition } = useInfoWindowPosition();

  useEffect(() => {
    if (clusterer && data) {
      renderMarker(clusterer, data);
    }
  }, [clusterer, data, renderMarker]);

  const { searchValue, setSearchValue } = useSearchInputValueStore();

  const changeAddress = useCallback(
    async (latitude: number, longitude: number) => {
      const address = await getAddressByCoorinates(latitude, longitude);

      if (!address) {
        toast({
          description: '오류가 발생했습니다.',
        });
        return;
      }

      setSearchValue({ ...searchValue, address });
    },
    [getAddressByCoorinates],
  );

  useEffect(() => {
    const { latitude, longitude } = centerPosition;

    if (latitude !== 0 && longitude !== 0) {
      changeCenter(latitude, longitude);
      changeAddress(latitude, longitude);
    }
  }, [centerPosition, changeCenter, changeAddress]);

  const closeInfoWindow = () => {
    setInfoWindowPosition({ latitude: 0, longitude: 0 });
  };

  // const getNewPosition = async (data: Location) => {
  //   const { latitude, longitude } = data;

  //   const cityAddress = await getAddressByCoorinates(latitude, longitude);
  //   setCreatedPositionInfo({
  //     latitude,
  //     longitude,
  //     city: cityAddress!,
  //     address: cityAddress!,
  //   });
  // };

  return (
    <>
      <Map
        map={map}
        isLoad={isLoad}
        createMarker={createMarker}
        removeMarker={removeMarker}
        changeCenter={changeCenter}
        movePosition={movePosition}
        ref={mapRef}
        timerRef={timerRef}
        handleMouseUp={handleMouseUp}
      />
      {isLoad ? (
        <InfoWindow
          show={infoWindowPosition.latitude !== 0 && infoWindowPosition.longitude !== 0}
          position={infoWindowPosition}
          // getNewPosition={getNewPosition}
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
                  // 전역상태로
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
      ) : null}

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
    </>
  );
};

export default MapSection;
