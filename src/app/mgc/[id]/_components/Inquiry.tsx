'use client';

import { useForm } from 'react-hook-form';
import { InquiryReq, useCreateInquiry } from '@/app/mgc/[id]/_hooks/useCreateInquiry';
import { useGetInquiry } from '@/app/mgc/[id]/_hooks/useGetInquiry';
import { useMypageInfo } from '@/app/mypage/_hooks/useMypageInfo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { getItem } from '@/utils/storage';
import { format } from 'date-fns';
import Image from 'next/image';

interface Props {
  MGCId: number;
}

// TODO: 문의 API 완성 되면 CRUD연결 - 다음 PR [24/03/04]
// TODO: 모각코 생성자만 답글 가능한 툴바 생성 - 다음 PR [24/03/04]
const Inquiry = ({ MGCId }: Props) => {
  let userId: string | undefined;
  if (typeof window !== 'undefined') {
    userId = getItem<string | undefined>(localStorage, 'userId');
  }

  const { myInfo } = useMypageInfo({ userId: Number(userId) });

  const { inquiryData } = useGetInquiry({ MGCId });
  const { createInquiry } = useCreateInquiry();
  console.log('inquiryData', inquiryData);

  const { register, handleSubmit, resetField } = useForm<InquiryReq>();
  const onSubmit = ({ content }: InquiryReq) => {
    userId && createInquiry({ userId: Number(userId), mogakkoId: MGCId, content });
    resetField('content');
  };

  return (
    <section className="mb-150pxr">
      <div className="mb-20pxr flex gap-1">
        <b>문의</b>
        <p>{inquiryData?.length}</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-32pxr flex w-full gap-11pxr"
      >
        <Avatar className="h-32pxr w-32pxr rounded-full ">
          <AvatarImage
            src={myInfo?.userInfo.profileImage?.path ?? '/oh.png'}
            alt="유저 프로필 이미지"
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
        <Input
          placeholder="문의 쓰기"
          {...register('content')}
        />
      </form>

      {inquiryData?.map(({ nickname, content, createdAt }, idx) => (
        <div
          key={idx}
          className="flex gap-11pxr text-sm"
        >
          <Avatar className="h-32pxr w-32pxr rounded-full">
            <AvatarImage
              src="https://github.com/shadcn.png"
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
            <p className="text-xs font-extralight">{format(createdAt, 'M월 d일 h시')}</p>
            <p>{content}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Inquiry;
