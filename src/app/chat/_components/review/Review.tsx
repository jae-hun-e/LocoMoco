'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Profile from './Profile';
import Rating from './Rating';
import ReviewContent from './ReviewContent';

const Review = () => {
  // TODO: 후기 보내기 버튼 클릭시 props받아오는 것으로 변경 [24.02.19]
  const userInfo = {
    nickname: '닉네임',
    birth: '2024-02-19',
    gender: '여자',
    job: '현직자',
    profileImg: 'https://cdn.pixabay.com/photo/2023/09/29/20/28/motocross-8284539_1280.jpg',
  };

  const [selectedRating, setSelectedRating] = useState(0);

  const goodCheckList = ['예시1', '예시2', '예시3', '예시4', '예시5', '예시6'];
  const badCheckList = [
    '별로 예시1',
    '별로 예시2',
    '별로 예시3',
    '별로 예시4',
    '별로 예시5',
    '별로 예시6',
  ];

  const isGood = (rating: number) => {
    return rating < 3 ? 'bad' : 'good';
  };

  const checkListTitle = {
    good: '좋았나요',
    bad: '별로였나요',
  };

  const checkList = {
    good: goodCheckList,
    bad: badCheckList,
  };

  const addTextTitle = {
    good: '좋았던 후기를 상대방에게 알려주세요!',
    bad: '아쉬웠던 점을 작성해주세요.',
  };

  const guideText = {
    good: '남겨주신 후기는 상대방에게 전달돼요.',
    bad: '비속어와 비방하는 문구는 신고대상이됩니다.',
  };

  const handleRatingChange = (rating: number) => {
    if (rating === selectedRating) return;
    setSelectedRating(rating);
  };

  return (
    <>
      <div className="relative flex h-full flex-col gap-30pxr pb-30pxr">
        <Profile
          profileImg={userInfo.profileImg}
          nickname={userInfo.nickname}
          job={userInfo.job}
        />

        <Rating
          selectedRating={selectedRating}
          onClick={handleRatingChange}
          nickname={userInfo.nickname}
        />
        {selectedRating > 0 ? (
          <ReviewContent
            checkListTitle={checkListTitle[isGood(selectedRating)]}
            addTextTitle={addTextTitle[isGood(selectedRating)]}
            checkList={checkList[isGood(selectedRating)]}
            guideText={guideText[isGood(selectedRating)]}
          />
        ) : null}
      </div>
      {selectedRating > 0 ? (
        <div className="fixed bottom-0 z-50 flex w-[calc(100vw-2.5rem)] justify-between gap-20pxr bg-white py-15pxr">
          <Button className="grow border border-main-1 bg-layer-1 text-main-1">취소</Button>
          <Button className="grow bg-main-1">생성</Button>
        </div>
      ) : null}
    </>
  );
};

export default Review;
