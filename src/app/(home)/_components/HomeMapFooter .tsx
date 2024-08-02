import CreateBtn from '@/app/_components/CreateBtn';
import MGCList from '@/app/_components/MGCList/MGCList';
import { MGCSummary } from '@/types/MGCList';
import BottomSheet from './BottomSheet';

interface HomeMapFooterProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  MGCDataList: MGCSummary[];
}

const HomeMapFooter = ({ open, setOpen, MGCDataList }: HomeMapFooterProps) => {
  return (
    <>
      <div
        id="mgc-create-btn"
        className="absolute bottom-0 right-24pxr z-30"
      >
        <CreateBtn />
      </div>
      <div className="absolute bottom-15pxr z-10 flex w-full justify-center">
        <BottomSheet
          open={open}
          setOpen={setOpen}
        >
          <MGCList data={MGCDataList} />
        </BottomSheet>
      </div>
    </>
  );
};

export default HomeMapFooter;
