'use client';

import { useEffect, useState } from 'react';
import useDeleteBlacklist from '@/apis/blacklist/useDeleteBlacklist';
import useGetBlackList from '@/apis/blacklist/useGetBlacklist';
import UserList from '@/app/_components/UserInfoAndButton/UserList';
import { USER_ID_KEY, getItem } from '@/utils/storage';

const BlackList = () => {
  const [userId, setUserId] = useState<number>(78);

  useEffect(() => {
    setUserId(getItem(localStorage, USER_ID_KEY, 78));
  }, []);

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
