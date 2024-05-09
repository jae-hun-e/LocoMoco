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
import useGetAddressByCoordinates from '@/hooks/useGetAddressByCoordinates';
import { Location } from '../../_components/Map/MGCMap';

interface CreateMGCMapViewerProps {
  onMouseUp: () => void;
  children?: ReactNode;
  setCurrentCoordinates: ({ latitude, longitude }: Location) => void;
  updateAddress: ({
    newAddress,
    latLng,
  }: {
    newAddress: string;
    latLng: kakao.maps.LatLng;
  }) => void;
}

const CreateMGCMapViewer = forwardRef(
  (
    { onMouseUp, children, setCurrentCoordinates, updateAddress }: CreateMGCMapViewerProps,
    mapRef: ForwardedRef<HTMLDivElement>,
  ) => {
    const map = useContext(MapContext);

    const { getAddressByCoorinates } = useGetAddressByCoordinates();

    const handleMapClick = useCallback(
      async (e: kakao.maps.event.MouseEvent) => {
        const latLng = e.latLng;
        if (map) {
          setCurrentCoordinates({
            latitude: latLng.getLat(),
            longitude: latLng.getLng(),
          });

          const newAddress = await getAddressByCoorinates(latLng.getLat(), latLng.getLng());
          if (newAddress) {
            updateAddress({ newAddress, latLng });
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
