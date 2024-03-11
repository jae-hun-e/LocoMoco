'use client';

// import useGetBlackList from '@/apis/blacklist/useGetBlacklist';
import UserList from '@/app/_components/UserInfoAndButton/UserList';

// TODO: layout.tsx 파일 생성 -> header 추가해야 함 [2024/03/06]

const userList = [
  {
    userId: 1,
    nickname: 'nickname1',
    profileImage: {
      imageId: 1,
      path: '/oh.png',
    },
  },
];

const BlackList = () => {
  // const userId = 67;
  // const { data } = useGetBlackList(userId);

  const handleButtonClick = (targetId: number) => {
    console.log(`유저 ${targetId}를 차단 해제합니다.`);
  };

  return (
    <UserList
      data={userList ?? []}
      onClick={handleButtonClick}
      buttonName="차단 해제"
    />
  );
};

export default BlackList;
