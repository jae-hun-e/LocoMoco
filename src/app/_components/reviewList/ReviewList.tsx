import ReviewItem from './ReviewItem';

export interface ReviewData {
  reviewId: number;
  reviewContentId: number[];
  content: string;
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

interface ReviewListProps {
  title: string;
  Reviews: ReviewData[];
}

const ReviewList = ({ title, Reviews }: ReviewListProps) => {
  return (
    <div>
      <p className="mb-5pxr font-bold">
        {title} {Reviews.length}개
      </p>
      {Reviews.map((review) => (
        <ReviewItem
          key={review.reviewId}
          data={review}
        />
      ))}
    </div>
  );
};

export default ReviewList;
