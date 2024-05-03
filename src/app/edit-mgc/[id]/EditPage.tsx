'use client';

import { useGetMGCDetail } from '@/apis/mgc/useGetMGCDetail';
import CreateMGC from '@/app/create/_components/CreateMGC';

const EditPage = ({ id }: { id: number }) => {
  const {
    mgcDetail: { MogakkoInfo },
  } = useGetMGCDetail(id);

  return (
    <div>
      <CreateMGC
        initData={MogakkoInfo}
        MGCId={id}
      />
    </div>
  );
};

export default EditPage;
