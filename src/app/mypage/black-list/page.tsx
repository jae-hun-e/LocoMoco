'use client';

import { useState } from 'react';
import useDeleteBlacklist from '@/apis/blacklist/useDeleteBlacklist';
import useGetBlackList from '@/apis/blacklist/useGetBlacklist';
import UserList from '@/app/_components/UserInfoAndButton/UserList';
import { getItem } from '@/utils/storage';

const BlackList = () => {
  let userId;
  if (typeof window !== 'undefined') {
    userId = getItem<string | undefined>(localStorage, 'userId');
  }

  const [targetId, setTargetId] = useState<number | undefined>(undefined);
  const { data } = useGetBlackList(Number(userId));
  const { deleteBlackList } = useDeleteBlacklist(Number(userId), targetId);

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
