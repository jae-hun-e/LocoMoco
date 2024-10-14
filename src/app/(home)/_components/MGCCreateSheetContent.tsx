import { useThunderModalStore } from '@/store/thunderModalStore';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import LocationPin from '../../../../public/location-pin.svg';

const MGCCreateSheetContent = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const router = useRouter();
  const { toggleModal } = useThunderModalStore();

  return (
    <div className="flex h-full flex-col px-20pxr pb-35pxr pt-30pxr">
      <div className="mb-13pxr flex justify-between">
        <p className=" text-xl	font-bold">모각코를 생성해요</p>
        <button onClick={() => setOpen(false)}>
          <X
            width={24}
            height={24}
          />
        </button>
      </div>
      <span className="text-sm text-black-4">내가 원하는 모각코를 직접 설정해요</span>
      <div className="grid grow content-end justify-center ">
        <LocationPin />
      </div>
      <div className="mt-40pxr grid w-full grow grid-cols-2 content-end gap-2">
        <button
          className="h-55pxr rounded-xl bg-main-6 py-10pxr text-main-1"
          onClick={() => {
            setOpen(false);
            router.push('/create');
          }}
        >
          모각코
        </button>
        <button
          className="h-55pxr rounded-xl bg-main-1 py-10pxr text-white"
          onClick={() => {
            setOpen(false);
            toggleModal();
          }}
        >
          번개 모각코
        </button>
      </div>
    </div>
  );
};

export default MGCCreateSheetContent;
