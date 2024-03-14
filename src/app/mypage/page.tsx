'use client';

import UserInfo from '@/app/mypage/_components/UserInfo';
import { useMypageInfo } from '@/app/mypage/_hooks/useMypageInfo';
import { Separator } from '@/components/ui/separator';
import { routes } from '@/constants/routeURL';
import { getItem } from '@/utils/storage';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

// TODO: 마이페이지 데이터 프리패칭으로 변경하기 [24/03/15]
const MyPage = () => {
  let userId;
  if (typeof window !== 'undefined') userId = getItem(localStorage, 'userId');

  const { myInfo } = useMypageInfo({ userId: Number(userId) });

  // TODO: 로딩처리 스켈레톤 추가[24/03/15]
  if (!myInfo) return <div>로딩중...</div>;

  const myActivities = [
    { title: '내가 찜한 모각코', link: routes.likeMGC, count: myInfo.likeMogakkoCount },
    {
      title: '현재 참여중인 모각코',
      link: routes.currentJoinMGC,
      count: myInfo.ongoingMogakkoCount,
    },
    {
      title: '종료된 모각코',
      link: routes.endJoinMGC,
      count: myInfo.completeMogakkoCount,
    },
    {
      title: '받은 리뷰 평가',
      link: routes.receivedReviewsAssessment,
    },
    { title: '블랙리스트', link: routes.blackList },
    { title: '신고목록', link: routes.reportList },
  ];

  const manageMyInfo = [
    { title: '로그아웃', link: routes.logout },
    { title: '회원탈퇴', link: routes.withdrawal },
  ];

  return (
    <section>
      {/*유저정보*/}
      <UserInfo myInfo={myInfo.userInfo} />

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
