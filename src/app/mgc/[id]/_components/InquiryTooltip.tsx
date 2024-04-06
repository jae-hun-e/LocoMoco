import { Button } from '@/components/ui/button';

interface InquiryTooltipProps {
  inquiryId: number;
  authorId: number;
  userId: number;
}
const InquiryTooltip = ({ inquiryId, userId, authorId }: InquiryTooltipProps) => {
  const handleReport = () => {
    console.log('신고');
  };

  const handleModify = () => {
    console.log('수정');
  };

  const handleDelete = () => {
    console.log('삭제');
  };

  return (
    <div className="absolute right-0  hidden cursor-pointer gap-1 group-hover:flex">
      {inquiryId === userId ? (
        <>
          <TooltipButton
            onClick={handleReport}
            content="신고"
          />
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
