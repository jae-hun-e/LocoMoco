'use client';

import MainStyleButton from '@/components/MainStyleButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { routes } from '@/constants/routeURL';
import { useTagMapping } from '@/hooks/useTagMapping';
import Image from 'next/image';
import Link from 'next/link';
import { UserInfoProps } from '../_hooks/useMypageInfo';

// import { UserInfoProps } from '../page';

const UserInfo = ({ myInfo }: { myInfo: UserInfoProps }) => {
  const tagMapping = useTagMapping();

  return (
    <section className="my-5">
      <div className="flex gap-4">
        <Avatar className="h-100pxr w-100pxr rounded-full">
          <AvatarImage
            src={myInfo.profileImage ? myInfo.profileImage.path : '/oh.png'}
            alt="유저 이미지"
          />
          <AvatarFallback>
            <Image
              src={'/oh.png'}
              alt={'cn'}
              width={100}
              height={100}
            />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-grow flex-col justify-center gap-2">
          <div className="mx-auto flex flex-col justify-center">
            <p>닉네임 : {myInfo.nickname}</p>
            <div className="flex gap-6">
              <p>성별 : {myInfo.gender === 'MALE' ? '남성' : '여성'}</p>
              <p>나이 : {new Date().getFullYear() - Number(myInfo.birth.split('-')[0])}세</p>
            </div>
            <p>직업 : {tagMapping.get(myInfo.jobId)?.tagName}</p>
            <p>온도 : {myInfo.temperature}</p>
          </div>
        </div>
      </div>

      <Link href={routes.changeMyInfo}>
        <MainStyleButton
          content="개인정보 수정하기"
          layout="h-33pxr"
        />
      </Link>
    </section>
  );
};

export default UserInfo;
