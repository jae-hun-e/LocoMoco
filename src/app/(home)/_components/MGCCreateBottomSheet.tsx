import { Drawer, DrawerContent } from '@/components/ui/drawer';
import MGCCreateSheetContent from './MGCCreateSheetContent';

export interface MGCCreateBottomSheetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const MGCCreateBottomSheet = ({ open, setOpen }: MGCCreateBottomSheetProps) => {
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
