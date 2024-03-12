import { ReactNode } from 'react';
import MGCListItem from '@/app/_components/MGCList/MGCListItem';
import ChattingButton from '@/app/mypage/(sub-page)/_components/button/ChattingButton';
import LikeMGCAreaButtons from '@/app/mypage/(sub-page)/_components/button/LikeMGCAreaButtons';
import ReviewButtons from '@/app/mypage/(sub-page)/_components/button/ReviewButtons';
import { Separator } from '@/components/ui/separator';
import { MGCSummary } from '@/types/MGCList';

interface Props {
  MGCInfo: MGCSummary;
  readonly children?: ReactNode;
}

const MGCSummaryInfoContainer = ({ MGCInfo, children }: Props) => {
  return (
    <>
      <MGCListItem
        data={MGCInfo}
        key={MGCInfo.id}
      />
      {children}
      <Separator />
    </>
  );
};

interface ButtonProps {
  MGCId: number;
}
const LikeMGCArea = (props: ButtonProps) => <LikeMGCAreaButtons {...props} />;
const Chatting = (props: ButtonProps) => <ChattingButton {...props} />;
const Reviews = (props: ButtonProps) => <ReviewButtons {...props} />;

const MGCSummaryInfo = Object.assign(MGCSummaryInfoContainer, {
  LikeMGCArea,
  Chatting,
  Reviews,
});
export default MGCSummaryInfo;
