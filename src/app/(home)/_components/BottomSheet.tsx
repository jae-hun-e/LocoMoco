import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Menu } from 'lucide-react';

interface BottomSheetProps {
  children: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}

// TODO: 시간 남으면 직접 구현 [24/02/12]
// TODO: 회의 후에 네브와 바텀시트를 함께 보일지 수정 [24/02/12]
const BottomSheet = ({ children, open, setOpen }: BottomSheetProps) => {
  const handleBtnClick = (open: boolean) => {
    setOpen(open);
    document.querySelector('#navbar')?.classList.add('pointer-auto');
    document.querySelector('#mgc-create-btn')?.classList.add('pointer-auto');
  };

  return (
    <Drawer
      open={open}
      onOpenChange={(open) => handleBtnClick(open)}
    >
      <DrawerTrigger
        asChild
        className="flex justify-center"
      >
        <Button className="gap-3pxr rounded-full border border-solid border-layer-4 bg-white text-layer-7 hover:bg-white">
          <Menu
            width={16}
            height={16}
            stroke="#58C694"
          />
          목록보기
        </Button>
      </DrawerTrigger>
      <DrawerContent className="none-overlay z-30 flex h-[70svh] flex-col gap-0 overflow-y-auto rounded-t-xl p-0 outline-none">
        <div className="overflow-y-auto px-20pxr pb-50pxr scrollbar-hide">{children}</div>
      </DrawerContent>
    </Drawer>
  );
};

export default BottomSheet;
