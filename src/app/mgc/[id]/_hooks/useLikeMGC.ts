import { Dispatch, SetStateAction } from 'react';
import client from '@/apis/core';
import { MogakkoInfo } from '@/apis/mgc/useGetMGCDetail';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface LikeMgcProps {
  MGCId: number;
  userId: string;
}
const likeMGC = async ({ MGCId, userId }: LikeMgcProps) => {
  return await client.post({
    url: `/mogakko/${MGCId}/like`,
    params: { userId: Number(userId) },
  });
};

const likeDeleteMGC = async ({ MGCId, userId }: LikeMgcProps) => {
  return await client.delete({
    url: `/mogakko/${MGCId}/like`,
    params: { userId: Number(userId) },
  });
};

interface LikeToggleMGCProps {
  isLike: boolean;
  setIsLike: Dispatch<SetStateAction<boolean>>;
}
// TODO: 모각코 디테일의 찜하기데이터 안에 userId도 들어가 있다면 isLike, setIsLike가 아닌 캐시 값으로 판단할 것 [24/04/07]
export const useLikeToggleMGC = ({ isLike, setIsLike }: LikeToggleMGCProps) => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: isLike ? likeMGC : likeDeleteMGC,
    onMutate: ({ MGCId }: LikeMgcProps) => {
      const previousMGCDetail = queryClient.getQueryData(['mgc', MGCId]);

      queryClient.setQueryData(['mgc', MGCId], (oldData: MogakkoInfo) => {
        return {
          ...oldData,
          likeCount: isLike ? oldData.likeCount - 1 : oldData.likeCount + 1,
        };
      });
      setIsLike((isLike) => !isLike);

      return previousMGCDetail;
    },
    onError: (error, { MGCId }: LikeMgcProps, context) => {
      queryClient.setQueryData(['mgc', MGCId], context);
      setIsLike((isLike) => !isLike);
      console.log('error', error);
    },

    onSettled: async (_, __, { MGCId }) => {
      await queryClient.invalidateQueries({ queryKey: ['mgc', MGCId] });
    },
  });

  return { likeToggleMGC: mutate, ...rest };
};
