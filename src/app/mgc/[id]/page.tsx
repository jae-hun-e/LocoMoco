// import MGCDetailPage from '@/app/mgc/[id]/MGCPage';
import dynamic from 'next/dynamic';

const MGCDetailPage = dynamic(() => import('@/app/mgc/[id]/MGCPage'), { ssr: false });
const MGCDetail = ({ params }: { params: { id: number } }) => {
  return <MGCDetailPage MGCId={params.id} />;
};

export default MGCDetail;
