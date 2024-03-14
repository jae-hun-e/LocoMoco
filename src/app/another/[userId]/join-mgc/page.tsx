import MGCList from '@/app/_components/MGCList/MGCList';

const page = ({ params }: { params: { userId: string } }) => {
  // TODO: api 연결 후 제거 [24.03.13]
  console.log(params);

  const dummy = [
    {
      id: 1,
      title: '모각코',
      views: 12,
      likeCount: 1,
      maxParticipants: 3,
      curParticipants: 1,
      location: {
        address: '구로동',
        latitude: 37.456,
        longitude: 126.6768,
      },
      tags: [240],
    },
    {
      id: 1,
      title: '모각코2',
      views: 12,
      likeCount: 1,
      maxParticipants: 3,
      curParticipants: 1,
      location: {
        address: '구로동',
        latitude: 37.456,
        longitude: 126.6768,
      },
      tags: [238, 241],
    },
  ];

  return (
    <div>
      <MGCList data={dummy} />
    </div>
  );
};

export default page;
