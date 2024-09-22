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
    if (navigator.permissions && typeof navigator.permissions.query === 'function') {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then(() => {
          if (!('geolocation' in navigator)) {
            onError('gps 추적이 불가능합니다.');
          }
          navigator.geolocation.getCurrentPosition(onSuccess, () => onError());
        })
        .catch((error) => {
          console.error('Permission query failed:', error);
          onError('권한 확인 중 문제가 발생했습니다.');
        });
    } else {
      if (!('geolocation' in navigator)) {
        onError('gps 추적이 불가능합니다.');
      }
      navigator.geolocation.getCurrentPosition(onSuccess, () => onError());
    }
  }, [onError, onSuccess]);

  useEffect(() => {
    let permissionStatus;

    const checkPermission = () => {
      if (navigator.permissions && typeof navigator.permissions.query === 'function') {
        navigator.permissions
          .query({ name: 'geolocation' })
          .then((status) => {
            permissionStatus = status;
            permissionStatus.addEventListener('change', handlePermissionChange);
          })
          .catch((error) => {
            console.error('Permission query failed in effect:', error);
          });
      }
    };

    handlePermissionChange();
    checkPermission();

    return () => {
      if (permissionStatus) {
        permissionStatus.removeEventListener('change', handlePermissionChange);
      }
    };
  }, [handlePermissionChange]);

  return location;
};

export default useGeolocation;
