'use client';

import { useState } from 'react';
import useDeleteReportlist from '@/apis/report/useDeleteReportList';
import useGetReportList from '@/apis/report/useGetReportList';
import useModifyReportlist from '@/apis/report/useModifyReportList';
import { useThunderModalStore } from '@/store/thunderModalStore';
import ReportList from './_components/ReportList';
import ReportModifyModal from './_components/ReportModifyModal';

const ReportPage = () => {
  const [targetId, setTargetId] = useState<number | undefined>(undefined);
  const [content, setContent] = useState<string>('');

  const { toggleModal } = useThunderModalStore();

  const { data } = useGetReportList();
  const { deleteReportList } = useDeleteReportlist(targetId);
  const { modifyReportList } = useModifyReportlist(targetId, content);

  const handleModifyButtonClick = (targetId: number, defaultContent: string) => {
    setTargetId(targetId);
    setContent(defaultContent);
    toggleModal();
  };

  const handleDeleteButtonClick = (targetId: number) => {
    setTargetId(targetId);
    deleteReportList();
  };

  const completeModify = () => {
    modifyReportList();
  };

  return (
    <>
      <ReportList
        data={data ?? []}
        onModifyBtnClick={handleModifyButtonClick}
        onDeleteBtnClick={handleDeleteButtonClick}
      />
      <ReportModifyModal
        defaultContent={content}
        setContent={setContent}
        completeModify={completeModify}
      />
    </>
  );
};

export default ReportPage;
