import MainStyleButton from '@/components/MainStyleButton';
import { Separator } from '@/components/ui/separator';
import { userInfoDummy } from '@/constants/mypageDummyData';
import { routes } from '@/constants/routeURL';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import UserProfileInfo from '../_components/UserProfileInfo';

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
      title: '받은 리뷰 평가',
      link: routes.receivedReviewsAssessment,
      count: userInfoDummy.receivedReview?.length || 0,
    },
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
