'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { LanguageTypes, MGCTypes, StudyTypes } from '@/constants/types';
import { format, formatDistance, subDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import { HeartIcon } from 'lucide-react';
import Image from 'next/image';

interface MGCDetail {
  author: string;
  title: string;
  location: string;
  MGCDate: Date;
  MGCTime: Date[];
  MGCApplicationDeadline: Date;
  maxParticipantsCount?: number;

  MGSType?: keyof typeof MGCTypes;
  languageTypes?: (keyof typeof LanguageTypes)[];
  studyTypes?: (keyof typeof StudyTypes)[];
  job?: string[];
  ageRange?: number[];
  content?: string;

  like: number;
  hits: number;
  joinUsers: string[];
  inquiries?: InquiryRes[];
}

interface InquiryReq {
  author: string;
  content: string;
}
interface InquiryRes extends InquiryReq {
  createdAt: Date;
}

const dummyInquiry: InquiryRes = {
  author: '개발뉴비',
  content: '개발 2일찬데 ㄱㄴ?',
  createdAt: new Date(),
};

const dummyData: MGCDetail = {
  author: '작성자 정보', // user id
  title: '모각코 모집합니다!',
  location: '서울시 강남구',
  MGCDate: new Date(),
  MGCTime: [new Date(2024, 2, 17, 14, 30), new Date(2024, 2, 17, 18, 30)],
  MGCApplicationDeadline: subDays(new Date(), 3),
  maxParticipantsCount: 5,

  MGSType: MGCTypes.LocationConfirmed,
  languageTypes: [LanguageTypes.JAVA, LanguageTypes.JAVASCRIPT],
  studyTypes: [StudyTypes.web],
  ageRange: [10],
  content: '모각코를 해봅시다~!',

  like: 10,
  hits: 123,
  joinUsers: ['개발뉴비', '개발신입'],
  inquiries: [dummyInquiry],
};

// TODO: mgc생성과 공통 컴포넌트 빼기 [24/02/09]
// TODO: font size, weight 기준값 회의로 정한 후 수정 -> 16,14,12,10 [24/02/09]
// TODO: api연결 후 주석 제거 [24/02/09]
const MGCDetail = () => {
  const { register, handleSubmit, resetField } = useForm<InquiryReq>();
  const [like, setLike] = useState<boolean>(false);

  const optionsMapping = [
    { title: '개발 언어', value: dummyData.languageTypes },
    { title: '공부 분야', value: dummyData.studyTypes },
    { title: '현재 신분', value: dummyData.job },
    { title: '원하는 연령대', value: dummyData.ageRange },
  ];

  const onSubmit = (data: InquiryReq) => {
    const req = { ...data, author: '111' };
    // TODO: api 연결 시 콘솔제거 [24/02/12]
    console.log(req);

    resetField('content');
  };
  const handleLike = () => {
    setLike(!like);
  };

  return (
    <div>
      {/* 작성자 정보*/}
      <div className="my-10pxr flex gap-11pxr">
        <Avatar className="h-32pxr w-32pxr rounded-full ">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
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
          <p>{dummyData.author}</p>

          <p className="font-extralight">
            {formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true, locale: ko })} ·
            조회 {dummyData.hits}
          </p>
        </div>
      </div>

      <Separator className="my-15pxr" />

      {/* TODO: 협의 후 모각코 생성쪽에서 공통 컴포넌트로 빼기 [24/02/09]*/}
      {/* 모각코 정보*/}
      <div>
        <p className="my-20pxr text-lg font-bold">{dummyData.title}</p>
        <div className="mb-10pxr">
          <p>날짜: {format(dummyData.MGCApplicationDeadline, 'yyyy. MM. dd')}</p>
          <p>
            시간:
            {dummyData.MGCTime.map((time) => format(time, ' HH:mm')).join(' ~ ')}
          </p>
        </div>

        <div className="mb-30pxr">
          <div className="flex flex-col gap-5pxr">
            {optionsMapping.map(({ title, value }) => (
              <div
                key={title}
                className="flex gap-10pxr"
              >
                <p className="w-80pxr">{title}</p>
                {value ? (
                  <div className="flex gap-10pxr">
                    {value.map((language) => (
                      <Badge
                        key={language}
                        className="bg-layer-3 font-extralight text-main-2"
                      >
                        {language}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <Badge className="bg-layer-3 font-extralight text-main-2">상관없음</Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10pxr">
          <p>{dummyData?.content || '내용 없음'}</p>
          <div className="mb-10pxr mt-30pxr h-150pxr w-full bg-layer-5">지도</div>
          {/*TODO: 유경이가 PR 머지하고 나면 지도 합치기 [24/02/09]*/}
          <div className="text-sm">장소: {dummyData.location}</div>
        </div>

        <div className="mb-10pxr mt-14pxr">
          <p>현재 참여자</p>
          <div className="mt-10pxr flex gap-11pxr">
            {dummyData.joinUsers.map((user, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center"
              >
                <Avatar className="h-32pxr w-32pxr rounded-full ">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
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
                <p className="text-sm">{user}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Separator className="my-15pxr" />

      {/* 문의*/}
      <div className="mb-40pxr">
        <div className="mb-20pxr flex gap-1">
          <b>문의</b>
          <p>{dummyData.inquiries?.length}</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-32pxr flex w-full gap-11pxr"
        >
          <Avatar className="h-32pxr w-32pxr rounded-full ">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
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

        {dummyData.inquiries?.map(({ author, content, createdAt }, idx) => (
          <div
            key={idx}
            className="flex gap-11pxr text-sm"
          >
            <Avatar className="h-32pxr w-32pxr rounded-full ">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
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
      </div>

      {/* 참가 */}
      <div className="fixed bottom-0 z-20 w-[calc(100%-2.5rem)] bg-layer-1">
        <div className="my-10pxr flex h-40pxr items-center gap-18pxr">
          <button className="flex h-full flex-grow items-center justify-center rounded-xl bg-main-1 text-layer-1 hover:bg-hover">
            <p>참여하기</p>
            <p>(2/{dummyData.maxParticipantsCount})</p>
          </button>

          <button
            className="flex flex-col items-center"
            onClick={handleLike}
          >
            <HeartIcon
              size={20}
              strokeWidth={2}
              color={like ? 'red' : 'black'}
              fill={like ? 'red' : 'white'}
            />
            <p className="text-xs">{dummyData.like}</p>
          </button>
        </div>

        <div className="flex justify-center text-xs">
          <b>{format(dummyData.MGCApplicationDeadline, 'M월 d일 h시')}</b>
          <p>까지만 신청 할 수 있어요!</p>
        </div>
      </div>
    </div>
  );
};

export default MGCDetail;
