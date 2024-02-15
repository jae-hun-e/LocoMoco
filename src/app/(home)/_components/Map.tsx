import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { MGCSummary } from '@/types/MGCSummary';

interface MakerInfo {
  marker: kakao.maps.Marker;
  data: MGCSummary;
}

const Map = ({ MGCData }: { MGCData: MGCSummary[] }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<kakao.maps.Map>();
  const [clusterer, setClusterer] = useState<kakao.maps.MarkerClusterer>();

  const setMarker = () => {
    const markersInfo = [] as MakerInfo[];
    // TODO: 임시 아이콘 추후에 변경해야함 [24.02.14]
    const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
    const imageSize = new kakao.maps.Size(24, 35);
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    clusterer?.clear();

    for (const mgc of MGCData) {
      if (mgc.location.length === 0) continue;

      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(mgc.location[0], mgc.location[1]),
        image: markerImage,
      });

      const newMarkerInfo = { data: mgc, marker: marker };

      markersInfo.push(newMarkerInfo);
    }

    return markersInfo;
  };

  const renderMarker = useCallback(
    (clusterer: kakao.maps.MarkerClusterer) => {
      const markersInfo = setMarker();

      clusterer.addMarkers(markersInfo.map((markerInfo) => markerInfo.marker));
    },
    [MGCData],
  );

  const createMarker = useCallback(
    (movePosition: kakao.maps.LatLng) => {
      // TODO: 임시 현재위치 아이콘 추후에 변경해야함 [24.02.14]
      const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
      const imageSize = new kakao.maps.Size(64, 69);
      const imageOption = { offset: new kakao.maps.Point(27, 69) };

      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
      const marker = new kakao.maps.Marker({
        position: movePosition,
        image: markerImage,
      });

      marker.setMap(map!);
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

  useEffect(() => {
    window.kakao.maps.load(function () {
      if (mapRef.current != null) {
        const mapOption = {
          // TODO: 임시 기본 위치 추후에 변경해야함 [24.02.14]
          center: new window.kakao.maps.LatLng(33.452613, 126.570888),
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
        setClusterer(clusterer);
        renderMarker(clusterer);
      }
    });
  }, [renderMarker]);

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

  return (
    <>
      <div
        ref={mapRef}
        className="h-[calc(100svh-3.125rem-7.5rem)] w-full"
      ></div>
    </>
  );
};

export default Map;
