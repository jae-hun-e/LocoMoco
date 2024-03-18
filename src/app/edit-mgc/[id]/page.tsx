'use client';

import { useGetMGCDetail } from '@/apis/mgc/useGetMGCDetail';
import CreateMGC from '@/app/create/_components/CreateMGC';

const MGCEdit = ({ params }: { params: { id: number } }) => {
  const {
    mgcDetail: { MogakkoInfo },
  } = useGetMGCDetail(params.id);

  return (
    <div>
      <CreateMGC
        initData={MogakkoInfo}
        MGCId={params.id}
      />
    </div>
  );
};

export default MGCEdit;
