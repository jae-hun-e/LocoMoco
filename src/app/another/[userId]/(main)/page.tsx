'use client';

import React from 'react';
import useGetUserInfo from '@/apis/user/useGetUserInfo';
import UserProfileInfo from '@/app/_components/UserProfileInfo';
import { Separator } from '@/components/ui/separator';
import { userInfoDummy } from '@/constants/mypageDummyData';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

const AnotherPage = ({ params }: { params: { userId: string } }) => {
  const { data: userInfo } = useGetUserInfo(parseInt(params.userId));

  // TODO: suspense 적용 후 더미 제거 [24.03.14]
  const joinMGCCount = userInfo
    ? userInfo.completeMogakkoCount + userInfo.ongoingMogakkoCount
    : userInfoDummy.completeMogakkoCount + userInfoDummy.ongoingMogakkoCount;

  return (
    <div>
      <UserProfileInfo
        userInfo={userInfo ?? userInfoDummy}
        flexDirection="col"
      />
      <section className="mb-10 mt-50pxr flex flex-col gap-4 font-bold">
        <section className="flex flex-col gap-3 text-sm ">
          <div className="flex justify-between">
            <p>참여한 모각코 {joinMGCCount} 개</p>
            <Link href={`/another/${params.userId}/join-mgc`}>
              <ChevronRightIcon />
            </Link>
          </div>
          <Separator />
        </section>
        <section className="flex flex-col gap-3 text-sm ">
          <div className="flex justify-between">
            <p>받은 리뷰 평가</p>
            <Link href={`/another/${params.userId}/received-reviews-assessment`}>
              <ChevronRightIcon />
            </Link>
          </div>
          <Separator />
        </section>
      </section>
    </div>
  );
};

export default AnotherPage;
