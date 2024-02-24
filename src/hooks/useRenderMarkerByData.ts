import { useCallback } from 'react';
import { MGCDetail } from '@/types/MGCList';

interface MakerInfo {
  marker: kakao.maps.Marker;
  data: MGCDetail;
}

const useRenderMarkerByData = (openSheetUpdate: (mapData: MGCDetail[]) => void) => {
  const setMarker = useCallback(
    (mapMGCData: MGCDetail[], clusterer: kakao.maps.MarkerClusterer) => {
      console.log('setNarker', mapMGCData);
      const markersInfo = [] as MakerInfo[];
      // TODO: 임시 아이콘 추후에 변경해야함 [24.02.14]
      const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
      const imageSize = new kakao.maps.Size(24, 35);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      clusterer?.clear();

      for (const mgc of mapMGCData) {
        if (!mgc.location.latitude && mgc.location.longitude) continue;

        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(mgc.location.latitude, mgc.location.longitude),
          image: markerImage,
        });

        kakao.maps.event.addListener(marker, 'click', () => {
          console.log(marker, mgc);
          openSheetUpdate([mgc]);
        });

        const newMarkerInfo = { data: mgc, marker: marker };

        markersInfo.push(newMarkerInfo);
      }

      return markersInfo;
    },
    [openSheetUpdate],
  );

  const renderMarker = (clusterer: kakao.maps.MarkerClusterer, mapMGCData: MGCDetail[]) => {
    const markersInfo = setMarker(mapMGCData, clusterer);
    console.log('markersInfo', markersInfo);
    clusterer.addMarkers(markersInfo.map((markerInfo) => markerInfo.marker));

    kakao.maps.event.addListener(clusterer, 'clusterclick', (cluster: kakao.maps.Cluster) => {
      const clusterMarkers = cluster.getMarkers();
      const markerList = [];
      console.log('ffff', clusterMarkers);
      console.log('eee', markersInfo);

      // data: {모각코리스트들}, marker: {}
      //   console.log('111', markersInfo[0].marker, clusterMarkers[0]);
      //   console.log('000', markersInfo[0].marker === clusterMarkers[0]);

      for (const clusterMarker of clusterMarkers) {
        for (const item of markersInfo) {
          console.log('@@@ : ', item, clusterMarker);
        }
        //   console.log(
        //     'ddd: ',
        //     markersInfo.filter((markerInfo) => markerInfo.marker === clusterMarker),
        //   );
        markerList.push(
          markersInfo.filter((markerInfo) => markerInfo.marker === clusterMarker)[0].data,
        );
      }

      //   openSheetUpdate(markerList);
    });
  };

  return renderMarker;
};

export default useRenderMarkerByData;
