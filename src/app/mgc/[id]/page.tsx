// import MGCDetailPage from '@/app/mgc/[id]/MGCPage';
import { getMGCDetail } from '@/apis/mgc/useGetMGCDetail';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

export async function generateMetadata({ params }: { params: { id: number } }): Promise<Metadata> {
  const id = params.id;

  const MGCDetail = await getMGCDetail(id);

  return {
    title: MGCDetail.MogakkoInfo.title,
    description: MGCDetail.MogakkoInfo.content,
    openGraph: {
      title: MGCDetail.MogakkoInfo.title,
      description: MGCDetail.MogakkoInfo.content,
    },
  };
}

const MGCDetailPage = dynamic(() => import('@/app/mgc/[id]/MGCPage'), { ssr: false });
const MGCDetail = ({ params }: { params: { id: number } }) => {
  return <MGCDetailPage MGCId={params.id} />;
};

export default MGCDetail;
