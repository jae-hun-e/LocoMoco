import { useCallback, useContext, useEffect } from 'react';
import useKakaoMapService from '@/libs/kakaoMapWrapper';
import { MGCSummary } from '@/types/MGCList';
import createdMarker from '../../../../public/created-mgc-marker.png';
import { clustererContext } from './ClustererProvider';
import { MapContext } from './MapProvider';

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
  const mapService = useKakaoMapService();

  const setMarker = useCallback(() => {
    const markersInfo: MakerInfo[] = [];
    const imageSrc = createdMarker.src;
    const imageSize = mapService.createSize(34, 39);
    const markerImage = mapService.createMarkerImage(imageSrc, imageSize);

    clusterer?.clear();

    for (const mgc of mapMGCData) {
      if (!(mgc.location.latitude && mgc.location.longitude)) continue;

      const marker = mapService.createMarker({
        position: mapService.createLatLng(mgc.location.latitude, mgc.location.longitude),
        image: markerImage,
      });

      mapService.addListener(marker, 'click', () => {
        onMarkerClick?.([mgc]);
      });

      const newMarkerInfo = { data: mgc, marker: marker };

      markersInfo.push(newMarkerInfo);
    }

    return markersInfo;
  }, [clusterer, onMarkerClick, mapMGCData]);

  const renderMarkerInCluseter = useCallback(() => {
    const markersInfo = setMarker();
    mapService.addMarkersInClusterer(markersInfo.map((markerInfo) => markerInfo.marker));

    mapService.addListener(clusterer!, 'clusterclick', (cluster: kakao.maps.Cluster) => {
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
      const marker = mapService.createMarker({
        map: map,
        position: markerInfo.marker.getPosition(),
      });
      mapService.addListener(marker, 'click', () => {
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
