import { ForwardedRef, forwardRef, useCallback, useEffect, useRef } from 'react';
import { toast } from '@/components/ui/use-toast';

interface MapProps {
  setCurrentLocation: (a: number, b: number) => void;
  map?: kakao.maps.Map;
  createPositionMarker?: kakao.maps.Marker;
}

const Map = forwardRef(
  (
    { setCurrentLocation, map, createPositionMarker }: MapProps,
    mapRef: ForwardedRef<HTMLDivElement>,
  ) => {
    const onSuccess = useCallback(
      (location: { coords: { latitude: number; longitude: number } }) => {
        setCurrentLocation(location.coords.latitude, location.coords.longitude);
      },
      [setCurrentLocation],
    );

    const onError = useCallback((message?: string) => {
      toast({
        description: message ?? '💡 위치정보를 허용하지 않으면 현재 위치가 표시되지 않습니다!',
      });
    }, []);

    useEffect(() => {
      if (!('geolocation' in navigator)) {
        onError('gps 추적이 불가능합니다.');
      }
      navigator.geolocation.getCurrentPosition(onSuccess, () => onError());
    }, [onError, onSuccess]);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseDown = useCallback(
      (e: kakao.maps.event.MouseEvent, createPositionMarker: kakao.maps.Marker) => {
        // 마우스 다운 이벤트 발생 시 타이머를 설정합니다.
        timerRef.current = setTimeout(() => {
          const latLng = e.latLng;
          const movePosition = new kakao.maps.LatLng(latLng.getLat(), latLng.getLng());

          if (createPositionMarker && map) {
            createPositionMarker.setPosition(movePosition);
            createPositionMarker.setMap(map);
          }
        }, 1500);
      },
      [map],
    );

    const handleMouseUp = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };

    useEffect(() => {
      if (map) {
        kakao.maps.event.addListener(map, 'click', (e: kakao.maps.event.MouseEvent) =>
          handleMouseDown(e, createPositionMarker!),
        );
        kakao.maps.event.addListener(map, 'mouseup', () => handleMouseUp);
        kakao.maps.event.addListener(map, 'touchend', () => handleMouseUp);
      }

      return () => {
        if (map) {
          kakao.maps.event.removeListener(map, 'click', handleMouseDown);
          kakao.maps.event.removeListener(map, 'mouseup', () => handleMouseUp);
          kakao.maps.event.removeListener(map, 'touchend', () => handleMouseUp);
        }

        clearTimeout(timerRef.current!);
      };
    }, [handleMouseDown, map, createPositionMarker]);

    return (
      <>
        <div
          ref={mapRef}
          className="h-[calc(100svh-3.125rem-7.5rem)] w-full"
        ></div>
      </>
    );
  },
);

Map.displayName = 'Map';

export default Map;
