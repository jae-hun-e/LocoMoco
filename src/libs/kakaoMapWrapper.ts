import { useContext } from 'react';
import { MapContext } from '@/app/_components/Map/MapProvider';

type ControlPositionKey = 'TOPLEFT' | 'TOPRIGHT' | 'BOTTOMLEFT' | 'BOTTOMRIGHT';
type StatusKey = 'ERROR' | 'OK' | 'ZERO_RESULT';

interface EventHandlers {
  map: (e: kakao.maps.event.MouseEvent) => void;
  cluster: (e: kakao.maps.Cluster) => void;
}

type EventHandler<T extends keyof EventHandlers> = EventHandlers[T];

export class KakaoMapService {
  map: kakao.maps.Map | undefined;
  clusterer: kakao.maps.MarkerClusterer | undefined;

  constructor(map: kakao.maps.Map | undefined) {
    this.map = map;
  }

  addListener<T extends keyof EventHandlers>(
    target: kakao.maps.event.EventTarget,
    type: string,
    handler: EventHandler<T>,
  ): void {
    window.kakao.maps.event.addListener(target, type, handler);
  }

  removeListener<T extends keyof EventHandlers>(
    target: kakao.maps.event.EventTarget,
    type: string,
    handler: EventHandler<T>,
  ): void {
    window.kakao.maps.event.removeListener(target, type, handler);
  }

  getServicesStatus(status: StatusKey) {
    const servicesStatus: StatusKey = status;

    return window.kakao.maps.services.Status[servicesStatus];
  }

  createMap(container: HTMLElement, options: kakao.maps.MapOptions) {
    this.map = new window.kakao.maps.Map(container, options);
    return this.map;
  }

  createMarker(options: kakao.maps.MarkerOptions) {
    return new kakao.maps.Marker(options);
  }

  createMarkerClusterer(options: kakao.maps.MarkerClustererOptions) {
    this.clusterer = new kakao.maps.MarkerClusterer(options);
    return this.clusterer;
  }

  createCustomOverlay(options: kakao.maps.CustomOverlayOptions) {
    return new kakao.maps.CustomOverlay(options);
  }

  createPoint(x: number, y: number) {
    return new kakao.maps.Point(x, y);
  }

  createSize(width: number, height: number) {
    return new kakao.maps.Size(width, height);
  }

  createMarkerImage(
    src: string,
    size: kakao.maps.Size,
    options?: kakao.maps.MarkerImageOptions | undefined,
  ) {
    return new kakao.maps.MarkerImage(src, size, options);
  }

  createLatLng(latitude: number, longitude: number) {
    return new window.kakao.maps.LatLng(latitude, longitude);
  }

  createGeocoder() {
    return new window.kakao.maps.services.Geocoder();
  }

  addMarkersInClusterer(markers: (kakao.maps.Marker | kakao.maps.CustomOverlay)[]) {
    this.clusterer?.addMarkers(markers);
  }

  addZoomControl(position: ControlPositionKey) {
    const controlPosition: ControlPositionKey = position;

    if (this.map) {
      const zoomControl = new window.kakao.maps.ZoomControl();
      this.map.addControl(zoomControl, kakao.maps.ControlPosition[controlPosition]);
    }
  }
}

const useKakaoMapService = () => {
  const map = useContext(MapContext);

  return new KakaoMapService(map);
};

export default useKakaoMapService;
