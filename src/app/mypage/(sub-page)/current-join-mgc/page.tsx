'use client';

import MGCSummaryInfo from '@/app/mypage/(sub-page)/_components/MGCSummaryInfo';
import { useGetCurrentJoinMGC } from '@/app/mypage/(sub-page)/current-join-mgc/_hooks/useGetCurrentJoinMGC';
import { getItem } from '@/utils/storage';

const CurrentMGC = () => {
  let userId;
  if (typeof window !== 'undefined') {
    userId = getItem<string | undefined>(localStorage, 'userId');
  }

  const { currentMGCs } = useGetCurrentJoinMGC({ userId: Number(userId) });

  return (
    <>
      {currentMGCs && currentMGCs.length ? (
        currentMGCs.map((mgc) => (
          <MGCSummaryInfo
            MGCInfo={mgc}
            key={mgc.id}
          >
            <MGCSummaryInfo.Chatting MGCId={mgc.id} />
          </MGCSummaryInfo>
        ))
      ) : (
        <div> 참여중인 모각코가 없습니다. </div>
      )}
    </>
  );
};

export default CurrentMGC;
