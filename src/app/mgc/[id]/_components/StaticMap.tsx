import { useEffect, useRef } from 'react';
import { LocationInfo } from '@/apis/mgc/queryFn';
import useKakaoMapService from '@/libs/kakaoMapWrapper';
import createdMarker from '../../../../../public/created-mgc-marker.png';

interface Props {
  location: LocationInfo;
}

const StaticMap = ({ location: { address, latitude, longitude } }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapService = useKakaoMapService();

  useEffect(() => {
    const imageSrc = createdMarker.src;
    const imageSize = mapService.createSize(34, 39);
    const markerImage = mapService.createMarkerImage(imageSrc, imageSize);

    const position = mapService.createLatLng(latitude, longitude);
    const marker = mapService.createMarker({ position, image: markerImage });

    if (mapRef.current != null) {
      const mapOption = {
        center: position,
        level: 3,
        marker: { position },
      };

      const staticMap = mapService.createMap(mapRef.current, mapOption);
      staticMap.setDraggable(false);
      staticMap.setZoomable(false);
      marker.setMap(staticMap);
    }
    // });
  }, [mapRef]);

  return (
    <>
      <div
        className="mb-10pxr mt-30pxr h-150pxr w-full bg-layer-5"
        ref={mapRef}
      ></div>
      <div className="text-sm">장소: {address}</div>
    </>
  );
};

export default StaticMap;
