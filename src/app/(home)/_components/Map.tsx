import { ForwardedRef, forwardRef, useCallback, useEffect, useState } from 'react';
import { CreateMarkerParams, MovePositionParams } from '@/hooks/useCreateKakaoMap';
import useGeolocation from '@/hooks/useGeolocation';
import markerImg from '../../../../public/oh.png';

interface MapProps {
  map?: kakao.maps.Map;
  removeMarker: (marker: kakao.maps.Marker) => void;
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
  handleMouseUp: () => void;
  timerRef: React.MutableRefObject<NodeJS.Timeout | null>;
}

const Map = forwardRef(
  (
    {
      map,
      removeMarker,
      movePosition,
      changeCenter,
      createMarker,
      isLoad,
      handleMouseUp,
      timerRef,
    }: MapProps,
    mapRef: ForwardedRef<HTMLDivElement>,
  ) => {
    const [createdPositionCoordinates, setCreatedPositionCoordinates] =
      useState<kakao.maps.Marker>();
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
        setCreatedPositionCoordinates(
          createMarker({
            latitude: 35.1543440473172,
            longitude: 128.686892962301,
            draggble: true,
            none: true,
            markerSrc: markerImg.src,
            markerSize: {
              width: 40,
              height: 40,
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

    const handleMouseDown = useCallback(
      (e: kakao.maps.event.MouseEvent) => {
        timerRef.current = setTimeout(() => {
          if (createdPositionCoordinates) {
            const latLng = e.latLng;

            if (createdPositionCoordinates && map) {
              movePosition({
                marker: createdPositionCoordinates,
                latitude: latLng.getLat(),
                longitude: latLng.getLng(),
              });
            }
          }
        }, 1000);
      },
      [timerRef, createdPositionCoordinates, map, movePosition],
    );

    const handleTouchStart = useCallback(
      (e: TouchEvent) => {
        if (!(e.target instanceof SVGElement)) return;

        if (map) {
          timerRef.current = setTimeout(() => {
            const mapProjection = map.getProjection();
            const point = new kakao.maps.Point(e.touches[0].clientX, e.touches[0].clientY - 120);
            const latLng = mapProjection.coordsFromContainerPoint(point);

            if (createdPositionCoordinates && map) {
              movePosition({
                marker: createdPositionCoordinates,
                latitude: latLng.getLat(),
                longitude: latLng.getLng(),
              });
            }
          }, 1000);
        }
      },
      [createdPositionCoordinates, map, movePosition, timerRef],
    );

    useEffect(() => {
      const mapContainer = document.getElementById('map')!;

      if (map) {
        kakao.maps.event.addListener(map, 'mousedown', handleMouseDown);
        kakao.maps.event.addListener(map, 'click', handleMouseUp);
        kakao.maps.event.addListener(map, 'dragstart', handleMouseUp);
      }
      mapContainer.addEventListener('touchstart', handleTouchStart);

      return () => {
        if (map) {
          kakao.maps.event.removeListener(map, 'mousedown', handleMouseDown);
          kakao.maps.event.removeListener(map, 'click', handleMouseUp);
          kakao.maps.event.removeListener(map, 'dragstart', handleMouseUp);
        }
        mapContainer.removeEventListener('touchstart', handleTouchStart);
      };
    }, [handleMouseDown, handleMouseUp, handleTouchStart, map]);

    return (
      <div
        id="map"
        ref={mapRef}
        className="h-[calc(100svh-3.125rem-7.5rem)] w-full"
      ></div>
    );
  },
);

Map.displayName = 'Map';

export default Map;
