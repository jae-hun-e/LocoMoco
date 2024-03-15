'use client';

import useGetJoinMGCByUserId from '@/apis/user/useGetJoinMGCByUserId';
import MGCList from '@/app/_components/MGCList/MGCList';

const JoinPage = ({ params }: { params: { userId: string } }) => {
  const { data } = useGetJoinMGCByUserId(params.userId);

  // TODO: suspense 적용 후 더미 제거 [24.03.15]
  const dummy = [
    {
      id: 1,
      title: '모각코111',
      views: 12,
      likeCount: 1,
      maxParticipants: 3,
      curParticipants: 1,
      location: {
        address: '구로동',
        latitude: 37.456,
        longitude: 126.6768,
      },
      tags: [240],
    },
    {
      id: 2,
      title: '모각코2222',
      views: 12,
      likeCount: 1,
      maxParticipants: 3,
      curParticipants: 1,
      location: {
        address: '구로동',
        latitude: 37.456,
        longitude: 126.6768,
      },
      tags: [238, 241],
    },
  ];

  return (
    <div>
      <MGCList data={data ?? dummy} />
    </div>
  );
};

export default JoinPage;
