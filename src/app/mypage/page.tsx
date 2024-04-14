'use client';

import { useEffect, useState } from 'react';
import client from '@/apis/core';
import UserInfo from '@/app/mypage/_components/UserInfo';
import ProgressBar from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { routes } from '@/constants/routeURL';
import { clearItem, getItem } from '@/utils/storage';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserInfoProps } from './_hooks/useMypageInfo';

interface MyPageInfoProps {
  userInfo: UserInfoProps;
  completeMogakkoCount: number;
  likeMogakkoCount: number;
  ongoingMogakkoCount: number;
}

const MyPage = () => {
  const [myInfo, setMyInfo] = useState<MyPageInfoProps | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const getMyPageInfo = async (userId: string) =>
    await client.get<MyPageInfoProps>({ url: `/users/${userId}` });

  useEffect(() => {
    const isLogin = async () => {
      setIsLoading(true);
      const userId = getItem<string | undefined>(localStorage, 'userId');
      if (userId) {
        const res = await getMyPageInfo(userId);
        setMyInfo(res);
        console.log(res);
      }
      setIsLoading(false);
    };
    isLogin();
  }, []);

  const router = useRouter();
  const handleLogout = async () => {
    const provider = getItem(localStorage, 'provider');
    try {
      if (provider === 'KAKAO') {
        await client.post({
          url: 'https://kapi.kakao.com/v1/user/logout',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
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
        <section>
          <UserInfo myInfo={myInfo.userInfo} />
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
          <section className="mb-10 flex flex-col gap-4 font-bold">
            <p className="text-xl text-main-1">내 정보 관리</p>
            <section className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <p>로그아웃</p>
                <ChevronRightIcon
                  className="cursor-pointer"
                  onClick={handleLogout}
                />
              </div>
              <Separator />
            </section>
            <section className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between transition-all duration-500 hover:text-red-500">
                <p>회원탈퇴</p>
                <ChevronRightIcon
                  className="cursor-pointer "
                  onClick={handleDeleteAccount}
                />
              </div>
              <Separator />
            </section>
          </section>
        </section>
      ) : (
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
      )}
    </>
  );
};

export default MyPage;
