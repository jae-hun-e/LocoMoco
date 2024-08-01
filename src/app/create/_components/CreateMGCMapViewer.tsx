import React, {
  ForwardedRef,
  ReactNode,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import { MapContext } from '@/app/_components/Map/MapProvider';
import MapViewer from '@/app/_components/Map/MapViewer';
import { LocationProps } from '@/app/create/_components/CreateMGC';
import { toast } from '@/components/ui/use-toast';
import useGeolocation from '@/hooks/useGeolocation';
import useGetAddressByCoordinates from '@/hooks/useGetAddressByCoordinates';
import useGetRegionCodeByCoordinates from '@/hooks/useGetRegionCodeByCoordinates';
import useKakaoMapService from '@/libs/kakaoMapWrapper';
import { Location } from '../../_components/Map/MGCMap';

interface CreateMGCMapViewerProps {
  onMouseUp: () => void;
  children?: ReactNode;
  setCurrentCoordinates: ({ latitude, longitude }: Location) => void;
  defaultAddress: LocationProps | undefined;
  updateAddress: ({
    newAddress,
    newRegionCode,
    latitude,
    longitude,
  }: {
    newAddress: string;
    newRegionCode: string;
    latitude: number;
    longitude: number;
  }) => void;
}

const CreateMGCMapViewer = forwardRef(
  (
    {
      onMouseUp,
      children,
      setCurrentCoordinates,
      defaultAddress,
      updateAddress,
    }: CreateMGCMapViewerProps,
    mapRef: ForwardedRef<HTMLDivElement>,
  ) => {
    const map = useContext(MapContext);
    const mapService = useKakaoMapService();

    const location = useGeolocation();

    const { getAddressByCoorinates } = useGetAddressByCoordinates();
    const { getRegionCodeByCoorinates } = useGetRegionCodeByCoordinates();

    useEffect(() => {
      const changeAddress = async (latitude: number, longitude: number) => {
        const newAddress = await getAddressByCoorinates(latitude, longitude, true);

        const newRegionCode = await getRegionCodeByCoorinates(latitude, longitude);

        if (newAddress && newRegionCode) {
          updateAddress({ newAddress, newRegionCode, latitude, longitude });
        }
      };

      if (!defaultAddress && location?.coordinates) {
        changeAddress(location.coordinates.lat, location.coordinates.lng);
      }
    }, [
      defaultAddress,
      getAddressByCoorinates,
      getRegionCodeByCoorinates,
      location.coordinates,
      updateAddress,
    ]);

    const handleMapClick = useCallback(
      async (e: kakao.maps.event.MouseEvent) => {
        const latLng = e.latLng;
        const latitude = latLng.getLat();
        const longitude = latLng.getLng();

        if (map) {
          setCurrentCoordinates({
            latitude,
            longitude,
          });

          const newAddress = await getAddressByCoorinates(latLng.getLat(), latLng.getLng(), false);
          const newRegionCode = await getRegionCodeByCoorinates(latitude, longitude);

          if (newAddress === '') {
            toast({ description: '건물이 아닌 곳에 모각코를 생성할 수 없습니다.' });
          }
          if (newAddress && newRegionCode) {
            updateAddress({ newAddress, newRegionCode, latitude, longitude });
          }
        }
      },
      [
        getAddressByCoorinates,
        getRegionCodeByCoorinates,
        map,
        setCurrentCoordinates,
        updateAddress,
      ],
    );

    useEffect(() => {
      if (map) {
        mapService.addListener(map, 'click', handleMapClick);
        mapService.addListener(map, 'dragstart', onMouseUp);
      }

      return () => {
        if (map) {
          mapService.removeListener(map, 'click', handleMapClick);
          mapService.removeListener(map, 'dragstart', onMouseUp);
        }
      };
    }, [handleMapClick, map, onMouseUp]);

    return (
      <MapViewer
        height="150pxr"
        ref={mapRef}
      >
        {children}
      </MapViewer>
    );
  },
);

CreateMGCMapViewer.displayName = 'CreateMGCMapViewer';

export default CreateMGCMapViewer;
