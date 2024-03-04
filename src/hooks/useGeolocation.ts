import { useCallback, useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';

interface LocationType {
  loaded: boolean;
  coordinates?: { lat: number; lng: number };
}

const useGeolocation = () => {
  const [location, setLocation] = useState<LocationType>({
    loaded: false,
    coordinates: { lat: 0, lng: 0 },
  });

  const onSuccess = useCallback((location: { coords: { latitude: number; longitude: number } }) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  }, []);

  const onError = useCallback((message?: string) => {
    setLocation({
      loaded: false,
    });
    toast({
      description: message ?? '💡 위치정보를 허용하지 않으면 현재 위치가 표시되지 않습니다!',
    });
  }, []);

  const handlePermissionChange = useCallback(() => {
    navigator.permissions.query({ name: 'geolocation' }).then(() => {
      if (!('geolocation' in navigator)) {
        onError('gps 추적이 불가능합니다.');
      }
      navigator.geolocation.getCurrentPosition(onSuccess, () => onError());
    });
  }, [onError, onSuccess]);

  useEffect(() => {
    handlePermissionChange();

    navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
      permissionStatus.addEventListener('change', handlePermissionChange);
    });

    return () => {
      navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
        permissionStatus.removeEventListener('change', handlePermissionChange);
      });
    };
  }, [handlePermissionChange]);

  return location;
};

export default useGeolocation;
