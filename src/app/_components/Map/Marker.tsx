import { useContext, useEffect } from 'react';
import { MapContext } from './Map';

interface MarkerProps {
  latitude?: number;
  longitude?: number;
  markerSrc?: string;
  markerSize?: {
    width: number;
    height: number;
  };
  draggble?: boolean;
}

const Marker = ({ latitude, longitude, markerSrc, markerSize, draggble = false }: MarkerProps) => {
  const map = useContext(MapContext);

  useEffect(() => {
    if (map && latitude && longitude) {
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

      marker.setMap(map!);
      marker.setDraggable(draggble);
    }
  }, [draggble, latitude, longitude, map, markerSize?.height, markerSize?.width, markerSrc]);

  return null;
};

export default Marker;
