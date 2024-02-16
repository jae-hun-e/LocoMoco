import { ForwardedRef, forwardRef, useCallback, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

interface MapProps {
  setCurrentLocation: (a: number, b: number) => void;
}

const Map = forwardRef(({ setCurrentLocation }: MapProps, mapRef: ForwardedRef<HTMLDivElement>) => {
  const onSuccess = useCallback(
    (location: { coords: { latitude: number; longitude: number } }) => {
      setCurrentLocation(location.coords.latitude, location.coords.longitude);
    },
    [setCurrentLocation],
  );

  const onError = useCallback((message?: string) => {
    toast({
      description: message ?? '💡 위치정보를 허용하지 않으면 현재 위치가 표시되지 않습니다!',
    });
  }, []);

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError('gps 추적이 불가능합니다.');
    }
    navigator.geolocation.getCurrentPosition(onSuccess, () => onError());
  }, [onError, onSuccess]);

  return (
    <>
      <div
        ref={mapRef}
        className="h-[calc(100svh-3.125rem-7.5rem)] w-full"
      ></div>
    </>
  );
});

Map.displayName = 'Map';

export default Map;
