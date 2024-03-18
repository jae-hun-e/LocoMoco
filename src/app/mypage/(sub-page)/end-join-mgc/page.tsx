'use client';

import MGCSummaryInfo from '@/app/mypage/(sub-page)/_components/MGCSummaryInfo';
import { useGetEndMGC } from '@/app/mypage/(sub-page)/end-join-mgc/_hooks/useGetEndMGC';
import { getItem } from '@/utils/storage';

const EndMGC = () => {
  let userId;
  if (typeof window !== 'undefined') {
    userId = getItem<string | undefined>(localStorage, 'userId');
  }

  const { endMGCs } = useGetEndMGC({ userId: Number(userId) });

  return (
    <>
      {endMGCs && endMGCs.length ? (
        endMGCs.map((mgc) => (
          <MGCSummaryInfo
            MGCInfo={mgc}
            key={mgc.id}
          >
            <MGCSummaryInfo.Reviews MGCId={mgc.id} />
          </MGCSummaryInfo>
        ))
      ) : (
        <div> 종료된 모각코가 없습니다. </div>
      )}
    </>
  );
};

export default EndMGC;
