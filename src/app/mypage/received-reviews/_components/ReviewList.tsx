import { Users } from 'lucide-react';

interface ReviewListProps {
  list: {
    id: number;
    text: string;
  }[];
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
  return (
    <div>
      <p className="mb-5pxr font-bold">{title}</p>
      {reviews.length ? (
        <ul className="flex flex-col">
          {list.map(({ id, text }) => (
            <li
              key={id}
              className="flex items-center gap-2 border-b border-solid border-layer-4 py-16pxr"
            >
              <span className="grow">{text}</span>
              <Users
                width={18}
                height={18}
              />
              <span>{reviews.filter((item) => item.reviewContentId.includes(id)).length}</span>
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
