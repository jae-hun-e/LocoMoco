import React, { useEffect, useState } from 'react';
import CreateBtn from '@/app/_components/CreateBtn';
import MGCList from '@/app/_components/MGCList/MGCList';
import useCreateKakaoMap from '@/hooks/useCreateKakaoMap';
import useRenderMarkerByData from '@/hooks/useRenderMarkerByData';
import useCenterPosition from '@/store/useCenterPosition';
import { MGCDetail, MGCList as MGCListType } from '@/types/MGCList';
import BottomSheet from './BottomSheet';
import Map from './Map';

const MapSection = ({ data }: MGCListType) => {
  const [MGCDataList, setMGCDataList] = useState<MGCDetail[]>([]);
  const [open, setOpen] = useState(false);
  const { centerPosition } = useCenterPosition();

  const openSheetUpdate = (mapData: MGCDetail[]) => {
    setMGCDataList(mapData);
    setOpen(true);
  };

  useEffect(() => {
    if (data) {
      setMGCDataList(data);
    }
  }, [data]);

  const { clusterer, map, mapRef, createPositionMarker, setCurrentLocation, changeCenter } =
    useCreateKakaoMap(true);
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
        createPositionMarker={createPositionMarker}
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
          <MGCList data={MGCDataList ?? []} />
        </BottomSheet>
      </div>
    </>
  );
};

export default MapSection;
