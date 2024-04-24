import React, {
  ForwardedRef,
  MutableRefObject,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import { MapContext } from '@/app/_components/Map/Map';
import MapViewer from '@/app/_components/Map/MapViewer';
import useInfoWindowPosition from '@/store/useInfoWindowPosition';

interface HomeMapViewerProps {
  timerRef: MutableRefObject<NodeJS.Timeout | null>;
  onMouseUp: () => void;
}

const HomeMapViewer = forwardRef(
  ({ timerRef, onMouseUp }: HomeMapViewerProps, mapRef: ForwardedRef<HTMLDivElement>) => {
    const map = useContext(MapContext);

    const { setInfoWindowPosition } = useInfoWindowPosition();

    const handleMouseDown = useCallback(
      (e: kakao.maps.event.MouseEvent) => {
        timerRef.current = setTimeout(() => {
          const latLng = e.latLng;
          setInfoWindowPosition({ latitude: latLng.getLat(), longitude: latLng.getLng() });
        }, 1000);
      },
      [setInfoWindowPosition, timerRef],
    );

    const handleTouchStart = useCallback(
      (e: TouchEvent) => {
        if (!(e.target instanceof SVGElement)) return;

        if (map) {
          timerRef.current = setTimeout(() => {
            const mapProjection = map.getProjection();
            const point = new kakao.maps.Point(e.touches[0].clientX, e.touches[0].clientY - 120);
            const latLng = mapProjection.coordsFromContainerPoint(point);
            setInfoWindowPosition({ latitude: latLng.getLat(), longitude: latLng.getLng() });
          }, 1000);
        }
      },
      [map, setInfoWindowPosition, timerRef],
    );

    useEffect(() => {
      const mapContainer = document.getElementById('map')!;

      if (map) {
        kakao.maps.event.addListener(map, 'mousedown', handleMouseDown);
        kakao.maps.event.addListener(map, 'click', onMouseUp);
        kakao.maps.event.addListener(map, 'dragstart', onMouseUp);
      }
      mapContainer.addEventListener('touchstart', handleTouchStart);

      return () => {
        if (map) {
          kakao.maps.event.removeListener(map, 'mousedown', handleMouseDown);
          kakao.maps.event.removeListener(map, 'click', onMouseUp);
          kakao.maps.event.removeListener(map, 'dragstart', onMouseUp);
        }
        mapContainer.removeEventListener('touchstart', handleTouchStart);
      };
    }, [handleMouseDown, onMouseUp, handleTouchStart, map]);

    return <MapViewer ref={mapRef} />;
  },
);

HomeMapViewer.displayName = 'HomeMapViewer';

export default HomeMapViewer;
