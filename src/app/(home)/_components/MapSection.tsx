import React, { useEffect, useState } from 'react';
import CreateBtn from '@/app/_components/CreateBtn';
import MGCList from '@/app/_components/MGCList/MGCList';
import useCreateKakaoMap from '@/hooks/useCreateKakaoMap';
import useRenderMarkerByData from '@/hooks/useRenderMarkerByData';
import useCenterPosition from '@/store/useCenterPosition';
import { MGCList as MGCListType, MGCSummary } from '@/types/MGCList';
import BottomSheet from './BottomSheet';
import Map from './Map';

const MapSection = ({ data }: MGCListType) => {
  const [MGCDataList, setMGCDataList] = useState<MGCSummary[]>([]);
  const [open, setOpen] = useState(false);
  const { centerPosition } = useCenterPosition();

  const openSheetUpdate = (mapData: MGCSummary[]) => {
    setMGCDataList(mapData);
    setOpen(true);
  };

  useEffect(() => {
    if (data) {
      setMGCDataList(data);
    }
  }, [data]);

  const { clusterer, map, mapRef, createMarker, changeCenter, removeMarker, movePosition, isLoad } =
    useCreateKakaoMap();
  const renderMarker = useRenderMarkerByData(openSheetUpdate);

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
