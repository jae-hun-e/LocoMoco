import React, { ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react';
import useGetAddressByCoordinates from '@/hooks/useGetAddressByCoordinates';
import useKakaoMapService from '@/libs/kakaoMapWrapper';
import useCreatedPositionInfo from '@/store/useCreatedPositionInfo';
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

  const [customoverlay, setCustomoverlay] = useState<kakao.maps.CustomOverlay>();
  const ref = useRef<HTMLDivElement | null>(null);
  const startPoint = useRef({ x: 0, y: 0 });
  const startOverlayPoint = useRef({
    x: 0,
    y: 0,
  });

  const { setCreatedPositionInfo } = useCreatedPositionInfo();
  const { getAddressByCoorinates } = useGetAddressByCoordinates();

  const getNewPosition = useCallback(
    async (data: Location) => {
      const { latitude, longitude } = data;

      const cityAddress = await getAddressByCoorinates(latitude, longitude);
      setCreatedPositionInfo({
        latitude,
        longitude,
        city: cityAddress!,
        address: cityAddress!,
      });
    },
    [getAddressByCoorinates, setCreatedPositionInfo],
  );

  useEffect(() => {
    if (map && customoverlay) {
      if (show) {
        customoverlay.setMap(map);
        const latLng = mapService.createLatLng(position.latitude, position.longitude);
        customoverlay.setPosition(latLng);
      } else {
        customoverlay.setMap(null);
      }
    }
  }, [customoverlay, map, position.latitude, position.longitude, show]);

  useEffect(() => {
    if (map) {
      const customoverlayOption = {
        content: ref.current!,
        position: mapService.createLatLng(37.4767616, 126.9170176),
        clickable: true,
      };
      const customoverlay = mapService.createCustomOverlay(customoverlayOption);

      setCustomoverlay(customoverlay);
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

      if (!map || !customoverlay) return;

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

      customoverlay.setPosition(newPos);
    },
    [customoverlay, map],
  );

  const onMouseDown = useCallback(
    async (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      e.preventDefault();

      if (!map || !customoverlay) return;

      const proj = map.getProjection(); // 지도 객체로 부터 화면픽셀좌표, 지도좌표간 변환을 위한 MapProjection 객체를 얻어옵니다
      const overlayPos = customoverlay.getPosition(); // 커스텀 오버레이의 현재 위치를 가져옵니다

      const newPoint = mapService.createPoint(
        startOverlayPoint.current.x,
        startOverlayPoint.current.y,
      );

      // 계산된 픽셀 좌표를 지도 컨테이너에 해당하는 지도 좌표로 변경합니다
      const newPosition: kakao.maps.LatLng = proj.coordsFromContainerPoint(newPoint);
      console.log('인포윈도우의 좌표', newPosition);

      getNewPosition({
        latitude: newPosition.getLat(),
        longitude: newPosition.getLng(),
      });

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
    [map, customoverlay, getNewPosition, onMouseMove],
  );

  const onMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('touchmove', onMouseMove);
  }, [onMouseMove]);

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
