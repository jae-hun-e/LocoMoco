import { useEffect, useState } from 'react';
import Clusterer from '@/app/_components/Map/Clusterer';
import Geocoder from '@/app/_components/Map/Geocoder';
import Marker from '@/app/_components/Map/Marker';
import Markers from '@/app/_components/Map/Markers';
import useChangeMapCenter from '@/hooks/useChangeMapCenter';
import useGeolocation from '@/hooks/useGeolocation';
import { MGCSummary } from '@/types/MGCList';
import SearchBarFilter from './SearchBarFilter';

interface HomeMap {
  data: MGCSummary[] | undefined;
  handleMarkerClick: (mapData: MGCSummary[]) => void;
  openBottomSheetAndUpdate: (mapData: MGCSummary[]) => void;
}

const HomeMap = ({ data, handleMarkerClick, openBottomSheetAndUpdate }: HomeMap) => {
  const { changeCenter } = useChangeMapCenter();

  const location = useGeolocation();

  const [currentCoordinates, setCurrentCoordinates] = useState({ latitude: 0, longitude: 0 });

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
    </Geocoder>
  );
};

export default HomeMap;
