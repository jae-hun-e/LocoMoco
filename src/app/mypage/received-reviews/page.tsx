import ReviewList from './_components/ReviewList';

const ReceivedReviews = () => {
  const goodList = [
    { id: 1, text: '예시1' },
    { id: 2, text: '예시2' },
    { id: 3, text: '예시3' },
    { id: 4, text: '예시4' },
  ];
  const badList = [
    { id: 5, text: '안좋은 예시1' },
    { id: 6, text: '안좋은 예시2' },
    { id: 7, text: '안좋은 예시3' },
    { id: 8, text: '안좋은 예시4' },
  ];

  const dummyData = [
    {
      reviewId: 1,
      reviewerId: 5,
      revieweeId: 2,
      score: 4,
      reviewContentId: [1, 2, 3],
      content: '좋았습니다~',
    },
    {
      reviewId: 2,
      reviewerId: 5,
      revieweeId: 2,
      score: 5,
      reviewContentId: [1, 3, 4],
      content: '아주 좋았습니다~',
    },
    {
      reviewId: 3,
      reviewerId: 5,
      revieweeId: 2,
      score: 1,
      reviewContentId: [5, 6],
      content: '싫었습니다~',
    },
  ];

  const goodReviews = dummyData.filter((review) => review.score > 2);
  const badReviews = dummyData.filter((review) => review.score <= 2);

  return (
    <div className="grid gap-20pxr">
      <ReviewList
        list={goodList}
        reviews={goodReviews}
        title="🙂 받은 칭찬"
      />
      <ReviewList
        list={badList}
        reviews={badReviews}
        title="😟 받은 비매너"
      />
    </div>
  );
};

export default ReceivedReviews;
