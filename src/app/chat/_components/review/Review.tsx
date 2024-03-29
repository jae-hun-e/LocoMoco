import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useCreateReview from '@/apis/review/useCreateReview';
import useGetUserInfo from '@/apis/user/useGetUserInfo';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useTagMapping } from '@/hooks/useTagMapping';
import { USER_ID_KEY, getItem } from '@/utils/storage';
import Profile from './Profile';
import Rating from './Rating';
import ReviewContent from './ReviewContent';

interface ReviewProps {
  MGCId: string;
  revieweeId: number;
  onCancel: () => void;
  isEnd: boolean;
}

export interface ReviewForm {
  score: number;
  blockDesired: boolean;
  reviewContentId: number[];
  content: string;
}

const Review = ({ MGCId, revieweeId, onCancel, isEnd }: ReviewProps) => {
  const { mutate: createReview } = useCreateReview();
  const [selectedRating, setSelectedRating] = useState(0);

  const reviewerId = getItem<string>(localStorage, USER_ID_KEY);

  const { data: userInfoData } = useGetUserInfo(revieweeId);

  const userInfo = userInfoData?.userInfo;

  const tagMapping = useTagMapping();

  useEffect(() => {
    if (!isEnd) {
      toast({ description: '모각코 종료이후 다시 시도해주세요.' });
    }
  }, [isEnd]);

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
    onCancel();
  };

  const onSubmit = (data: ReviewForm) => {
    if (!reviewerId) {
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
    onCancel();
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
          userId={userInfo.userId}
          profileImg={userInfo?.profileImage?.path ?? ''}
          nickname={userInfo?.nickname ?? ''}
          job={tagMapping.get(userInfo.jobId)?.tagName ?? ''}
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
          </>
        ) : null}
        <div className="fixed bottom-0 left-0 z-50 flex w-full justify-between gap-20pxr bg-white px-20pxr py-15pxr">
          <Button
            type="button"
            onClick={handleCancelClick}
            className="grow border border-main-1 bg-layer-1 text-main-1 hover:bg-white hover:font-bold"
          >
            취소
          </Button>
          <Button
            className="grow bg-main-1 hover:bg-hover hover:font-bold"
            disabled={!isEnd}
          >
            {isEnd ? '완료' : '비활성'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Review;
