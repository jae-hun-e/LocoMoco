import { useCallback, useEffect, useRef, useState } from 'react';

export interface CreateMarkerParams {
  latitude: number;
  longitude: number;
  draggble?: boolean;
  none?: boolean;
  markerSrc?: string;
  markerSize?: {
    width: number;
    height: number;
  };
}

export interface MovePositionParams {
  marker: kakao.maps.Marker;
  latitude: number;
  longitude: number;
}

const useCreateKakaoMap = (isCustomlevelControl = false) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<kakao.maps.Map>();
  const [clusterer, setClusterer] = useState<kakao.maps.MarkerClusterer>();
  const [isLoad, setIsLoad] = useState(false);

  const createMarker = useCallback(
    ({ latitude, longitude, draggble, none, markerSrc, markerSize }: CreateMarkerParams) => {
      // TODO: 임시 현재위치 아이콘 추후에 변경해야함 [24.02.14]
      const movePosition = new kakao.maps.LatLng(latitude, longitude);
      const imageSrc =
        markerSrc ?? 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
      const imageSize = new kakao.maps.Size(markerSize?.width ?? 64, markerSize?.height ?? 69);
      const imageOption = {
        offset: new kakao.maps.Point(
          markerSize?.width ? markerSize?.width / 2 : 32,
          markerSize?.height ? markerSize?.height / 2 : 69 / 2,
        ),
      };

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

  const removeMarker = (marker: kakao.maps.Marker) => {
    marker?.setMap(null);
  };

  const movePosition = ({ marker, latitude, longitude }: MovePositionParams) => {
    marker.setPosition(new kakao.maps.LatLng(latitude, longitude));
    marker.setMap(map!);
  };

  const changeCenter = useCallback(
    (latitude: number, longitude: number) => {
      if (map && kakao.maps.LatLng) {
        const movePosition = new kakao.maps.LatLng(latitude, longitude);
        map.setCenter(movePosition);
      }
    },
    [map],
  );

  const zoomIn = () => {
    if (map) {
      const level = map.getLevel();

      map.setLevel(level - 1);
    }
  };

  const zoomOut = () => {
    if (map) {
      const level = map.getLevel();

      map.setLevel(level + 1);
    }
  };

  useEffect(() => {
    window.kakao.maps.load(function () {
      if (mapRef.current != null) {
        const mapOption = {
          // TODO: 임시 기본 위치 추후에 변경해야함 [24.02.14]
          center: new window.kakao.maps.LatLng(35.1543440473172, 128.686892962301),
          level: 3,
        };

        const createdMap = new window.kakao.maps.Map(mapRef.current, mapOption);
        if (!isCustomlevelControl) {
          const zoomControl = new kakao.maps.ZoomControl();
          createdMap.addControl(zoomControl, kakao.maps.ControlPosition.TOPRIGHT);
        }

        const clusterer = new kakao.maps.MarkerClusterer({
          map: createdMap, // 마커들을 클러스터로 관리하고 표시할 지도 객체
          averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel: 6, // 클러스터 할 최소 지도 레벨
          disableClickZoom: true, // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
        });

        setMap(createdMap);
        setClusterer(clusterer);
        setIsLoad(true);
      }
    });
  }, [isCustomlevelControl]);

  return {
    clusterer,
    map,
    mapRef,
    createMarker,
    changeCenter,
    removeMarker,
    movePosition,
    zoomIn,
    zoomOut,
    isLoad,
  };
};

export default useCreateKakaoMap;
