import { ReactNode } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

interface UserProfileInfoProps {
  userInfo: UserInfo;
  children?: ReactNode;
  flexDirection?: 'row' | 'col';
}

interface UserInfo {
  name: string;
  profileImg: string;
  nickname: string;
  birth: string;
  gender: boolean;
  job: string;
  temperature: number;

  likeMGC?: string[];
  currentJoinMGC?: string[];
  endJoinMGC?: string[];

  receivedReview?: string[];
  sentReview?: string[];
  reportList?: string[];

  blackList?: string[];
}

const UserProfileInfo = ({ userInfo, children, flexDirection = 'row' }: UserProfileInfoProps) => {
  return (
    <section className="my-5">
      <div className={`flex gap-4 flex-${flexDirection} items-center`}>
        <Avatar className="h-100pxr w-100pxr rounded-full">
          <AvatarImage
            src="https://github.com/shadcn.png"
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
            <p>닉네임 : {userInfo.nickname}</p>
            <div className="flex gap-6">
              <p>성별 : {userInfo.gender ? '남성' : '여성'}</p>
              <p>나이 : {new Date().getFullYear() - Number(userInfo.birth.split('-')[0])}세</p>
            </div>
            <p>온도 : {userInfo.temperature}</p>
          </div>
        </div>
      </div>
      {children}
    </section>
  );
};

export default UserProfileInfo;
