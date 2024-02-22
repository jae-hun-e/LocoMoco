import MainStyleButton from '@/components/MainStyleButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { userInfoDummy } from '@/constants/mypageDummyData';
import { routes } from '@/constants/routeURL';
import { ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const MyPage = () => {
  const myActivities = [
    { title: '내가 찜한 모각코', link: routes.likeMGC, count: userInfoDummy.likeMGC?.length || 0 },
    {
      title: '현재 참여중인 모각코',
      link: routes.currentJoinMGC,
      count: userInfoDummy.currentJoinMGC?.length || 0,
    },
    {
      title: '종료된 모각코',
      link: routes.endJoinMGC,
      count: userInfoDummy.endJoinMGC?.length || 0,
    },
    {
      title: '받은리뷰',
      link: routes.receivedReviews,
      count: userInfoDummy.receivedReview?.length || 0,
    },
    { title: '보낸리뷰', link: routes.sendReviews, count: userInfoDummy.sentReview?.length || 0 },
    { title: '블랙리스트', link: routes.blackList, count: userInfoDummy.blackList?.length || 0 },
    { title: '신고목록', link: routes.reportList, count: userInfoDummy.reportList?.length || 0 },
  ];

  const manageMyInfo = [
    { title: '로그아웃', link: routes.logout },
    { title: '회원탈퇴', link: routes.withdrawal },
  ];

  return (
    <section>
      {/*유저정보*/}
      <section className="my-5">
        <div className="flex gap-4">
          <Avatar className="h-100pxr w-100pxr rounded-full">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
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
              <p>닉네임 : {userInfoDummy.nickname}</p>
              <div className="flex gap-6">
                <p>성별 : {userInfoDummy.gender ? '남성' : '여성'}</p>
                <p>
                  나이 : {new Date().getFullYear() - Number(userInfoDummy.birth.split('-')[0])}세
                </p>
              </div>
              <p>온도 : {userInfoDummy.temperature}</p>
            </div>
          </div>
        </div>

        <MainStyleButton
          content="개인정보 수정하기"
          layout="h-33pxr"
        />
      </section>

      {/*나의 활동*/}
      <section className="mb-10 flex flex-col gap-4 font-bold">
        <p className="text-xl text-main-1">나의 활동</p>
        {myActivities.map(({ link, title, count }) => (
          <section
            key={link}
            className="flex flex-col gap-3 text-sm "
          >
            <div className="flex justify-between">
              <p>
                {title} {count}
              </p>
              <Link href={link}>
                <ChevronRightIcon />
              </Link>
            </div>
            <Separator />
          </section>
        ))}
      </section>

      {/*내 정보 관리*/}
      <section className="mb-10 flex flex-col gap-4 font-bold">
        <p className="text-xl text-main-1">내 정보 관리</p>
        {manageMyInfo.map(({ link, title }) => (
          <section
            key={link}
            className="flex flex-col gap-3 text-sm"
          >
            <div className="flex justify-between">
              <p>{title}</p>
              <Link href={link}>
                <ChevronRightIcon />
              </Link>
            </div>
            <Separator />
          </section>
        ))}
      </section>
    </section>
  );
};

export default MyPage;
