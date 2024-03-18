'use client';

import { useForm } from 'react-hook-form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { InquiryReq, InquiryRes, dummyData } from '@/constants/mgcDummyData';
import { format } from 'date-fns';
import Image from 'next/image';

interface Props {
  MGCId: number;
}

// TODO: 문의 API 완성 되면 CRUD연결 - 다음 PR [24/03/04]
// TODO: 모각코 생성자만 답글 가능한 툴바 생성 - 다음 PR [24/03/04]
const Inquiry = ({ MGCId }: Props) => {
  const inquiries: InquiryRes[] = dummyData.inquiries;

  const { register, handleSubmit, resetField } = useForm<InquiryReq>();
  const onSubmit = (data: InquiryReq) => {
    const req = { ...data, author: '111' };
    // TODO: api 연결 시 콘솔제거 [24/02/12]
    console.log(req);
    console.log(MGCId);
    resetField('content');
  };

  return (
    <section className="mb-150pxr">
      <div className="mb-20pxr flex gap-1">
        <b>문의</b>
        <p>{inquiries.length}</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-32pxr flex w-full gap-11pxr"
      >
        <Avatar className="h-32pxr w-32pxr rounded-full ">
          <AvatarImage
            src="https://github.com/shadcn.png"
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

      {inquiries.map(({ author, content, createdAt }, idx) => (
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
            <p>{author}</p>
            <p className="text-xs font-extralight">{format(createdAt, 'M월 d일 h시')}</p>
            <p>{content}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Inquiry;
