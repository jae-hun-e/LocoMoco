import { ForwardedRef, forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { CreateMarkerParams, MovePositionParams } from '@/hooks/useCreateKakaoMap';
import useGeolocation from '@/hooks/useGeolocation';
import markerImg from '../../../../public/oh.png';

interface MapProps {
  map?: kakao.maps.Map;
  createPositionMarker?: kakao.maps.Marker;
  removeMarker: (marker: kakao.maps.Marker) => void;
  currentPositionMarker?: kakao.maps.Marker;
  movePosition: ({ marker, latitude, longitude }: MovePositionParams) => void;
  changeCenter: (latitude: number, longitude: number) => void;
  createMarker: ({
    latitude,
    longitude,
    draggble,
    none,
    markerSrc,
    markerSize,
  }: CreateMarkerParams) => kakao.maps.Marker;
  isLoad: boolean;
}

const Map = forwardRef(
  (
    { map, removeMarker, movePosition, changeCenter, createMarker, isLoad }: MapProps,
    mapRef: ForwardedRef<HTMLDivElement>,
  ) => {
    const [createPositionMarker, setCreatePositionMarker] = useState<kakao.maps.Marker>();
    const [currentPositionMarker, setCurrentPositionMarker] = useState<kakao.maps.Marker>();

    const location = useGeolocation();

    useEffect(() => {
      if (location.loaded && currentPositionMarker) {
        const { lat, lng } = location.coordinates!;
        movePosition({ marker: currentPositionMarker, latitude: lat, longitude: lng });
        changeCenter(lat, lng);
      } else {
        removeMarker(currentPositionMarker!);
      }
    }, [changeCenter, currentPositionMarker, location.coordinates, location.loaded]);

    useEffect(() => {
      if (isLoad) {
        setCreatePositionMarker(
          createMarker({
            latitude: 35.1543440473172,
            longitude: 128.686892962301,
            draggble: true,
            none: true,
            markerSrc: markerImg.src,
            markerSize: {
              width: 30,
              height: 30,
            },
          }),
        );

        setCurrentPositionMarker(
          createMarker({
            latitude: 35.1543440473172,
            longitude: 128.686892962301,
            draggble: false,
            none: true,
          }),
        );
      }
    }, [createMarker, isLoad]);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseDown = useCallback(
      (e: kakao.maps.event.MouseEvent, createPositionMarker: kakao.maps.Marker) => {
        // 마우스 다운 이벤트 발생 시 타이머를 설정합니다.
        timerRef.current = setTimeout(() => {
          const latLng = e.latLng;

          if (createPositionMarker && map) {
            movePosition({
              marker: createPositionMarker,
              latitude: latLng.getLat(),
              longitude: latLng.getLng(),
            });
          }
        }, 1500);
      },
      [map, movePosition],
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
