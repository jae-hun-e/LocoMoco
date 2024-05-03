import React from 'react';
import { Separator } from '@/components/ui/separator';
import { ReviewDetailType } from '@/types/review';
import UserInfo from './UserInfo';

interface ReviewItemProps {
  data: ReviewData;
  onClick: (detailData: ReviewDetailType) => void;
}

export interface UserInfoData {
  userId: number;
  nickname: string;
  jobId: number;
  profileImage: {
    imageId: number;
    path: string;
  } | null;
  score: number;
  createdAt: string;
}

interface ReviewData extends UserInfoData {
  reviewId: number;
  reviewContentId: number[];
  content: string;
}

const ReviewItem = ({ data, onClick }: ReviewItemProps) => {
  const { content, reviewContentId, ...userInfo } = data;

  const handleRevieItemClick = () => {
    onClick({
      reviewContentId,
      content: content,
      nickname: userInfo.nickname,
    });
  };

  return (
    <div onClick={handleRevieItemClick}>
      <div className="py-10pxr">
        <UserInfo userInfo={userInfo} />
        <p className="mt-20pxr text-sm max-two-lines">
          {content === '' ? '작성한 상세 리뷰가 없습니다.' : content}
        </p>
      </div>
      <Separator></Separator>
    </div>
  );
};

export default ReviewItem;
