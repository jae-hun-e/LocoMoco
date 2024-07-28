import { useContext, useEffect, useState } from 'react';
import useKakaoMapService from '@/libs/kakaoMapWrapper';
import { MapContext } from './MapProvider';

interface MarkerProps {
  latitude: number;
  longitude: number;
  markerSrc?: string;
  markerSize?: {
    width: number;
    height: number;
  };
  draggble?: boolean;
}

const Marker = ({ latitude, longitude, markerSrc, markerSize, draggble = false }: MarkerProps) => {
  const map = useContext(MapContext);
  const [mapMarker, setMapMarker] = useState<kakao.maps.Marker>();
  const mapService = useKakaoMapService();

  useEffect(() => {
    if (map) {
      if (latitude === 0 || longitude === 0) return;

      if (mapMarker) {
        mapMarker.setMap(null);
      }

      const movePosition = mapService.createLatLng(latitude, longitude);
      const imageSrc =
        markerSrc ?? 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
      const imageSize = mapService.createSize(markerSize?.width ?? 64, markerSize?.height ?? 69);
      const imageOption = {
        offset: mapService.createPoint(
          markerSize?.width ? markerSize?.width / 2 : 32,
          markerSize?.height ? markerSize?.height / 2 : 69 / 2,
        ),
      };

      const markerImage = mapService.createMarkerImage(imageSrc, imageSize, imageOption);
      const marker = mapService.createMarker({
        position: movePosition,
        image: markerImage,
      });

      marker.setMap(map);
      marker.setDraggable(draggble);
      setMapMarker(marker);
    }
  }, [draggble, latitude, longitude, map, markerSize?.height, markerSize?.width, markerSrc]);

  return null;
};

export default Marker;
