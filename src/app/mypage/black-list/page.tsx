'use client';

import UserList from '@/app/_components/UserInfoAndButton/UserList';

// TODO: layout.tsx 파일 생성 -> header 추가해야 함 [2024/03/06]

const userList = [
  { username: 'Nickname1', profileImg: '/oh.png', userId: 1 },
  { username: 'Nickname2', profileImg: '/oh.png', userId: 2 },
  { username: 'Nickname3', profileImg: '/oh.png', userId: 3 },
  { username: 'Nickname4', profileImg: '/oh.png', userId: 4 },
];

const BlackList = () => {
  const handleButtonClick = (targetId: number) => {
    console.log(`유저 ${targetId}를 차단 해제합니다.`);
  };

  return (
    <UserList
      data={userList}
      onClick={handleButtonClick}
      buttonName="차단 해제"
    />
  );
};

export default BlackList;
