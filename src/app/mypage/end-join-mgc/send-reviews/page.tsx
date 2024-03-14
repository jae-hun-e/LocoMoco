import ReviewList from '@/app/_components/reviewList/ReviewList';

const SendReviews = () => {
  const dummy = [
    {
      reviewId: 1,
      reviewerId: 5,
      score: 4,
      reviewContentId: [1, 2, 3],
      content:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that ',
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
      reviewContentId: [1, 2, 3, 4],
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
    {
      reviewId: 3,
      reviewerId: 5,
      score: 3,
      reviewContentId: [1, 4],
      content: '',
      userId: 1,
      nickname: '닉네임3',
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
        title="받은"
      />
    </>
  );
};

export default SendReviews;
