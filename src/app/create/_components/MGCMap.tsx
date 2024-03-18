import React, { useCallback, useEffect, useRef, useState } from 'react';
import { UseFormSetValue, UseFormTrigger } from 'react-hook-form';
import useAddress, { Address } from '@/apis/address/useAddressSearch';
import AddressList from '@/app/(home)/_components/AddressList';
import MapCustomControl from '@/app/_components/MapCustomControl';
import { LocationProps, MGCCreateForm } from '@/app/create/_components/CreateMGC';
import useCreateKakaoMap from '@/hooks/useCreateKakaoMap';
import useGeolocation from '@/hooks/useGeolocation';
import { Search } from 'lucide-react';
import markerImg from '../../../../public/oh.png';

import Marker = kakao.maps.Marker;

/* TODO : [24/03/13]
  1. Link로 보내줄 때 위치 정보 && 동 정보 받아와야함
 */

interface Props {
  trigger: UseFormTrigger<MGCCreateForm>;
  setValue: UseFormSetValue<MGCCreateForm>;
  defaultAddress?: LocationProps | undefined;
}
const MGCMap = ({ trigger, setValue, defaultAddress }: Props) => {
  const [createdPositionCoordinates, setCreatedPositionCoordinates] = useState<kakao.maps.Marker>();
  const location = useGeolocation();

  const {
    map,
    mapRef,
    createMarker,
    changeCenter,
    removeMarker,
    movePosition,
    isLoad,
    zoomIn,
    zoomOut,
    getAddressByCoorinates,
  } = useCreateKakaoMap({ isCustomlevelControl: true });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const handleMouseUp = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const [defaultMarker, setDeaultMarker] = useState<Marker>();
  const [currentAddress, setAddress] = useState(defaultAddress?.address ?? '');
  const handleMapClick = useCallback(
    async (e: kakao.maps.event.MouseEvent) => {
      if (createdPositionCoordinates && defaultMarker) {
        const latLng = e.latLng;
        removeMarker(defaultMarker);
        if (createdPositionCoordinates && map) {
          movePosition({
            marker: createdPositionCoordinates,
            latitude: latLng.getLat(),
            longitude: latLng.getLng(),
          });

          const newAddress = await getAddressByCoorinates(latLng.getLat(), latLng.getLng());
          if (newAddress) {
            setAddress(newAddress);
            setValue('location.address', newAddress);
            setValue('location.latitude', latLng.getLat());
            setValue('location.longitude', latLng.getLng());
            setValue('location.city', newAddress);
            trigger('location');
          }
        }
      }
    },
    [createdPositionCoordinates, map, movePosition],
  );

  useEffect(() => {
    if (defaultAddress && createdPositionCoordinates) {
      changeCenter(defaultAddress.latitude, defaultAddress.longitude);
      const marker = createMarker({
        latitude: defaultAddress.latitude,
        longitude: defaultAddress.longitude,
      });
      setDeaultMarker(marker);
    } else if (location?.coordinates && createdPositionCoordinates) {
      changeCenter(location.coordinates?.lat, location.coordinates?.lng);
      const marker = createMarker({
        latitude: location.coordinates?.lat,
        longitude: location.coordinates?.lng,
      });
      setDeaultMarker(marker);
    }
  }, [location.loaded]);

  useEffect(() => {
    if (map) {
      kakao.maps.event.addListener(map, 'click', handleMapClick);
      kakao.maps.event.addListener(map, 'dragstart', handleMouseUp);
    }

    return () => {
      if (map) {
        kakao.maps.event.removeListener(map, 'click', handleMapClick);
      }
    };
  }, [handleMapClick, map]);

  useEffect(() => {
    if (isLoad && location.coordinates) {
      setCreatedPositionCoordinates(
        createMarker({
          latitude: location.coordinates.lat,
          longitude: location.coordinates.lng,
          draggble: true,
          none: true,
          markerSrc: markerImg.src,
          markerSize: {
            width: 40,
            height: 40,
          },
        }),
      );
    }
  }, [createMarker, isLoad]);

  const [show, setShow] = useState(false);
  const [keyword, setKeyword] = useState('');
  const { data: address } = useAddress(keyword);

  const handleAddressClick = (data: Address) => {
    changeCenter(Number(data.latitude), Number(data.longitude));
    setShow(false);
  };

  useEffect(() => {}, []);

  return (
    <section className="mb-10pxr flex w-full flex-col gap-2">
      <div
        id="input-wrap"
        className={`relative flex h-50pxr flex-row items-center rounded-lg ${show ? 'rounded-b-none' : 'rounded-b-lg'} border`}
      >
        <Search
          width={20}
          height={20}
          color="gray"
          className="m-10pxr"
        />
        <input
          onFocus={() => setShow(true)}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="동명(읍, 면)으로 검색(ex. 서초동)."
          className="h-10 w-full text-sm focus:outline-none"
        />
        <div className="absolute bottom-0 left-0 right-0">
          {show && (
            <AddressList
              address={address}
              onClick={handleAddressClick}
            />
          )}
        </div>
      </div>

      <div
        ref={mapRef}
        className="relative h-150pxr w-full"
      >
        <MapCustomControl
          zoomIn={zoomIn}
          zoomOut={zoomOut}
        />
      </div>
      <p className="text-sm">{currentAddress}</p>
    </section>
  );
};

export default MGCMap;
