import React, { useEffect, useRef, useState } from 'react';
import { UseFormSetValue, UseFormTrigger } from 'react-hook-form';
import { LocationInfo } from '@/apis/mgc/queryFn';
import { ThunderFormData } from '@/app/(home)/_components/ThunderModal/ThunderModalContent';
import MapProvider from '@/app/_components/Map/MapProvider';
import { MGCCreateForm } from '@/app/create/_components/CreateMGC';
import CreateMGCMapContent from '../../create/_components/CreateMGCMapContent';
import CreateMGCMapViewer from '../../create/_components/CreateMGCMapViewer';
import GeocoderProvider from './GeocoderProvider';

/* TODO : [24/03/13]
  1. Link로 보내줄 때 위치 정보 && 동 정보 받아와야함
 */
export interface Location {
  latitude: number;
  longitude: number;
}

interface Props {
  trigger: UseFormTrigger<MGCCreateForm> | UseFormTrigger<ThunderFormData>;
  setValue: UseFormSetValue<MGCCreateForm> | UseFormSetValue<ThunderFormData>;
  defaultAddress?: LocationInfo | undefined;
}

const MGCMap = ({ trigger, setValue, defaultAddress }: Props) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseUp = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const [currentAddress, setAddress] = useState(defaultAddress?.address ?? '');

  useEffect(() => {
    if (!currentAddress) {
      setAddress(defaultAddress?.address ?? '');
    }
  }, [currentAddress, defaultAddress?.address]);

  const [currentCoordinates, setCurrentCoordinates] = useState({ latitude: 0, longitude: 0 });

  const updateAddress = ({ address, latitude, longitude, city, hCity }: LocationInfo) => {
    setAddress(address);
    const assertedSetValue = setValue as UseFormSetValue<MGCCreateForm | ThunderFormData>;

    assertedSetValue('location.address', address);
    assertedSetValue('location.latitude', latitude);
    assertedSetValue('location.longitude', longitude);
    assertedSetValue('location.city', city);
    assertedSetValue('location.hCity', hCity);
    trigger('location');
  };

  const mapRef = useRef<HTMLDivElement>(null);

  return (
    <section className="mb-10pxr flex w-full flex-col gap-2">
      <MapProvider
        mapRef={mapRef}
        isCustomlevelController
      >
        <GeocoderProvider>
          <CreateMGCMapContent
            setCurrentCoordinates={setCurrentCoordinates}
            currentCoordinates={currentCoordinates}
            defaultAddress={defaultAddress}
          />
          <CreateMGCMapViewer
            defaultAddress={defaultAddress}
            updateAddress={updateAddress}
            setCurrentCoordinates={setCurrentCoordinates}
            onMouseUp={handleMouseUp}
            ref={mapRef}
          />
          <p className="text-sm">{currentAddress}</p>
        </GeocoderProvider>
      </MapProvider>
    </section>
  );
};

export default MGCMap;
