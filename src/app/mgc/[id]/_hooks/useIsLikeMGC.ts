import { useEffect, useState } from 'react';
import { useGetLikeMGC } from '@/app/mypage/(sub-page)/like-mgc/_hooks/useGetLikeMGC';

interface Props {
  userId: number;
  MGCId: number;
}

// TODO: 모각코 디테일의 찜하기데이터 안에 userId도 들어가 있다면 필요없는 훅 [24/04/07]
export const useIsLikeMGC = ({ userId, MGCId }: Props) => {
  const [isLike, setIsLike] = useState(false);
  const { likeMGCs } = useGetLikeMGC({ userId });

  useEffect(() => {
    if (likeMGCs?.find((likeMGC) => likeMGC.id == MGCId)) setIsLike(true);
  }, [likeMGCs]);

  return { isLike, setIsLike };
};
