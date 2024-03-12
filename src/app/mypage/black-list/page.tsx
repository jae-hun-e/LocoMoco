'use client';

import { useState } from 'react';
import useDeleteBlacklist from '@/apis/blacklist/useDeleteBlacklist';
import useGetBlackList from '@/apis/blacklist/useGetBlacklist';
import UserList from '@/app/_components/UserInfoAndButton/UserList';

const BlackList = () => {
  // [Todo]: util에서 userId 가져오게 (2024/03/12)
  const userId = 78;
  const [targetId, setTargetId] = useState<number>(userId);
  const { data } = useGetBlackList(userId);
  const { deleteBlackList } = useDeleteBlacklist(userId, targetId);

  const handleButtonClick = (targetId: number) => {
    console.log(`유저 ${targetId}를 차단 해제합니다.`);
    setTargetId(targetId);
    deleteBlackList();
  };

  return (
    <UserList
      data={data ?? []}
      onClick={handleButtonClick}
      buttonName="차단 해제"
    />
  );
};

export default BlackList;
