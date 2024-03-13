'use client';

import React from 'react';
import UserProfileInfo from '@/app/_components/UserProfileInfo';
import { Separator } from '@/components/ui/separator';
import { userInfoDummy } from '@/constants/mypageDummyData';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

const AnotherPage = ({ params }: { params: { userId: string } }) => {
  return (
    <div>
      <UserProfileInfo
        userInfo={userInfoDummy}
        flexDirection="col"
      />
      <section className="mb-10 mt-50pxr flex flex-col gap-4 font-bold">
        <section className="flex flex-col gap-3 text-sm ">
          <div className="flex justify-between">
            <p>참여한 모각코 {userInfoDummy.currentJoinMGC?.length} 개</p>
            <Link
              href="/another/[userId]/join-mgc"
              as={`/another/${params.userId}/join-mgc`}
            >
              <ChevronRightIcon />
            </Link>
          </div>
          <Separator />
        </section>
        <section className="flex flex-col gap-3 text-sm ">
          <div className="flex justify-between">
            <p>받은 리뷰 평가</p>
            <Link
              href="/another/[userId]/received-reviews-assessment"
              as={`/another/${params.userId}/received-reviews-assessment`}
            >
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
