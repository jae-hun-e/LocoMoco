'use client';

import client from '@/apis/core';
import UserInfo from '@/app/mypage/_components/UserInfo';
import { useMypageInfo } from '@/app/mypage/_hooks/useMypageInfo';
import ProgressBar from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { routes } from '@/constants/routeURL';
import { clearItem, getItem, removeItem } from '@/utils/storage';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// TODO: 마이페이지 데이터 프리패칭으로 변경하기 [24/03/15]

const MyPage = () => {
  let userId;
  if (typeof window !== 'undefined') userId = getItem(localStorage, 'userId');

  const { myInfo, isLoading } = useMypageInfo({ userId: Number(userId) });

  const router = useRouter();
  const handleLogout = async () => {
    const provider = getItem(localStorage, 'provider');
    try {
      if (provider === 'KAKAO') {
        const res = await client.post({
          url: 'https://kapi.kakao.com/v1/user/logout',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        console.log(res);
      } else if (provider === 'GITHUB') {
        const res = await client.delete({
          url: `https://api.github.com/applications/${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}/token`,
          auth: {
            username: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
            password: process.env.NEXT_PUBLIC_GITHUB_SECRET!,
          },
          data: { access_token: getItem(localStorage, 'token') },
          headers: { Accept: 'application/json' },
        });
        console.log(res);
      }
      alert('로그아웃 하였습니다.');
      router.replace('/');
    } catch (e) {
      alert('인증이 만료된 사용자입니다. 다시 로그인해주세요.');
      router.replace('/signin');
    } finally {
      removeItem(localStorage, 'userId');
      removeItem(localStorage, 'token');
      removeItem(localStorage, 'provider');
    }
  };

  const handleDeleteAccount = () => {
    if (confirm('정말 탈퇴하시겠습니까? 😥'))
      client.delete({ url: `/users/${getItem(localStorage, 'userId')}` }).then((res) => {
        console.log(res);
        alert('탈퇴가 완료되었습니다.');
        removeItem(localStorage, 'userId');
        removeItem(localStorage, 'token');
        removeItem(localStorage, 'provider');
        router.replace('/');
      });
  };

  // TODO: 로딩처리 스켈레톤 추가[24/03/15]
  if (!myInfo) {
    return (
      <div className="flex h-svh w-full items-center justify-center">
        {!isLoading ? (
          <Link href={routes.signin}>
            <Button onClick={() => clearItem(localStorage)}>
              회원가입 시에만 사용할 수 있습니다.
            </Button>
          </Link>
        ) : (
          <ProgressBar />
        )}
      </div>
    );
  }

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
                {title} {count ?? ''}
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
        <section
          className="flex cursor-pointer flex-col gap-3 text-sm"
          onClick={handleLogout}
        >
          <div className="flex justify-between">
            <p>로그아웃</p>
            <ChevronRightIcon />
          </div>
          <Separator />
        </section>
        <section
          className="flex cursor-pointer flex-col gap-3 text-sm"
          onClick={handleDeleteAccount}
        >
          <div className="flex justify-between transition-all duration-500 hover:text-red-500">
            <p>회원탈퇴</p>
            <ChevronRightIcon />
          </div>
          <Separator />
        </section>
      </section>
    </section>
  );
};

export default MyPage;
