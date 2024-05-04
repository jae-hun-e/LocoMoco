import React, { useEffect, useState } from 'react';
import useAddress, { Address } from '@/apis/address/useAddressSearch';
import AddressList from '@/app/(home)/_components/AddressList';
import Marker from '@/app/_components/Map/Marker';
import { LocationProps } from '@/app/create/_components/CreateMGC';
import useChangeMapCenter from '@/hooks/useChangeMapCenter';
import useGeolocation from '@/hooks/useGeolocation';
import { Search } from 'lucide-react';
import { Location } from './MGCMap';

interface CreateMGCMapProps {
  currentCoordinates: Location;
  defaultAddress: LocationProps | undefined;
  setCurrentCoordinates: ({ latitude, longitude }: Location) => void;
}

const CreateMGCMap = ({
  currentCoordinates,
  defaultAddress,
  setCurrentCoordinates,
}: CreateMGCMapProps) => {
  const [show, setShow] = useState(false);
  const [keyword, setKeyword] = useState('');
  const { data: address } = useAddress(keyword);

  const handleAddressClick = (data: Address) => {
    changeCenter(Number(data.latitude), Number(data.longitude));
    setShow(false);
  };

  const location = useGeolocation();
  const { changeCenter } = useChangeMapCenter();

  useEffect(() => {
    if (defaultAddress) {
      changeCenter(defaultAddress.latitude, defaultAddress.longitude);
      setCurrentCoordinates({
        latitude: defaultAddress.latitude,
        longitude: defaultAddress.longitude,
      });
    } else if (location?.coordinates) {
      if (location?.coordinates?.lat === 0 && location?.coordinates?.lng === 0) return;

      changeCenter(location.coordinates?.lat, location.coordinates?.lng);
      setCurrentCoordinates({
        latitude: location.coordinates?.lat,
        longitude: location.coordinates?.lng,
      });
    }
  }, [changeCenter, defaultAddress, location.coordinates, location.loaded, setCurrentCoordinates]);

  return (
    <>
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
      <Marker
        markerSrc="mgc_marker.svg"
        latitude={currentCoordinates.latitude}
        longitude={currentCoordinates.longitude}
        draggble
      />
    </>
  );
};

export default CreateMGCMap;
