'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useCreateReview from '@/apis/review/useCreateReview';
import useGetUserInfo from '@/apis/user/useGetUserInfo';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { job } from '@/constants/userInfo';
import Profile from './Profile';
import Rating from './Rating';
import ReviewContent from './ReviewContent';

export interface ReviewForm {
  score: number;
  blockDesired: boolean;
  reviewContentId: number[];
  content: string;
}

const Review = () => {
  const { mutate: createReview } = useCreateReview();
  const [selectedRating, setSelectedRating] = useState(0);

  const reviewerId = localStorage.getItem('userId');
  // TODO: 후기 톡방으로부터 mogakkoId 받아와서 수정 [24.03.05]
  const MGCId = 54;
  // TODO: revieweeId 받아와서 수정 [24.03.05]
  const revieweeId = 77;

  const { data: userInfo } = useGetUserInfo(revieweeId);

  const {
    formState: { errors },
    register,
    handleSubmit,
    getValues,
    setValue,
    trigger,
    reset,
  } = useForm<ReviewForm>({
    defaultValues: {
      blockDesired: false,
    },
  });

  register('reviewContentId', { required: '하나 이상 선택해주세요.' });

  const handleCancelClick = () => {
    reset();
    // TODO: 모달에 뿌려줄 컴포넌트가 list인지 판별하는 state변경을 해야함 [24.02.20]
  };

  const onSubmit = (data: ReviewForm) => {
    if (reviewerId === null) {
      toast({
        description: '오류가 발생했습니다. 재로그인후 다시 시도해주세요.',
      });
      return;
    }

    const reviewData = {
      MGCId: MGCId,
      reviewerId: reviewerId,
      data: {
        ...data,
        revieweeId,
      },
    };

    createReview(reviewData);
    // TODO: 모달에 뿌려줄 컴포넌트가 list인지 판별하는 state변경을 해야함 [24.02.20]
  };

  const handleRatingChange = (rating: number) => {
    if (rating === selectedRating) return;

    setSelectedRating(rating);
    setValue('score', rating);
  };

  const handleMultiDeselect = (deselected: number) => {
    const selectedList = getValues('reviewContentId');

    if (!selectedList) return;

    const updatedList = selectedList.filter((item) => item !== deselected);
    setValue('reviewContentId', updatedList);
    trigger('reviewContentId');
  };

  const handleMultiSelect = (selected: number) => {
    const selectedList = getValues('reviewContentId');

    setValue(
      'reviewContentId',
      selectedList
        ? selectedList.includes(selected)
          ? selectedList
          : [...selectedList, selected]
        : [selected],
    );

    trigger('reviewContentId');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative flex h-full flex-col gap-30pxr pb-50pxr">
        <Profile
          profileImg={userInfo?.profileImage ?? ''}
          nickname={userInfo?.nickname ?? ''}
          job={userInfo?.job ? job[userInfo?.job] : ''}
        />

        <Rating
          trigger={trigger}
          setValue={setValue}
          selectedRating={selectedRating}
          onClick={handleRatingChange}
          nickname={userInfo?.nickname ?? ''}
        />
        {selectedRating > 0 ? (
          <>
            <ReviewContent
              selectedRating={selectedRating}
              errors={errors}
              onSelected={handleMultiSelect}
              onDeselected={handleMultiDeselect}
              register={register}
            />
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
          </>
        ) : null}
      </div>
    </form>
  );
};

export default Review;
