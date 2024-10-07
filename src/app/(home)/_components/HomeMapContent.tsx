import { useCallback, useEffect, useState } from 'react';
import ClustererProvider from '@/app/_components/Map/ClustererProvider';
import Marker from '@/app/_components/Map/Marker';
import Markers from '@/app/_components/Map/Markers';
import InfoWindow from '@/app/_components/infoWindow/InfoWindow';
import useChangeMapCenter from '@/hooks/useChangeMapCenter';
import useGeolocation from '@/hooks/useGeolocation';
import useGetAddressByCoordinates from '@/hooks/useGetAddressByCoordinates';
import { useThunderModalStore } from '@/store/thunderModalStore';
import useInfoWindowPosition from '@/store/useInfoWindowPosition';
import useSearchInputValueStore from '@/store/useSearchValueStore';
import { MGCSummary } from '@/types/MGCList';
import { Separator } from '@radix-ui/react-separator';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import currentLocationMarker from '../../../../public/current-location-marker.png';
import SearchBarFilter from './SearchBarFilter';
import ThunderModal from './ThunderModal/ThunderModal';

interface HomeMap {
  data: MGCSummary[] | undefined;
  handleMarkerClick: (mapData: MGCSummary[]) => void;
  openBottomSheetAndUpdate: (mapData: MGCSummary[]) => void;
}

const HomeMapContent = ({ data, handleMarkerClick, openBottomSheetAndUpdate }: HomeMap) => {
  const router = useRouter();
  const [currentCoordinates, setCurrentCoordinates] = useState({ latitude: 0, longitude: 0 });

  const { toggleModal } = useThunderModalStore();

  const { infoWindowPosition, setInfoWindowPosition } = useInfoWindowPosition();

  const closeInfoWindow = () => {
    setInfoWindowPosition({ latitude: 0, longitude: 0 });
  };

  const location = useGeolocation();
  const { changeCenter } = useChangeMapCenter();

  const { getAddressByCoorinates } = useGetAddressByCoordinates();
  const { setSearchValue, searchValue } = useSearchInputValueStore();

  const updateSearchValueAddress = useCallback(
    async (latitude: number, longitude: number) => {
      const address = await getAddressByCoorinates(latitude, longitude);
      setSearchValue({ ...searchValue, address });
    },
    [getAddressByCoorinates],
  );

  useEffect(() => {
    if (location.loaded) {
      const { lat, lng } = location.coordinates!;

      setCurrentCoordinates({ latitude: lat, longitude: lng });
      changeCenter(lat, lng);
      updateSearchValueAddress(lat, lng);
    }
  }, [changeCenter, location.coordinates, location.loaded, updateSearchValueAddress]);
  return (
    <>
      <section className="absolute z-40 flex w-full flex-col items-center">
        <SearchBarFilter />
      </section>
      <ClustererProvider>
        <Markers
          mapMGCData={data ?? []}
          onMarkerClick={handleMarkerClick}
          onClustererClick={openBottomSheetAndUpdate}
        />
      </ClustererProvider>
      <Marker
        latitude={currentCoordinates.latitude}
        longitude={currentCoordinates.longitude}
        markerSrc={currentLocationMarker.src}
        markerSize={{ width: 40, height: 40 }}
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
      <ThunderModal />
    </>
  );
};

export default HomeMapContent;
