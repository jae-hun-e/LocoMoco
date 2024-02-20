'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import Profile from './Profile';
import Rating from './Rating';
import ReviewContent from './ReviewContent';

export interface ReviewForm {
  rating: number;
  isPositive?: boolean;
  blockDesired?: boolean;
  reviewOptions?: number[];
  reviewContent?: string;
}

const Review = () => {
  const [selectedRating, setSelectedRating] = useState(0);

  const {
    formState: { errors },
    register,
    handleSubmit,
    getValues,
    setValue,
    trigger,
  } = useForm<ReviewForm>();

  register('reviewOptions', { required: '하나 이상 선택해주세요.' });

  const isGood = (rating: number) => {
    return rating < 3 ? 'bad' : 'good';
  };

  const handleCancelClick = () => {
    // TODO: 모달에 뿌려줄 컴포넌트가 list인지 판별하는 state변경을 해야함 [24.02.20]
  };

  const onSubmit = (data: ReviewForm) => {
    console.log(data);
    // TODO: 모달에 뿌려줄 컴포넌트가 list인지 판별하는 state변경을 해야함 [24.02.20]
  };

  // TODO: 후기 보내기 버튼 클릭시 props받아오는 것으로 변경 [24.02.20]
  const userInfo = {
    nickname: '닉네임',
    birth: '2024-02-19',
    gender: '여자',
    job: '현직자',
    profileImg: 'https://cdn.pixabay.com/photo/2023/09/29/20/28/motocross-8284539_1280.jpg',
  };

  const goodCheckList = [
    { id: 1, content: '예시1' },
    { id: 2, content: '예시2' },
    { id: 3, content: '예시3' },
    { id: 4, content: '예시4' },
    { id: 5, content: '예시5' },
  ];

  const badCheckList = [
    { id: 1, content: '별로 예시1' },
    { id: 2, content: '별로 예시2' },
    { id: 3, content: '별로 예시3' },
    { id: 4, content: '별로 예시4' },
    { id: 5, content: '별로 예시5' },
  ];

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
    setValue('rating', rating);
    setValue('isPositive', rating > 2);
  };

  const handleMultiDeselect = (deselected: number) => {
    const selectedList = getValues('reviewOptions');

    if (!selectedList) return;

    const updatedList = selectedList.filter((item) => item !== deselected);
    setValue('reviewOptions', updatedList);
    trigger('reviewOptions');
  };

  const handleMultiSelect = (selected: number) => {
    const selectedList = getValues('reviewOptions');

    setValue(
      'reviewOptions',
      selectedList
        ? selectedList.includes(selected)
          ? selectedList
          : [...selectedList, selected]
        : [selected],
    );

    trigger('reviewOptions');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative flex h-full flex-col gap-30pxr pb-50pxr">
        <Profile
          profileImg={userInfo.profileImg}
          nickname={userInfo.nickname}
          job={userInfo.job}
        />

        <Rating
          trigger={trigger}
          setValue={setValue}
          selectedRating={selectedRating}
          onClick={handleRatingChange}
          nickname={userInfo.nickname}
        />
        {selectedRating > 0 ? (
          <ReviewContent
            errors={errors}
            onSelected={handleMultiSelect}
            onDeselected={handleMultiDeselect}
            register={register}
            checkListTitle={checkListTitle[isGood(selectedRating)]}
            addTextTitle={addTextTitle[isGood(selectedRating)]}
            checkList={checkList[isGood(selectedRating)]}
            guideText={guideText[isGood(selectedRating)]}
          />
        ) : null}
      </div>
      {selectedRating > 0 ? (
        <div className="fixed bottom-0 z-50 flex w-[calc(100vw-2.5rem)] justify-between gap-20pxr bg-white py-15pxr">
          <Button
            type="button"
            onClick={handleCancelClick}
            className="grow border border-main-1 bg-layer-1 text-main-1 hover:bg-white hover:font-bold"
          >
            취소
          </Button>
          <Button className="grow bg-main-1 hover:bg-hover hover:font-bold">생성</Button>
        </div>
      ) : null}
    </form>
  );
};

export default Review;
