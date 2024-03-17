import client from '@/apis/core';
import { UserProfile } from '@/types/userInfo';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ChangeMyInfoProps {
  changeMyData: UserProfile;
  userId: string;
}

const changeMyInfo = async ({ changeMyData, userId }: ChangeMyInfoProps) => {
  try {
    return await client.patch({ url: `/users/${userId}`, data: changeMyData });
  } catch (error) {
    console.error('내 정보 변경에 실패했습니다.', error);
  }
};

export const useChangeMyInfo = ({ userId }: { userId: string }) => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation<unknown, Error, UserProfile>({
    mutationFn: (changeMyData) => changeMyInfo({ changeMyData, userId }),
    onError: (error) => {
      console.log('error', error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mypage', userId] });
      alert('내 정보가 변경되었습니다.');
    },
  });

  return { changeMyInfo: mutate, ...rest };
};
