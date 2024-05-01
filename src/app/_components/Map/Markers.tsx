import { useCallback, useContext, useEffect } from 'react';
import { MGCSummary } from '@/types/MGCList';
import { clustererContext } from './Clusterer';
import { MapContext } from './Map';

interface MakerInfo {
  marker: kakao.maps.Marker;
  data: MGCSummary;
}

interface MarkersProps {
  mapMGCData: MGCSummary[];
  onMarkerClick?: (mapData: MGCSummary[]) => void;
  onClustererClick?: (mapData: MGCSummary[]) => void;
}

const Markers = ({ mapMGCData, onMarkerClick, onClustererClick }: MarkersProps) => {
  const map = useContext(MapContext);
  const clusterer = useContext(clustererContext);

  const setMarker = useCallback(() => {
    const markersInfo: MakerInfo[] = [];
    // TODO: 임시 아이콘 추후에 변경해야함 [24.04.21]
    const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
    const imageSize = new kakao.maps.Size(24, 35);
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    clusterer?.clear();

    for (const mgc of mapMGCData) {
      if (!(mgc.location.latitude && mgc.location.longitude)) continue;

      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(mgc.location.latitude, mgc.location.longitude),
        image: markerImage,
      });

      kakao.maps.event.addListener(marker, 'click', () => {
        onMarkerClick?.([mgc]);
      });

      const newMarkerInfo = { data: mgc, marker: marker };

      markersInfo.push(newMarkerInfo);
    }

    return markersInfo;
  }, [clusterer, onMarkerClick, mapMGCData]);

  const renderMarkerInCluseter = useCallback(() => {
    const markersInfo = setMarker();
    clusterer?.addMarkers(markersInfo.map((markerInfo) => markerInfo.marker));

    kakao.maps.event.addListener(clusterer!, 'clusterclick', (cluster: kakao.maps.Cluster) => {
      const clusterMarkers = cluster.getMarkers();
      const markerList = [];

      for (const clusterMarker of clusterMarkers) {
        for (const markerInfo of markersInfo) {
          if (markerInfo.marker === clusterMarker) {
            markerList.push(markerInfo.data);
          }
        }
      }

      onClustererClick?.(markerList);
    });
  }, [clusterer, onClustererClick, setMarker]);

  const renderMarkerInMap = useCallback(() => {
    const markersInfo = setMarker();

    for (const markerInfo of markersInfo) {
      const marker = new kakao.maps.Marker({
        map: map,
        position: markerInfo.marker.getPosition(),
      });

      kakao.maps.event.addListener(marker, 'click', () => {
        onMarkerClick?.([markerInfo.data]);
      });
    }
  }, [map, onMarkerClick, setMarker]);

  useEffect(() => {
    if (clusterer) {
      renderMarkerInCluseter();
    } else if (map) {
      renderMarkerInMap();
    }
  }, [clusterer, map, renderMarkerInCluseter, renderMarkerInMap]);

  return null;
};

export default Markers;
