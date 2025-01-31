'use client';

import client from '@/apis/core';
import UserInfo from '@/app/mypage/_components/UserInfo';
import { Button } from '@/components/ui/button';
import { routes } from '@/constants/routeURL';
import { useRequestPermission } from '@/hooks/useRequestPermission';
import { clearItem, getItem } from '@/utils/storage';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMypageInfo } from './_hooks/useMypageInfo';

const MyPage = () => {
  let userId: string | undefined;
  if (typeof window !== 'undefined') userId = getItem<string | undefined>(localStorage, 'userId');
  const { myInfo } = useMypageInfo({ userId: Number(userId) });
  const { requestPermission } = useRequestPermission();
  const router = useRouter();

  const handleLogout = async () => {
    const provider = getItem(localStorage, 'provider');
    try {
      if (provider === 'KAKAO') {
        await client.post({
          url: 'https://kapi.kakao.com/v1/user/logout',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
      } else if (provider === 'GITHUB') {
        await client.delete({
          url: `https://api.github.com/applications/${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}/token`,
          auth: {
            username: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
            password: process.env.NEXT_PUBLIC_GITHUB_SECRET!,
          },
          data: { access_token: getItem(localStorage, 'token') },
          headers: { Accept: 'application/json' },
        });
      }
      alert('로그아웃 하였습니다.');
      router.replace('/');
    } catch (e) {
      alert('인증이 만료된 사용자입니다. 다시 로그인해주세요.');
      router.replace('/signin');
    } finally {
      clearItem(localStorage);
    }
  };

  const handleAlert = () => {
    if (confirm('알림을 허용하시겠습니까?')) requestPermission({ userId });
  };
  const handleDeleteAccount = () => {
    if (confirm('정말 탈퇴하시겠습니까? 😥'))
      client.delete({ url: `/users/${getItem(localStorage, 'userId')}` }).then((res) => {
        console.log(res);
        alert('탈퇴가 완료되었습니다.');
        clearItem(localStorage);
        router.replace('/');
      });
  };

  const myActivities = [
    { title: '내가 찜한 모각코', link: routes.likeMGC, count: myInfo?.likeMogakkoCount },
    {
      title: '현재 참여중인 모각코',
      link: routes.currentJoinMGC,
      count: myInfo?.ongoingMogakkoCount,
    },
    {
      title: '종료된 모각코',
      link: routes.endJoinMGC,
      count: myInfo?.completeMogakkoCount,
    },
    {
      title: '받은 리뷰 평가',
      link: routes.receivedReviewsAssessment,
    },
    { title: '블랙리스트', link: routes.blackList },
    { title: '신고목록', link: routes.reportList },
  ];

  return (
    <>
      {myInfo ? (
        <section className="flex h-full flex-col justify-evenly">
          <div className="flex w-full text-xl font-bold">마이페이지</div>
          <UserInfo myInfo={myInfo.userInfo} />
          <div className="flex flex-col gap-4 rounded-xl bg-layer-1 p-4 font-bold shadow-xl">
            <p className="text-lg text-main-1">나의 활동</p>
            {myActivities.map(({ link, title, count }) => (
              <div
                key={link}
                className="flex flex-col gap-3 text-sm "
              >
                <div className="flex justify-between">
                  <p>
                    {title} {count ?? ''}
                  </p>
                  <Link href={link}>
                    <ChevronRightIcon className="cursor-pointer text-black-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 rounded-xl bg-layer-1 p-4 font-bold shadow-xl">
            <p className="text-lg text-main-1">내 정보 관리</p>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <p>알림 허용</p>
                <ChevronRightIcon
                  className="cursor-pointer text-black-5 "
                  onClick={handleAlert}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <p>로그아웃</p>
                <ChevronRightIcon
                  className="cursor-pointer text-black-5 "
                  onClick={handleLogout}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between transition-all duration-500 hover:text-red-500">
                <p>회원탈퇴</p>
                <ChevronRightIcon
                  className="cursor-pointer text-black-5 "
                  onClick={handleDeleteAccount}
                />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="flex w-full items-center justify-center body-height">
          <Link href={routes.signin}>
            <Button onClick={() => clearItem(localStorage)}>
              회원가입 시에만 사용할 수 있습니다.
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default MyPage;
