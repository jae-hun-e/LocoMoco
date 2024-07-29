import { useCallback, useContext } from 'react';
import { geocoderContext } from '@/app/_components/Map/GeocoderProvider';
import useKakaoMapService from '@/libs/kakaoMapWrapper';

const useGetRegionCodeByCoordinates = () => {
  const geocoder = useContext(geocoderContext);
  const mapService = useKakaoMapService();

  const coord2RegionCodePromise = useCallback(
    (longitude: number, latitude: number): Promise<string> => {
      return new Promise((resolve, reject) => {
        if (geocoder) {
          geocoder.coord2RegionCode(longitude, latitude, (result, status) => {
            if (status === mapService.getServicesStatus('OK')) {
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

  const getRegionCodeByCoorinates = useCallback(
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
    getRegionCodeByCoorinates,
  };
};

export default useGetRegionCodeByCoordinates;
