import { ForwardedRef, forwardRef, useCallback, useEffect, useState } from 'react';
import { CreateMarkerParams, MovePositionParams } from '@/hooks/useCreateKakaoMap';
import useGeolocation from '@/hooks/useGeolocation';
import useInfoWindowPosition from '@/store/useInfoWindowPosition';

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
    useState<kakao.maps.Marker>();
    const [currentPositionMarker, setCurrentPositionMarker] = useState<kakao.maps.Marker>();

    const location = useGeolocation();

    const { setInfoWindowPosition } = useInfoWindowPosition();

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
          const latLng = e.latLng;

          setInfoWindowPosition({ latitude: latLng.getLat(), longitude: latLng.getLng() });
        }, 1000);
      },
      [timerRef, setInfoWindowPosition],
    );

    const handleTouchStart = useCallback(
      (e: TouchEvent) => {
        const target = e.target as HTMLElement;

        if (target.closest('#infowindow')) return;

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
