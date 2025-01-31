import { useCallback, useEffect, useState } from 'react';
import ClustererProvider from '@/app/_components/Map/ClustererProvider';
import Marker from '@/app/_components/Map/Marker';
import Markers from '@/app/_components/Map/Markers';
import useChangeMapCenter from '@/hooks/useChangeMapCenter';
import useGeolocation from '@/hooks/useGeolocation';
import useGetAddressByCoordinates from '@/hooks/useGetAddressByCoordinates';
import useCreatedPositionInfo from '@/store/useCreatedPositionInfo';
import useSearchInputValueStore from '@/store/useSearchValueStore';
import { MGCSummary } from '@/types/MGCList';
import createPositionMarker from '../../../../public/create-position-marker.png';
import currentLocationMarker from '../../../../public/current-location-marker.png';
import HomeSearchBarFilter from './HomeSearchBarFilter';
import MGCCreateBottomSheet from './MGCCreateBottomSheet';
import ThunderModal from './ThunderModal/ThunderModal';

interface HomeMap {
  data: MGCSummary[] | undefined;
  handleMarkerClick: (mapData: MGCSummary[]) => void;
  openBottomSheetAndUpdate: (mapData: MGCSummary[]) => void;
}

const HomeMapContent = ({ data, handleMarkerClick, openBottomSheetAndUpdate }: HomeMap) => {
  const [currentCoordinates, setCurrentCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [open, setOpen] = useState(false);

  const { getAddressByCoorinates } = useGetAddressByCoordinates();

  const location = useGeolocation();
  const { changeCenter } = useChangeMapCenter();

  const { setSearchValue, searchValue } = useSearchInputValueStore();

  const updateSearchValueAddress = useCallback(
    async (latitude: number, longitude: number) => {
      const address = await getAddressByCoorinates(latitude, longitude);
      setSearchValue({ ...searchValue, search: address });
    },
    [getAddressByCoorinates],
  );

  const { createdPositionInfo, setCreatedPositionInfo } = useCreatedPositionInfo();

  useEffect(() => {
    if (createdPositionInfo.address) {
      setOpen(true);
    }
  }, [createdPositionInfo]);

  useEffect(() => {
    setCreatedPositionInfo({
      address: '',
      latitude: 0,
      longitude: 0,
      city: '',
      hCity: '',
    });

    setOpen(false);
  }, [setCreatedPositionInfo]);

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
        <HomeSearchBarFilter />
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
      <Marker
        latitude={createdPositionInfo.latitude}
        longitude={createdPositionInfo.longitude}
        markerSrc={createPositionMarker.src}
        markerSize={{ width: 65, height: 72 }}
        show={open}
      />
      <MGCCreateBottomSheet
        open={open}
        setOpen={setOpen}
      />
      <ThunderModal />
    </>
  );
};

export default HomeMapContent;
