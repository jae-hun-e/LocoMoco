'use client';

import React from 'react';
import { Separator } from '@/components/ui/separator';
import UserInfo from './UserInfo';

export interface UserInfoData {
  userId: number;
  nickname: string;
  job: string;
  profileImage: {
    imageId: number;
    path: string;
  };
  score: number;
  createdAt: string;
}

interface ReviewData extends UserInfoData {
  reviewId: number;
  reviewContentId: number[];
  content: string;
}

const ReviewItem = ({ data }: { data: ReviewData }) => {
  const { content, reviewContentId, reviewId, ...userInfo } = data;

  const handleRevieItemClick = () => {
    console.log(reviewId);
    // reviewContentId 링크 이동 시 넘겨주기 or reviewId로만 조회되는 api 요청하기
    console.log(reviewContentId);
  };

  return (
    <div onClick={handleRevieItemClick}>
      <div className="py-10pxr">
        <UserInfo userInfo={userInfo} />
        <p className="mt-20pxr text-sm">
          {content === '' ? '작성한 상세 리뷰가 없습니다.' : content}
        </p>
      </div>
      <Separator></Separator>
    </div>
  );
};

export default ReviewItem;
