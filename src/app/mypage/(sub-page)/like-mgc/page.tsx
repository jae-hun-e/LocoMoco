'use client';

import MGCSummaryInfo from '@/app/mypage/(sub-page)/_components/MGCSummaryInfo';
import { useGetLikeMGC } from '@/app/mypage/(sub-page)/like-mgc/_hooks/useGetLikeMGC';
import { getItem } from '@/utils/storage';

const LikeMGC = () => {
  let userId;
  if (typeof window !== 'undefined') {
    userId = getItem<string | undefined>(localStorage, 'userId');
  }

  const { likeMGCs } = useGetLikeMGC({ userId: Number(userId) });

  return (
    <>
      {likeMGCs &&
        likeMGCs.map((mgc) => (
          <MGCSummaryInfo
            MGCInfo={mgc}
            key={mgc.id}
          >
            <MGCSummaryInfo.LikeMGCArea MGCId={mgc.id} />
          </MGCSummaryInfo>
        ))}
    </>
  );
};

export default LikeMGC;
