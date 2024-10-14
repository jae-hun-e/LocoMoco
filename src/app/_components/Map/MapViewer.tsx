import { ForwardedRef, forwardRef } from 'react';
import MapCustomControl from '../MapCustomControl';

interface MapViewerProps {
  width?: string;
  height?: string;
  topGap: 'small' | 'large';
}

const MapViewer = forwardRef(
  ({ width, height, topGap }: MapViewerProps, mapRef: ForwardedRef<HTMLDivElement>) => {
    const heightVariant = height ? `h-${height}` : 'body-height';
    const widthVariant = width ? `w-${width}` : 'w-full';

    return (
      <div
        id="map"
        ref={mapRef}
        className={`${heightVariant} ${widthVariant} relative`}
      >
        <MapCustomControl topGap={topGap} />
      </div>
    );
  },
);

MapViewer.displayName = 'MapViewer';

export default MapViewer;
