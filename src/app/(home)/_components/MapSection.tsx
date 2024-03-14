import React, { useEffect, useRef, useState } from 'react';
import CreateBtn from '@/app/_components/CreateBtn';
import MGCList from '@/app/_components/MGCList/MGCList';
import InfoWindow from '@/app/_components/infoWindow/InfoWindow';
// import useCreateInfoWindow from '@/hooks/useCreateInfoWindow';
import useCreateKakaoMap from '@/hooks/useCreateKakaoMap';
import useRenderMarkerByData from '@/hooks/useRenderMarkerByData';
import useCenterPosition from '@/store/useCenterPosition';
import useInfoWindowPosition from '@/store/useInfoWindowPosition';
import { MGCList as MGCListType, MGCSummary } from '@/types/MGCList';
import BottomSheet from './BottomSheet';
import Map from './Map';

const MapSection = ({ data }: MGCListType) => {
  const [MGCDataList, setMGCDataList] = useState<MGCSummary[]>([]);
  const [open, setOpen] = useState(false);
  const { centerPosition } = useCenterPosition();

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

  const { clusterer, map, mapRef, createMarker, changeCenter, removeMarker, movePosition, isLoad } =
    useCreateKakaoMap({ isCustomlevelControl: false, handleMouseUp: handleMouseUp });
  const renderMarker = useRenderMarkerByData(openBottomSheetAndUpdate, handleMouseUp);

  const { infoWindowPosition } = useInfoWindowPosition();

  useEffect(() => {
    if (clusterer && data) {
      renderMarker(clusterer, data);
    }
  }, [clusterer, data, renderMarker]);

  useEffect(() => {
    const { latitude, longitude } = centerPosition;

    if (latitude !== 0 && longitude !== 0) {
      changeCenter(latitude, longitude);
    }
  }, [centerPosition, changeCenter]);

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
      <InfoWindow
        map={map}
        isLoad={isLoad}
        show={infoWindowPosition.latitude !== 0 && infoWindowPosition.longitude !== 0}
        position={infoWindowPosition}
      />
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
