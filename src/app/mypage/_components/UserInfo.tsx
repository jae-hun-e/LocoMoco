'use client';

import MainStyleButton from '@/components/MainStyleButton';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { routes } from '@/constants/routeURL';
import { useTagMapping } from '@/hooks/useTagMapping';
import Link from 'next/link';
import { UserInfoProps } from '../_hooks/useMypageInfo';

const UserInfo = ({ myInfo }: { myInfo: UserInfoProps }) => {
  const tagMapping = useTagMapping();

  return (
    <section className="rounded-xl bg-layer-1 p-4 pb-0 shadow-lg">
      <div className="flex gap-4">
        <Avatar className="h-80pxr w-80pxr rounded-full">
          <AvatarImage
            src={myInfo.profileImage ? myInfo.profileImage.path : '/oh.png'}
            alt="유저 이미지"
          />
        </Avatar>
        <div className="flex flex-grow flex-col justify-center gap-1">
          <div className="flex items-center gap-1">
            <p className="font-bold">{myInfo.nickname}</p>
            <p className="rounded-md bg-temp-bg p-1 text-sm text-temp-text">{myInfo.temperature}</p>
          </div>
          <div className="flex text-black-4">
            <p>{tagMapping.get(myInfo.jobId)?.tagName}|</p>
            <p>{myInfo.gender === 'MALE' ? '남성' : '여성'}|</p>
            <p>{new Date().getFullYear() - Number(myInfo.birth.split('-')[0])}세</p>
          </div>
        </div>
      </div>

      <Link href={routes.changeMyInfo}>
        <MainStyleButton
          content="프로필 수정"
          layout="p-1"
          className="bg-gray-200 text-black"
        />
      </Link>
    </section>
  );
};

export default UserInfo;
