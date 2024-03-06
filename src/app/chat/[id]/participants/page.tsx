'use client';

import UserList from '@/app/_components/UserInfoAndButton/UserList';

const participants = [
  { username: 'Nickname1', profileImg: '/oh.png', userId: 1 },
  { username: 'Nickname2222', profileImg: '/oh.png', userId: 2 },
  { username: 'Nickname3', profileImg: '/oh.png', userId: 3 },
  { username: 'Nickname4', profileImg: '/oh.png', userId: 4 },
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
