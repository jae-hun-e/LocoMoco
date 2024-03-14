import { ReviewDetailType } from '@/types/review';
import { X } from 'lucide-react';

interface ReviewDetailProps {
  title: string;
  reviewDetailData?: ReviewDetailType;
  onClose: () => void;
}

const ReviewDetail = ({ title, reviewDetailData, onClose }: ReviewDetailProps) => {
  const dummyReviewContentId = [
    {
      reviewContentId: 1,
      content: '친절하고 매너있어요',
    },
    {
      reviewContentId: 2,
      content: '시간약속을 잘 지켜요',
    },
    {
      reviewContentId: 3,
      content: '응답이 빨라요',
    },
    {
      reviewContentId: 4,
      content: '좋은 점4',
    },
  ];

  return (
    <div className="px-10pxr py-15pxr">
      <div className="mb-20pxr flex items-center">
        <button onClick={onClose}>
          <X
            width={20}
            height={20}
          />
        </button>
        <p className="grow text-center font-bold">내가 {title} 후기</p>
      </div>
      <p className="mb-10pxr text-lg font-bold">{reviewDetailData?.nickname}님과 만남의 후기에요</p>
      <ul>
        <p className="mb-5pxr text-sm font-bold">느낀점</p>
        {reviewDetailData?.reviewContentId.map((id) => (
          <li
            key={id}
            className="text-sm"
          >
            {dummyReviewContentId.find(({ reviewContentId }) => reviewContentId === id)?.content}
          </li>
        ))}
      </ul>
      {reviewDetailData?.content ? (
        <div className="mt-25pxr text-sm">
          <p className="mb-5pxr font-bold">후기</p>
          <div className="max-h-200pxr overflow-auto rounded bg-main-5 p-10pxr scrollbar-hide">
            <p className="text-sm">{reviewDetailData?.content}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ReviewDetail;
