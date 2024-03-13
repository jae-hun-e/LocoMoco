import { Button } from '@/components/ui/button';
import { Report } from '@/types/report';

interface ReportListItemProps {
  data: Report;
  onModifyBtnClick: (id: number, content: string) => void;
  onDeleteBtnClick: (id: number) => void;
}

const ReportListItem = ({ data, onModifyBtnClick, onDeleteBtnClick }: ReportListItemProps) => {
  return (
    <li className="w-full flex-col border-b border-solid py-14pxr">
      <div className="mb-10pxr flex items-center justify-between">
        신고 대상: {data.reportedNickname}
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            className="border-1pxr h-30pxr w-50pxr border-solid border-main-1 text-xs text-main-1 hover:border-hover hover:bg-white hover:text-hover"
            onClick={() => {
              onModifyBtnClick(data.reportId, data.content);
            }}
          >
            수정
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border-1pxr h-30pxr w-50pxr border-solid border-main-1 text-xs text-main-1 hover:border-hover hover:bg-white hover:text-hover"
            onClick={() => {
              onDeleteBtnClick(data.reportId);
            }}
          >
            삭제
          </Button>
        </div>
      </div>
      <p>{data.content}</p>
    </li>
  );
};

export default ReportListItem;
