import { getMGCDetail } from '@/apis/mgc/useGetMGCDetail';
import { Metadata } from 'next';
import EditPage from './EditPage';

export async function generateMetadata({ params }: { params: { id: number } }): Promise<Metadata> {
  const id = params.id;

  const MGCDetail = await getMGCDetail(id);

  return {
    title: `(수정중) ${MGCDetail.MogakkoInfo.title}`,
    openGraph: {
      title: `(수정중) ${MGCDetail.MogakkoInfo.title}`,
    },
  };
}

const MGCEdit = ({ params }: { params: { id: number } }) => {
  return <EditPage id={params.id} />;
};

export default MGCEdit;
