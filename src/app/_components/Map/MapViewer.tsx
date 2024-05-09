import { ForwardedRef, ReactNode, forwardRef } from 'react';
import { cn } from '@/libs/utils';

interface MapViewerProps {
  width?: string;
  height?: string;
  children?: ReactNode;
}

const MapViewer = forwardRef(
  ({ width, height, children }: MapViewerProps, mapRef: ForwardedRef<HTMLDivElement>) => {
    return (
      <div
        id="map"
        ref={mapRef}
        className={cn(
          `h-${height ?? '[calc(100svh-3.125rem-7.5rem)]'} w-${width ?? 'full'} relative`,
        )}
      >
        {children}
      </div>
    );
  },
);

MapViewer.displayName = 'MapViewer';

export default MapViewer;
