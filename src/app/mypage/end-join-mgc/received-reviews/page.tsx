import ReviewList from '@/app/_components/reviewList/ReviewList';

const ReceivedReviews = () => {
  const dummy = [
    {
      reviewId: 1,
      reviewerId: 5,
      score: 4,
      reviewContentId: [1, 2, 3],
      content: '좋았습니다~',
      userId: 1,
      nickname: '닉네임',
      job: '현직자',
      profileImage: {
        imageId: 1,
        path: '',
      },
      createdAt: '2024-02-12',
    },
    {
      reviewId: 2,
      reviewerId: 5,
      score: 3,
      reviewContentId: [1, 2, 3],
      content: '',
      userId: 1,
      nickname: '닉네임2',
      job: '현직자',
      profileImage: {
        imageId: 1,
        path: '',
      },
      createdAt: '2024-03-06',
    },
  ];

  return (
    <>
      <ReviewList
        reviews={dummy}
        title="보낸"
      />
    </>
  );
};

export default ReceivedReviews;
