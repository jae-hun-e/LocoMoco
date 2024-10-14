import { useContext, useEffect } from 'react';
import { MapContext } from '@/app/_components/Map/MapProvider';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import useChangeMapCenter from '@/hooks/useChangeMapCenter';
import useKakaoMapService from '@/libs/kakaoMapWrapper';
import useCreatedPositionInfo from '@/store/useCreatedPositionInfo';
import MGCCreateSheetContent from './MGCCreateSheetContent';

export interface MGCCreateBottomSheetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const MGCCreateBottomSheet = ({ open, setOpen }: MGCCreateBottomSheetProps) => {
  const { changeCenter } = useChangeMapCenter();
  const map = useContext(MapContext);
  const mapService = useKakaoMapService();
  const { createdPositionInfo } = useCreatedPositionInfo();

  useEffect(() => {
    if (open && map) {
      const { latitude, longitude } = createdPositionInfo;
      const mapProjection = map.getProjection();
      const SEARCH_BAR_FILTER_HIGHT = 113;

      const createMarkerLatlng = mapService.createLatLng(latitude, longitude);
      const coordinateToPoint = mapProjection.containerPointFromCoords(createMarkerLatlng);
      const centerPoint = mapService.createPoint(
        coordinateToPoint.x,
        coordinateToPoint.y + SEARCH_BAR_FILTER_HIGHT,
      );
      const centerCoordinates = mapProjection.coordsFromContainerPoint(centerPoint);

      changeCenter(centerCoordinates.getLat(), centerCoordinates.getLng(), 'smooth');
    }
  }, [changeCenter, createdPositionInfo, map, mapService, open]);
  return (
    <Drawer
      open={open}
      onOpenChange={(open) => setOpen(open)}
    >
      <DrawerContent className="z-40 flex h-[50svh] flex-col gap-0 overflow-y-auto rounded-t-xl p-0 outline-none">
        <MGCCreateSheetContent setOpen={setOpen} />
      </DrawerContent>
    </Drawer>
  );
};

export default MGCCreateBottomSheet;
