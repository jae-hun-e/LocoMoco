import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

// TODO: 시간 남으면 직접 구현 [24/02/12]
// TODO: 회의 후에 네브와 바텀시트를 함께 보일지 수정 [24/02/12]
const BottomSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="w-[100px] w-full rounded-t-xl rounded-t-xl bg-layer-1 py-3">
          <div className="mx-auto h-1 w-40pxr rounded-full rounded-t-xl bg-layer-4" />
        </div>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="main-bottom-sheet z-10 flex h-[70svh] flex-col gap-0 overflow-y-auto rounded-t-xl p-0 outline-none"
      >
        <div className="z-[100px] w-[100px] w-full py-3">
          <div className="mx-auto h-1 w-40pxr rounded-full bg-layer-4" />
        </div>
        <div className="overflow-y-auto">
          <li>테스트</li>
          <li>테스트</li>
          <li>테스트</li>
          <li>테스트</li>
          <li>테스트</li>
          <li>테스트</li>
          <li>테스트</li>
          <li>테스트</li>
          <li>테스트</li>
          <li>테스트</li>
          <li>테스트</li>
          <li>테스트</li>
          <li>테스트</li>
          <li>테스트</li>
          <li>테스트</li>
          <li>테스트</li>
          <li>테스트</li>
          <li>테스트</li>
          <li>테스트</li>
          <li>테스트</li>
          <li>테스트</li>
          <li>테스트</li>
          <li>테스트</li>
          <li>테스트</li>
          <li>테스트</li>
          <li>테스트</li>
          <div className="h-50pxr" />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BottomSheet;
