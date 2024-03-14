'use client';

import MGCSummaryInfo from '@/app/mypage/(sub-page)/_components/MGCSummaryInfo';
import { useGetEndMGC } from '@/app/mypage/(sub-page)/end-join-mgc/_hooks/useGetEndMGC';
// TODO: API 연동 후 실데이터로 변경 [24/03/14]
import { dummyData } from '@/constants/mgcListDummy';
import { getItem } from '@/utils/storage';

const EndMGC = () => {
  let userId;
  if (typeof window !== 'undefined') {
    userId = getItem<string | undefined>(localStorage, 'userId');
  }

  const { endMGCs } = useGetEndMGC({ userId: Number(userId) });

  console.log('endMGCs', endMGCs);

  return (
    <>
      {dummyData.map((mgc) => (
        <MGCSummaryInfo
          MGCInfo={mgc}
          key={mgc.id}
        >
          <MGCSummaryInfo.Reviews MGCId={mgc.id} />
        </MGCSummaryInfo>
      ))}
    </>
  );
};

export default EndMGC;
