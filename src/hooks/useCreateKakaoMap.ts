import { useCallback, useEffect, useRef, useState } from 'react';

const useCreateKakaoMap = (showCurrentLocation: boolean) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<kakao.maps.Map>();
  const [clusterer, setClusterer] = useState<kakao.maps.MarkerClusterer>();
  const [createPositionMarker, setCreatePositionMarker] = useState<kakao.maps.Marker>();

  const createMarker = useCallback(
    (movePosition: kakao.maps.LatLng, draggble?: boolean, none?: boolean) => {
      // TODO: 임시 현재위치 아이콘 추후에 변경해야함 [24.02.14]
      const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
      const imageSize = new kakao.maps.Size(64, 69);
      const imageOption = { offset: new kakao.maps.Point(27, 69) };

      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
      const marker = new kakao.maps.Marker({
        position: movePosition,
        image: markerImage,
      });

      marker.setMap(none ? null : map!);

      marker.setDraggable(draggble!);

      kakao.maps.event.addListener(marker, 'click', () => {
        // TODO: 모달 컴포넌트 생성되면 모달 컴포넌트 연결 [24.02.17]
        console.log('번개 모각코 생성할 좌표', marker.getPosition());
      });

      return marker;
    },
    [map],
  );

  const setCurrentLocation = useCallback(
    (latitude: number, longitude: number) => {
      if (map && kakao.maps.LatLng) {
        const movePosition = new kakao.maps.LatLng(latitude, longitude);
        map.setCenter(movePosition);
        createMarker(movePosition);
      }
    },
    [createMarker, map],
  );

  const changeCenter = useCallback(
    (latitude: number, longitude: number) => {
      if (map && kakao.maps.LatLng) {
        const movePosition = new kakao.maps.LatLng(latitude, longitude);
        map.setCenter(movePosition);
      }
    },
    [map],
  );

  useEffect(() => {
    window.kakao.maps.load(function () {
      if (mapRef.current != null) {
        const mapOption = {
          // TODO: 임시 기본 위치 추후에 변경해야함 [24.02.14]
          center: new window.kakao.maps.LatLng(35.1543440473172, 128.686892962301),
          level: 3,
        };

        const createdMap = new window.kakao.maps.Map(mapRef.current, mapOption);
        // TODO: 커스텀 컨트롤러 사용할지 논의 후 변경 [24.02.14]
        const zoomControl = new kakao.maps.ZoomControl();
        createdMap.addControl(zoomControl, kakao.maps.ControlPosition.TOPRIGHT);

        const clusterer = new kakao.maps.MarkerClusterer({
          map: createdMap, // 마커들을 클러스터로 관리하고 표시할 지도 객체
          averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel: 6, // 클러스터 할 최소 지도 레벨
          disableClickZoom: true, // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
        });

        setMap(createdMap);

        if (showCurrentLocation) {
          setCreatePositionMarker(createMarker(mapOption.center, true, true));
        }
        setClusterer(clusterer);
      }
    });
  }, [showCurrentLocation]);

  return {
    clusterer,
    map,
    mapRef,
    createPositionMarker,
    createMarker,
    setCurrentLocation,
    changeCenter,
  };
};

export default useCreateKakaoMap;
