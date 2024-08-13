import { useDeleteInquiry } from '@/app/mgc/[id]/_hooks/useDeleteInquiry';
import { Button } from '@/components/ui/button';

interface InquiryTooltipProps {
  inquiryAuthorId: number;
  authorId: number;
  userId: number;
  MGCId: number;
  inquiryId: number;
  onModifyInquiryId: () => void;
}
const InquiryTooltip = ({
  inquiryAuthorId,
  inquiryId,
  userId,
  authorId,
  onModifyInquiryId,
  MGCId,
}: InquiryTooltipProps) => {
  const { deleteInquiry } = useDeleteInquiry();
  // TODO: 문의 신고는 어떻게 처리되는가? [24/04/06]
  const handleReport = () => {
    console.log(userId);
  };

  const handleModify = () => {
    onModifyInquiryId();
  };

  // TODO: 삭제 API 500에러뜸 [24/04/06]
  const handleDelete = () => {
    deleteInquiry({ inquiryId, userId, mogakkoId: MGCId });
  };

  return (
    <div className="absolute right-0  hidden cursor-pointer gap-1 group-hover:flex">
      {inquiryAuthorId === userId ? (
        <>
          <TooltipButton
            onClick={handleModify}
            content="수정"
          />
          <TooltipButton
            onClick={handleDelete}
            content="삭제"
          />
        </>
      ) : userId === authorId ? (
        <>
          <TooltipButton
            onClick={handleReport}
            content="신고"
          />
          <TooltipButton
            onClick={handleDelete}
            content="삭제"
          />
        </>
      ) : (
        <TooltipButton
          onClick={handleReport}
          content="신고"
        />
      )}
    </div>
  );
};

export default InquiryTooltip;

interface TooltipButtonProps {
  onClick: () => void;
  content: string;
}
const TooltipButton = ({ onClick, content }: TooltipButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
    >
      {content}
    </Button>
  );
};
