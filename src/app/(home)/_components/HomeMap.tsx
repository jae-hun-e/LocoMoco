import { useEffect, useState } from 'react';
import Clusterer from '@/app/_components/Map/Clusterer';
import Geocoder from '@/app/_components/Map/Geocoder';
import Marker from '@/app/_components/Map/Marker';
import Markers from '@/app/_components/Map/Markers';
import InfoWindow from '@/app/_components/infoWindow/InfoWindow';
import useChangeMapCenter from '@/hooks/useChangeMapCenter';
import useGeolocation from '@/hooks/useGeolocation';
import { useThunderModalStore } from '@/store/thunderModalStore';
import useInfoWindowPosition from '@/store/useInfoWindowPosition';
import { MGCSummary } from '@/types/MGCList';
import { Separator } from '@radix-ui/react-separator';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import SearchBarFilter from './SearchBarFilter';

interface HomeMap {
  data: MGCSummary[] | undefined;
  handleMarkerClick: (mapData: MGCSummary[]) => void;
  openBottomSheetAndUpdate: (mapData: MGCSummary[]) => void;
}

const HomeMap = ({ data, handleMarkerClick, openBottomSheetAndUpdate }: HomeMap) => {
  const router = useRouter();
  const [currentCoordinates, setCurrentCoordinates] = useState({ latitude: 0, longitude: 0 });

  const { toggleModal } = useThunderModalStore();

  const { infoWindowPosition, setInfoWindowPosition } = useInfoWindowPosition();

  const closeInfoWindow = () => {
    setInfoWindowPosition({ latitude: 0, longitude: 0 });
  };

  const location = useGeolocation();
  const { changeCenter } = useChangeMapCenter();

  useEffect(() => {
    if (location.loaded) {
      const { lat, lng } = location.coordinates!;

      setCurrentCoordinates({ latitude: lat, longitude: lng });
      changeCenter(lat, lng);
    }
  }, [changeCenter, location.coordinates, location.loaded]);

  return (
    <Geocoder>
      <section className="flex w-full flex-col items-center">
        <SearchBarFilter />
      </section>
      <Clusterer>
        <Markers
          mapMGCData={data ?? []}
          onMarkerClick={handleMarkerClick}
          onClustererClick={openBottomSheetAndUpdate}
        />
      </Clusterer>
      <Marker
        latitude={currentCoordinates.latitude}
        longitude={currentCoordinates.longitude}
      />
      <InfoWindow
        show={infoWindowPosition.latitude !== 0 && infoWindowPosition.longitude !== 0}
        position={infoWindowPosition}
      >
        <div
          id="infowindow-content"
          // TODO: 임시로 위치 top: -52px해둔 것. 인포윈도우 자체적으로 위치가 이동할 수 았도록 수정 필요 [24.03.18]
          className="bubble-tail relative -top-52pxr flex h-80pxr flex-col rounded-md bg-white shadow-md"
        >
          <div className="flex justify-end">
            <button
              className="pr-10pxr pt-7pxr"
              onClick={closeInfoWindow}
            >
              <X
                width={13}
                height={13}
                fill="gray"
              />
            </button>
          </div>
          <div className="flex grow flex-col items-start justify-evenly">
            <button
              className="w-full px-10pxr text-sm"
              onClick={() => {
                router.push('/create');
                closeInfoWindow();
              }}
            >
              모각코 생성
            </button>
            <Separator />
            <button
              className="w-full px-10pxr text-sm"
              onClick={() => {
                toggleModal();
                closeInfoWindow();
              }}
            >
              ⚡번개 모각코 생성
            </button>
          </div>
        </div>
      </InfoWindow>
    </Geocoder>
  );
};

export default HomeMap;
