'use client';

import { useState } from 'react';
import {
  CreateInquiryContainer,
  PatchInquiryContainer,
} from '@/app/mgc/[id]/_components/inquiry/InquiryContainer';
import InquiryTooltip from '@/app/mgc/[id]/_components/inquiry/InquiryTooltip';
import { useGetInquiry } from '@/app/mgc/[id]/_hooks/useGetInquiry';
import { useMypageInfo } from '@/app/mypage/_hooks/useMypageInfo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getItem } from '@/utils/storage';
import { format } from 'date-fns';
import Image from 'next/image';

interface Props {
  MGCId: number;
  authorId: number;
}

const Inquiry = ({ MGCId, authorId }: Props) => {
  let userId: string | undefined;
  if (typeof window !== 'undefined') {
    userId = getItem<string | undefined>(localStorage, 'userId');
  }

  const [editingInquiryId, setEditingInquiryId] = useState<number | null>();

  const { myInfo } = useMypageInfo({ userId: Number(userId) });
  const { inquiryData } = useGetInquiry({ MGCId });

  console.log('inquiryData', inquiryData);

  return (
    <section className="mb-150pxr">
      <div className="mb-20pxr flex gap-1">
        <b>문의</b>
        <p>{inquiryData?.length}</p>
      </div>

      <CreateInquiryContainer
        userId={Number(userId)}
        userImage={myInfo?.userInfo.profileImage?.path}
        MGCId={MGCId}
      />

      {inquiryData?.map(
        ({ nickname, content, createdAt, profileImage, userId: inquiryAuthorId, inquiryId }) => (
          <div
            key={createdAt}
            className="group relative mb-10pxr flex gap-11pxr text-sm"
          >
            {editingInquiryId !== inquiryId ? (
              <>
                <Avatar className="h-32pxr w-32pxr rounded-full">
                  <AvatarImage
                    src={profileImage?.path ?? '/oh.png'}
                    alt="문의 작성자 이미지"
                  />
                  <AvatarFallback>
                    <Image
                      src={'/oh.png'}
                      alt={'cn'}
                      width={32}
                      height={32}
                    />
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col gap-3pxr">
                  <p>{nickname}</p>
                  <p className="text-xs font-extralight">{format(createdAt, 'M월 d일 HH시')}</p>
                  <p>{content}</p>
                </div>

                <InquiryTooltip
                  inquiryId={inquiryAuthorId}
                  userId={Number(userId)}
                  authorId={authorId}
                  onModifyInquiryId={() => setEditingInquiryId(inquiryId)}
                />
              </>
            ) : (
              <PatchInquiryContainer
                userId={Number(userId)}
                userImage={myInfo?.userInfo.profileImage?.path}
                MGCId={MGCId}
                defaultValues={content}
                inquiryId={inquiryId}
                onClose={() => setEditingInquiryId(null)}
              />
            )}
          </div>
        ),
      )}
    </section>
  );
};

export default Inquiry;
