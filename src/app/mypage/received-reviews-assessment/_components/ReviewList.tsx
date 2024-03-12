import { ReviewContent } from '@/apis/review/useGetReviewContents';
import { Users } from 'lucide-react';

interface ReviewListProps {
  list: ReviewContent[];
  reviews: {
    reviewId: number;
    reviewerId: number;
    revieweeId: number;
    score: number;
    reviewContentId: number[];
    content: string;
  }[];
  title: string;
}

const ReviewList = ({ list, reviews, title }: ReviewListProps) => {
  const reviewsId = reviews.map((review) => review.reviewContentId);

  return (
    <div>
      <p className="mb-5pxr font-bold">{title}</p>
      {reviews.length ? (
        <ul className="flex flex-col">
          {list.map(({ reviewContentId, content }) => (
            <li
              key={reviewContentId}
              className="flex items-center gap-2 border-b border-solid border-layer-4 py-16pxr"
            >
              <span className="grow">{content}</span>
              <Users
                width={18}
                height={18}
              />
              <span>{reviewsId.flat().filter((item) => item === reviewContentId).length}</span>
            </li>
          ))}
        </ul>
      ) : (
        <span>받은 리뷰가 없어요</span>
      )}
    </div>
  );
};

export default ReviewList;
