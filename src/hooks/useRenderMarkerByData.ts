import { useCallback } from 'react';
import { MGCSummary } from '@/types/MGCList';

interface MakerInfo {
  marker: kakao.maps.Marker;
  data: MGCSummary;
}

const useRenderMarkerByData = (openBottomSheetAndUpdate: (mapData: MGCSummary[]) => void) => {
  const setMarker = useCallback(
    (mapMGCData: MGCSummary[], clusterer: kakao.maps.MarkerClusterer) => {
      const markersInfo: MakerInfo[] = [];
      // TODO: 임시 아이콘 추후에 변경해야함 [24.02.14]
      const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
      const imageSize = new kakao.maps.Size(24, 35);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      clusterer?.clear();

      for (let i = 0; i < mapMGCData.length; i++) {
        const mgc = mapMGCData[i];
        if (!(mgc.location.latitude && mgc.location.longitude)) continue;

        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(mgc.location.latitude, mgc.location.longitude),
          image: markerImage,
        });

        kakao.maps.event.addListener(marker, 'click', () => {
          openBottomSheetAndUpdate([mgc]);
        });

        const newMarkerInfo = { data: mgc, marker: marker };

        markersInfo.push(newMarkerInfo);
      }

      return markersInfo;
    },
    [openBottomSheetAndUpdate],
  );

  const renderMarker = (clusterer: kakao.maps.MarkerClusterer, mapMGCData: MGCSummary[]) => {
    const markersInfo = setMarker(mapMGCData, clusterer);
    clusterer.addMarkers(markersInfo.map((markerInfo) => markerInfo.marker));

    kakao.maps.event.addListener(clusterer, 'clusterclick', (cluster: kakao.maps.Cluster) => {
      const clusterMarkers = cluster.getMarkers();
      const markerList = [];

      for (const clusterMarker of clusterMarkers) {
        for (const markerInfo of markersInfo) {
          if (markerInfo.marker === clusterMarker) {
            markerList.push(markerInfo.data);
          }
        }
      }

      openBottomSheetAndUpdate(markerList);
    });
  };

  return renderMarker;
};

export default useRenderMarkerByData;
