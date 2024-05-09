import { useCallback, useContext } from 'react';
import { geocoderContext } from '@/app/_components/Map/GeocoderProvider';

const useGetAddressByCoordinates = () => {
  const geocoder = useContext(geocoderContext);

  const coord2RegionCodePromise = useCallback(
    (longitude: number, latitude: number): Promise<string> => {
      return new Promise((resolve, reject) => {
        if (geocoder) {
          geocoder.coord2RegionCode(longitude, latitude, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              let addressName = '';
              for (let i = 0; i < result.length; i++) {
                if (result[i].region_type === 'H') {
                  addressName = result[i].address_name;
                  break;
                }
              }

              resolve(addressName);
            } else {
              reject(new Error('Geocoder failed'));
            }
          });
        } else {
          reject(new Error('Geocoder가 없음'));
        }
      });
    },
    [geocoder],
  );

  const getAddressByCoorinates = useCallback(
    async (latitude: number, longitude: number) => {
      try {
        const addressName = await coord2RegionCodePromise(longitude, latitude);

        return addressName;
      } catch (error) {
        console.error(error);
        return;
      }
    },
    [coord2RegionCodePromise],
  );

  return {
    getAddressByCoorinates,
  };
};

export default useGetAddressByCoordinates;
