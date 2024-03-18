'use client';

import useGetJoinMGCByUserId from '@/apis/user/useGetJoinMGCByUserId';
import MGCList from '@/app/_components/MGCList/MGCList';

const JoinPage = ({ params }: { params: { userId: string } }) => {
  const { data } = useGetJoinMGCByUserId(params.userId);

  return (
    <div>
      <MGCList data={data ?? []} />
    </div>
  );
};

export default JoinPage;
