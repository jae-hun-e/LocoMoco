import React, {
  ForwardedRef,
  MutableRefObject,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import { MapContext } from '@/app/_components/Map/MapProvider';
import MapViewer from '@/app/_components/Map/MapViewer';
import useKakaoMapService from '@/libs/kakaoMapWrapper';
import useInfoWindowPosition from '@/store/useInfoWindowPosition';

interface HomeMapViewerProps {
  timerRef: MutableRefObject<NodeJS.Timeout | null>;
  onMouseUp: () => void;
}

const HomeMapViewer = forwardRef(
  ({ timerRef, onMouseUp }: HomeMapViewerProps, mapRef: ForwardedRef<HTMLDivElement>) => {
    const map = useContext(MapContext);
    const mapService = useKakaoMapService();

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
        if (e.touches.length > 1 && timerRef.current) {
          clearTimeout(timerRef.current);
          return;
        }

        const target = e.target as HTMLElement;

        if (target.closest('#infowindow')) return;

        if (!(e.target instanceof SVGElement)) return;

        if (map) {
          timerRef.current = setTimeout(() => {
            const mapProjection = map.getProjection();
            const point = mapService.createPoint(e.touches[0].clientX, e.touches[0].clientY - 120);
            const latLng = mapProjection.coordsFromContainerPoint(point);
            setInfoWindowPosition({ latitude: latLng.getLat(), longitude: latLng.getLng() });
          }, 1000);
        }
      },
      [map, setInfoWindowPosition, timerRef],
    );

    const findAllSvgElements = useCallback((parentElement: Element | SVGElement) => {
      for (let i = 0; i < parentElement.children.length; i++) {
        const child = parentElement.children[i];

        if (child.tagName === 'svg' && child instanceof SVGElement) {
          child.classList.add('no-select');
        }

        if (child.children.length > 0) {
          findAllSvgElements(child);
        }
      }
    }, []);

    useEffect(() => {
      const mapContainer = document.getElementById('map')!;

      if (map) {
        mapService.addListener(map, 'mousedown', handleMouseDown);
        mapService.addListener(map, 'click', onMouseUp);
        mapService.addListener(map, 'dragstart', onMouseUp);
        mapContainer.addEventListener('touchstart', handleTouchStart);

        findAllSvgElements(mapContainer);
      }

      return () => {
        if (map) {
          mapService.removeListener(map, 'mousedown', handleMouseDown);
          mapService.removeListener(map, 'click', onMouseUp);
          mapService.removeListener(map, 'dragstart', onMouseUp);
          mapContainer.removeEventListener('touchstart', handleTouchStart);
        }
      };
    }, [handleMouseDown, onMouseUp, handleTouchStart, map, findAllSvgElements]);

    return (
      <MapViewer
        ref={mapRef}
        topGap="large"
      />
    );
  },
);

HomeMapViewer.displayName = 'HomeMapViewer';

export default HomeMapViewer;
