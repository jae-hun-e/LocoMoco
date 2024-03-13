'use client';

import MGCSummaryInfo from '@/app/mypage/(sub-page)/_components/MGCSummaryInfo';
import { useGetCurrentJoinMGC } from '@/app/mypage/(sub-page)/current-join-mgc/_hooks/useGetCurrentJoinMGC';
// TODO: API 연동 후 실데이터로 변경 [24/03/14]
import { dummyData } from '@/constants/mgcListDummy';
import { getItem } from '@/utils/storage';

const CurrentMGC = () => {
  let userId;
  if (typeof window !== 'undefined') {
    userId = getItem<string | undefined>(localStorage, 'userId');
  }

  const { currentMGCs } = useGetCurrentJoinMGC({ userId: Number(userId) });

  console.log('currentMGCs', currentMGCs);
  return (
    <>
      {dummyData.map((mgc) => (
        <MGCSummaryInfo
          MGCInfo={mgc}
          key={mgc.id}
        >
          <MGCSummaryInfo.Chatting MGCId={mgc.id} />
        </MGCSummaryInfo>
      ))}
    </>
  );
};

export default CurrentMGC;
