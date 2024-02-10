import React from 'react';
import MGCDetail from '@/app/mgc/[id]/_components/MGCDetail';
import { ChevronLeftIcon } from 'lucide-react';

const MGCDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <ChevronLeftIcon />
      <MGCDetail id={params.id} />
    </div>
  );
};

export default MGCDetailPage;
