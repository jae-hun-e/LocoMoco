'use client';

import UserList from '@/app/_components/UserInfoAndButton/UserList';

const participants = [
  {
    userId: 1,
    nickname: '사용자1',
    profileImage: {
      imageId: 1,
      path: '/oh.png',
    },
  },
  {
    userId: 2,
    nickname: '사용자2',
    profileImage: {
      imageId: 1,
      path: '/oh.png',
    },
  },
  {
    userId: 3,
    nickname: '사용자3',
    profileImage: {
      imageId: 1,
      path: '/oh.png',
    },
  },
];

const Participants = () => {
  const handleButtonClick = (targetId: number) => {
    console.log(`${targetId}에게 후기를 보냅니다.`);
  };

  return (
    <UserList
      data={participants}
      onClick={handleButtonClick}
      buttonName="후기 보내기"
    />
  );
};
export default Participants;
