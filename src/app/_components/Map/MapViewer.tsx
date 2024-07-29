import { ForwardedRef, ReactNode, forwardRef } from 'react';

interface MapViewerProps {
  width?: string;
  height?: string;
  children?: ReactNode;
}

const MapViewer = forwardRef(
  ({ width, height, children }: MapViewerProps, mapRef: ForwardedRef<HTMLDivElement>) => {
    const heightVariant = height ? `h-${height}` : 'map-height';
    const widthVariant = width ? `w-${width}` : 'w-full';

    return (
      <div
        id="map"
        ref={mapRef}
        className={`${heightVariant} ${widthVariant} relative`}
      >
        {children}
      </div>
    );
  },
);

MapViewer.displayName = 'MapViewer';

export default MapViewer;
