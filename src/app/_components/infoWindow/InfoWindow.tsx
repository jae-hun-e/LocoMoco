import React, { useCallback, useEffect, useRef, useState } from 'react';

interface InfoWindow {
  map?: kakao.maps.Map;
  isLoad: boolean;
  show: boolean;
  position: {
    latitude: number;
    longitude: number;
  };
}

const InfoWindow = ({ map, isLoad, show, position }: InfoWindow) => {
  const [customoverlay, setCustomoverlay] = useState<kakao.maps.CustomOverlay>();
  const ref = useRef<HTMLDivElement | null>(null);
  const startPoint = useRef({ x: 0, y: 0 });
  const startOverlayPoint = useRef({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (map && customoverlay && show) {
      customoverlay?.setMap(map);
      customoverlay.setPosition(new kakao.maps.LatLng(position.latitude, position.longitude));
    }
  }, [customoverlay, map, position.latitude, position.longitude, show]);

  useEffect(() => {
    if (isLoad) {
      const customoverlay = new kakao.maps.CustomOverlay({
        content: ref.current!,
        position: new kakao.maps.LatLng(37.4767616, 126.9170176),
        clickable: true,
      });

      setCustomoverlay(customoverlay);
    }
  }, [isLoad, map]);

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
      const newPoint = new kakao.maps.Point(
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
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      e.preventDefault();

      if (!map || !customoverlay) return;

      const proj = map.getProjection(); // 지도 객체로 부터 화면픽셀좌표, 지도좌표간 변환을 위한 MapProjection 객체를 얻어옵니다
      const overlayPos = customoverlay.getPosition(); // 커스텀 오버레이의 현재 위치를 가져옵니다

      const newPoint = new kakao.maps.Point(
        startOverlayPoint.current.x,
        startOverlayPoint.current.y,
      );

      // 계산된 픽셀 좌표를 지도 컨테이너에 해당하는 지도 좌표로 변경합니다
      const newPosition: kakao.maps.LatLng = proj.coordsFromContainerPoint(newPoint);
      console.log('인포윈도우의 좌표', newPosition);

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
    [map, customoverlay, onMouseMove],
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

  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      onTouchStart={onMouseDown}
      id="custom-test"
    >
      인포윈도우
    </div>
  );
};

export default InfoWindow;
