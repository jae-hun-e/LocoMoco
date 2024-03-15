'use client';

import MainStyleButton from '@/components/MainStyleButton';
import { Separator } from '@/components/ui/separator';
import { userInfoDummy } from '@/constants/mypageDummyData';
import { routes } from '@/constants/routeURL';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import UserProfileInfo from '../_components/UserProfileInfo';

/* TODO: BE에게 요청사항 [24/03/13]
  1. 마이페이지 정보에 찜한, 진행중, 종료 모각코 개수 담은 필드 넘겨주세요!
  2. 진행중, 종료 모각코도 찜한 모각코 처럼 MGCSummary 타입으로 넘겨주세요...
 */
const MyPage = () => {
  const myActivities = [
    { title: '내가 찜한 모각코', link: routes.likeMGC, count: userInfoDummy.likeMogakkoCount || 0 },
    {
      title: '현재 참여중인 모각코',
      link: routes.currentJoinMGC,
      count: userInfoDummy.ongoingMogakkoCount || 0,
    },
    {
      title: '종료된 모각코',
      link: routes.endJoinMGC,
      count: userInfoDummy.completeMogakkoCount || 0,
    },
    {
      title: '받은 리뷰 평가',
      link: routes.receivedReviewsAssessment,
      count: 0,
    },
    { title: '블랙리스트', link: routes.blackList, count: userInfoDummy.blackListCount || 0 },
    { title: '신고목록', link: routes.reportList, count: userInfoDummy.reportListCount || 0 },
  ];

  const manageMyInfo = [
    { title: '로그아웃', link: routes.logout },
    { title: '회원탈퇴', link: routes.withdrawal },
  ];

  return (
    <section>
      {/*유저정보*/}
      <UserProfileInfo userInfo={userInfoDummy}>
        <Link href={routes.changeMyInfo}>
          <MainStyleButton
            content="개인정보 수정하기"
            layout="h-33pxr"
          />
        </Link>
      </UserProfileInfo>

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
