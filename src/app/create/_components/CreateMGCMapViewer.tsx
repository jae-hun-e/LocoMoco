import React, {
  ForwardedRef,
  ReactNode,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import { LocationInfo } from '@/apis/mgc/queryFn';
import { MapContext } from '@/app/_components/Map/MapProvider';
import MapViewer from '@/app/_components/Map/MapViewer';
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
  defaultAddress: LocationInfo | undefined;
  updateAddress: ({ address, city, hCity, latitude, longitude }: LocationInfo) => void;
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
        const newAddress = await getAddressByCoorinates(latitude, longitude);
        const newRegionCode = await getRegionCodeByCoorinates(latitude, longitude);

        if (newAddress !== undefined && newRegionCode?.city && newRegionCode?.hCity) {
          updateAddress({
            address: newAddress,
            city: newRegionCode.city,
            hCity: newRegionCode.hCity,
            latitude,
            longitude,
          });
        }
      };

      if (!defaultAddress) {
        if (location?.coordinates) {
          changeAddress(location.coordinates.lat, location.coordinates.lng);
        } else {
          changeAddress(37.492074, 127.029781);
        }
      }
    }, [defaultAddress, getAddressByCoorinates, getRegionCodeByCoorinates, location.coordinates]);

    const handleMapClick = useCallback(
      async (e: kakao.maps.event.MouseEvent) => {
        const latLng = e.latLng;
        const latitude = latLng.getLat();
        const longitude = latLng.getLng();

        if (map) {
          const newAddress = await getAddressByCoorinates(latLng.getLat(), latLng.getLng());
          const newRegionCode = await getRegionCodeByCoorinates(latitude, longitude);

          if (newAddress !== undefined && newRegionCode !== undefined) {
            if (newAddress === '') {
              toast({
                className: 'create-prevent-toast',
                description: '건물이 아닌 곳에 모각코를 생성할 수 없습니다.',
              });
              return;
            }

            setCurrentCoordinates({
              latitude,
              longitude,
            });

            const city = newRegionCode.city ?? '';
            const hCity = newRegionCode.hCity ?? '';

            updateAddress({
              address: newAddress,
              city,
              hCity,
              latitude,
              longitude,
            });
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
