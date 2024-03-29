'use client';

import { useState } from 'react';
import { useThunderModalStore } from '@/store/thunderModalStore';
import { ReviewDetailType } from '@/types/review';
import { ReviewSummary } from '@/types/review';
import Modal from '../Modal';
import ReviewDetail from './ReviewDetail';
import ReviewItem from './ReviewItem';

interface ReviewListProps {
  title: string;
  reviews: ReviewSummary[];
}

const ReviewList = ({ title, reviews }: ReviewListProps) => {
  const { isOpen, toggleModal } = useThunderModalStore();
  const [reviewDetailData, setReviewDetailData] = useState<ReviewDetailType>();

  const handleReviewClick = (detailData: ReviewDetailType) => {
    setReviewDetailData(detailData);
    toggleModal();
  };

  const handleCloseModal = () => {
    toggleModal();
  };

  return (
    <>
      <div>
        <p className="mb-5pxr font-bold">
          {title} 후기 {reviews.length}개
        </p>
        {reviews.map((review) => (
          <ReviewItem
            onClick={handleReviewClick}
            key={review.reviewId}
            data={review}
          />
        ))}
      </div>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
      >
        <ReviewDetail
          onClose={handleCloseModal}
          title={title}
          reviewDetailData={reviewDetailData}
        />
      </Modal>
    </>
  );
};

export default ReviewList;
