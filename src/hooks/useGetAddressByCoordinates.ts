import { useCallback, useContext } from 'react';
import { geocoderContext } from '@/app/_components/Map/GeocoderProvider';
import useKakaoMapService from '@/libs/kakaoMapWrapper';

const useGetAddressByCoordinates = () => {
  const geocoder = useContext(geocoderContext);
  const mapService = useKakaoMapService();

  const coord2RegionCodePromise = useCallback(
    (longitude: number, latitude: number, isInit: boolean): Promise<string> => {
      return new Promise((resolve, reject) => {
        if (geocoder) {
          geocoder.coord2Address(longitude, latitude, (result, status) => {
            if (status === mapService.getServicesStatus('OK')) {
              if (!isInit && result[0].road_address === null) {
                resolve('');
              } else {
                const addressName = result[0].address.address_name;
                resolve(addressName);
              }
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
    async (latitude: number, longitude: number, isInit?: boolean) => {
      try {
        const addressName = await coord2RegionCodePromise(longitude, latitude, isInit ?? true);

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
