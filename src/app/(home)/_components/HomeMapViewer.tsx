import {
  ForwardedRef,
  MutableRefObject,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import { MapContext } from '@/app/_components/Map/MapProvider';
import MapViewer from '@/app/_components/Map/MapViewer';
import { toast } from '@/components/ui/use-toast';
import useGetAddressByCoordinates from '@/hooks/useGetAddressByCoordinates';
import useGetRegionCodeByCoordinates from '@/hooks/useGetRegionCodeByCoordinates';
import useKakaoMapService from '@/libs/kakaoMapWrapper';
import useCreatedPositionInfo from '@/store/useCreatedPositionInfo';

type Location = { latitude: number; longitude: number };

interface HomeMapViewerProps {
  timerRef: MutableRefObject<NodeJS.Timeout | null>;
  onMouseUp: () => void;
}

const HomeMapViewer = forwardRef(
  ({ timerRef, onMouseUp }: HomeMapViewerProps, mapRef: ForwardedRef<HTMLDivElement>) => {
    const map = useContext(MapContext);
    const mapService = useKakaoMapService();

    const { getAddressByCoorinates } = useGetAddressByCoordinates();
    const { getRegionCodeByCoorinates } = useGetRegionCodeByCoordinates();
    const { setCreatedPositionInfo } = useCreatedPositionInfo();

    const getNewPosition = useCallback(
      async (data: Location) => {
        const { latitude, longitude } = data;

        const newAddress = await getAddressByCoorinates(latitude, longitude);
        const newRegionCode = await getRegionCodeByCoorinates(latitude, longitude);
        if (!newAddress) {
          toast({
            description: '건물이 아닌 곳에 모각코를 생성할 수 없습니다.',
          });
        } else if (newAddress && newRegionCode) {
          setCreatedPositionInfo({
            latitude,
            longitude,
            address: newAddress,
            city: newRegionCode.city!,
            hCity: newRegionCode.hCity!,
          });
        }
      },
      [getAddressByCoorinates, getRegionCodeByCoorinates, setCreatedPositionInfo],
    );

    const handleMouseDown = useCallback(
      (e: kakao.maps.event.MouseEvent) => {
        timerRef.current = setTimeout(() => {
          const latLng = e.latLng;
          getNewPosition({ latitude: latLng.getLat(), longitude: latLng.getLng() });
        }, 1000);
      },
      [timerRef, getNewPosition],
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
            const point = mapService.createPoint(e.touches[0].clientX, e.touches[0].clientY);
            const latLng = mapProjection.coordsFromContainerPoint(point);
            getNewPosition({ latitude: latLng.getLat(), longitude: latLng.getLng() });
          }, 1000);
        }
      },
      [map, getNewPosition, timerRef],
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
