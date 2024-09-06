import React, { ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import useGetAddressByCoordinates from '@/hooks/useGetAddressByCoordinates';
import useGetRegionCodeByCoordinates from '@/hooks/useGetRegionCodeByCoordinates';
import useKakaoMapService from '@/libs/kakaoMapWrapper';
import useCreatedPositionInfo from '@/store/useCreatedPositionInfo';
import useInfoWindowPosition from '@/store/useInfoWindowPosition';
import { MapContext } from '../Map/MapProvider';

interface InfoWindow {
  show: boolean;
  position: {
    latitude: number;
    longitude: number;
  };
  children?: ReactNode;
}

type Location = { latitude: number; longitude: number };

const InfoWindow = ({ show, position, children }: InfoWindow) => {
  const map = useContext(MapContext);
  const mapService = useKakaoMapService();

  const [isMoving, setIsMoving] = useState(false);

  const customoverlay = useRef<kakao.maps.CustomOverlay | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const startPoint = useRef({ x: 0, y: 0 });
  const startOverlayPoint = useRef({
    x: 0,
    y: 0,
  });

  const { setInfoWindowPosition } = useInfoWindowPosition();
  const { setCreatedPositionInfo } = useCreatedPositionInfo();

  const { getAddressByCoorinates } = useGetAddressByCoordinates();
  const { getRegionCodeByCoorinates } = useGetRegionCodeByCoordinates();

  const getNewPosition = useCallback(
    async (data: Location) => {
      const { latitude, longitude } = data;

      const newAddress = await getAddressByCoorinates(latitude, longitude);
      const newRegionCode = await getRegionCodeByCoorinates(latitude, longitude);

      if (!newAddress) {
        setInfoWindowPosition({ latitude: 0, longitude: 0 });
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

  useEffect(() => {
    if (map && customoverlay.current) {
      if (show) {
        customoverlay.current.setMap(map);
        const latLng = mapService.createLatLng(position.latitude, position.longitude);
        customoverlay.current.setPosition(latLng);
        getNewPosition({
          latitude: position.latitude,
          longitude: position.longitude,
        });
      } else {
        customoverlay.current.setMap(null);
      }
    }
  }, [customoverlay, getNewPosition, map, position.latitude, position.longitude, show]);

  useEffect(() => {
    if (map) {
      const customoverlayOption = {
        content: ref.current!,
        position: mapService.createLatLng(37.4767616, 126.9170176),
        clickable: true,
      };
      const overlay = mapService.createCustomOverlay(customoverlayOption);
      customoverlay.current = overlay;
    }
  }, [map]);

  const isMouseEvent = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>,
  ): event is React.MouseEvent<HTMLDivElement, MouseEvent> => {
    return (event as React.MouseEvent<HTMLDivElement, MouseEvent>).clientX !== undefined;
  };

  const onMouseMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      e.preventDefault();

      if (!map || !customoverlay.current) return;

      setIsMoving(true);

      const proj = map.getProjection(); // 지도 객체로 부터 화면픽셀좌표, 지도좌표간 변환을 위한 MapProjection 객체를 얻어옵니다

      let deltaX: number = 0;
      let deltaY: number = 0;

      if (e instanceof MouseEvent) {
        deltaX = startPoint.current.x - e.clientX; // mousedown한 픽셀좌표에서 mousemove한 좌표를 빼서 실제로 마우스가 이동된 픽셀좌표를 구합니다
        deltaY = startPoint.current.y - e.clientY;
      }

      if (e instanceof TouchEvent) {
        deltaX = startPoint.current.x - e.touches[0].clientX;
        deltaY = startPoint.current.y - e.touches[0].clientY;
      }

      // mousedown됐을 때의 커스텀 오버레이의 좌표에 실제로 마우스가 이동된 픽셀좌표를 반영합니다
      const newPoint = mapService.createPoint(
        startOverlayPoint.current.x - deltaX,
        startOverlayPoint.current.y - deltaY,
      );
      // 계산된 픽셀 좌표를 지도 컨테이너에 해당하는 지도 좌표로 변경합니다
      const newPos = proj.coordsFromContainerPoint(newPoint);

      customoverlay.current.setPosition(newPos);
    },
    [customoverlay, map],
  );

  const onMouseDown = useCallback(
    async (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      e.preventDefault();

      if (!map || !customoverlay.current) return;

      const proj = map.getProjection(); // 지도 객체로 부터 화면픽셀좌표, 지도좌표간 변환을 위한 MapProjection 객체를 얻어옵니다
      const overlayPos = customoverlay.current.getPosition(); // 커스텀 오버레이의 현재 위치를 가져옵니다

      // 커스텀오버레이에서 마우스 관련 이벤트가 발생해도 지도가 움직이지 않도록 합니다
      kakao.maps.event.preventMap();

      if (isMouseEvent(e)) {
        startPoint.current.x = e.clientX;
        startPoint.current.y = e.clientY;
      } else {
        startPoint.current.x = e.touches[0].clientX;
        startPoint.current.y = e.touches[0].clientY;
      }

      startOverlayPoint.current = proj.containerPointFromCoords(overlayPos);

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('touchmove', onMouseMove);
    },
    [map, onMouseMove],
  );

  const onMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('touchmove', onMouseMove);

    if (!map || !customoverlay.current) return;

    const proj = map.getProjection(); // 지도 객체로 부터 화면픽셀좌표, 지도좌표간 변환을 위한 MapProjection 객체를 얻어옵니다

    const overlayPos = customoverlay.current.getPosition();
    const finalPoint = proj.containerPointFromCoords(overlayPos);

    const newPosition: kakao.maps.LatLng = proj.coordsFromContainerPoint(finalPoint);

    if (show && isMoving) {
      getNewPosition({
        latitude: newPosition.getLat(),
        longitude: newPosition.getLng(),
      });
    }
    setIsMoving(false);
  }, [getNewPosition, customoverlay, isMoving, map, onMouseMove, show]);

  useEffect(() => {
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseUp, map, customoverlay]);

  return map ? (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      onTouchStart={onMouseDown}
      id="infowindow"
    >
      {children}
    </div>
  ) : null;
};

export default InfoWindow;
