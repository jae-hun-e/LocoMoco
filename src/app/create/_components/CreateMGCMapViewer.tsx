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
import useGeolocation from '@/hooks/useGeolocation';
import useGetAddressByCoordinates from '@/hooks/useGetAddressByCoordinates';
import { Location } from '../../_components/Map/MGCMap';

interface CreateMGCMapViewerProps {
  onMouseUp: () => void;
  children?: ReactNode;
  setCurrentCoordinates: ({ latitude, longitude }: Location) => void;
  defaultAddress: LocationProps | undefined;
  updateAddress: ({
    newAddress,
    latitude,
    longitude,
  }: {
    newAddress: string;
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

    const location = useGeolocation();
    const { getAddressByCoorinates } = useGetAddressByCoordinates();

    useEffect(() => {
      const changeAddress = async (latitude: number, longitude: number) => {
        const newAddress = await getAddressByCoorinates(latitude, longitude);
        if (newAddress) {
          updateAddress({ newAddress, latitude, longitude });
        }
      };

      if (!defaultAddress && location?.coordinates) {
        changeAddress(location.coordinates.lat, location.coordinates.lng);
      }
    }, [defaultAddress, getAddressByCoorinates, location.coordinates, updateAddress]);

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

          const newAddress = await getAddressByCoorinates(latLng.getLat(), latLng.getLng());
          if (newAddress) {
            updateAddress({ newAddress, latitude, longitude });
          }
        }
      },
      [getAddressByCoorinates, map, setCurrentCoordinates, updateAddress],
    );

    useEffect(() => {
      if (map) {
        kakao.maps.event.addListener(map, 'click', handleMapClick);
        kakao.maps.event.addListener(map, 'dragstart', onMouseUp);
      }

      return () => {
        if (map) {
          kakao.maps.event.removeListener(map, 'click', handleMapClick);
          kakao.maps.event.removeListener(map, 'dragstart', onMouseUp);
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
