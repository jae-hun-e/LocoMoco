import AuthorInfo from '@/app/mgc/[id]/_components/AuthorInfo';
import Inquiry from '@/app/mgc/[id]/_components/Inquiry';
import MGCApplyArea from '@/app/mgc/[id]/_components/MGCApplyArea';
import MGCInfo from '@/app/mgc/[id]/_components/MGCInfo';
import MGCParticipants from '@/app/mgc/[id]/_components/MGCParticipants';
import { Separator } from '@/components/ui/separator';
import { LanguageTypes, MGCTypes, StudyTypes } from '@/constants/types';

interface MGCDetail {
  _id: string; // 모각코id
  author: string; // 작성자Id
  title: string; // 제목
  location: string; // 장소

  startTime: Date; // 시작 시간
  endTime: Date; // 끝나는 시간
  maxParticipantsCount?: number; // 신청 가능 인원

  // TODO: BE에게 카테고리 받으면 수정 [24/02/13]
  MGCType?: keyof typeof MGCTypes; // 모각코 타입
  languageTypes?: (keyof typeof LanguageTypes)[]; // 언어
  studyTypes?: (keyof typeof StudyTypes)[]; // 공부 분야
  job?: string[]; // 직업
  ageRange?: number[]; // 연령대
  content?: string; // 내용

  like: number; // 좋아요 수
  hits: number; // 조회수 수
  joinUsers: string[]; // 참여자Id
  inquiries?: InquiryRes[];
}

interface InquiryReq {
  _id: string;
  author: string;
  content: string;
}
interface InquiryRes extends InquiryReq {
  createdAt: Date;
}

const dummyInquiry: InquiryRes = {
  _id: '1',
  author: '개발뉴비',
  content: '개발 2일찬데 ㄱㄴ?',
  createdAt: new Date(),
};

const dummyData: MGCDetail = {
  _id: '1',
  author: '작성자 정보', // user id
  title: '모각코 모집합니다!',
  location: '서울시 강남구',
  startTime: new Date(2024, 2, 17, 14, 30),
  endTime: new Date(2024, 2, 17, 18, 30),
  maxParticipantsCount: 5,

  MGCType: MGCTypes.LocationConfirmed,
  languageTypes: [LanguageTypes.JAVA, LanguageTypes.JAVASCRIPT],
  studyTypes: [StudyTypes.web],
  ageRange: [10],
  content: '모각코를 해봅시다~!',

  like: 10,
  hits: 123,
  joinUsers: ['개발뉴비', '개발신입'],
  inquiries: [dummyInquiry],
};

// TODO: api연결 후 더미 제거 [24/02/15]
const MGCDetail = () => {
  const MGCInfoData = {
    title: dummyData.title,
    location: dummyData.location,
    startTime: dummyData.startTime,
    endTime: dummyData.endTime,

    MGCType: dummyData.MGCType,
    languageTypes: dummyData.languageTypes,
    studyTypes: dummyData.studyTypes,
    job: dummyData.job,
    ageRange: dummyData.ageRange,
    content: dummyData.content,
  };

  return (
    <div>
      <AuthorInfo
        author={dummyData.author}
        hits={dummyData.hits}
      />
      <Separator className="my-15pxr" />

      {/* TODO: 협의 후 모각코 생성쪽에서 공통 컴포넌트로 빼기 [24/02/09]*/}
      <MGCInfo {...MGCInfoData} />

      <MGCParticipants joinUsers={dummyData.joinUsers} />
      <Separator className="my-15pxr" />

      <Inquiry inquiries={dummyData.inquiries} />

      <MGCApplyArea
        maxParticipantsCount={dummyData.maxParticipantsCount}
        endTime={dummyData.endTime}
        like={dummyData.like}
      />
    </div>
  );
};

export default MGCDetail;
