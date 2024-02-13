'use client';

import useMGCDetail from '@/apis/mgc/useMGCDetail';

const MGCDetail = ({ id }: { id: string }) => {
  const { MGCDetail } = useMGCDetail(Number(id));

  return <div>{MGCDetail.title}</div>;
};

export default MGCDetail;
