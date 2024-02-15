import MGCDetail from '@/app/mgc/[id]/page';
import { LanguageTypes, MGCTypes, StudyTypes } from '@/constants/types';

export const dummyInquiry: InquiryRes = {
  _id: '1',
  author: '개발뉴비',
  content: '개발 2일찬데 ㄱㄴ?',
  createdAt: new Date(),
};

export const dummyData: MGCDetail = {
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

export interface InquiryReq {
  _id: string;
  author: string;
  content: string;
}
export interface InquiryRes extends InquiryReq {
  createdAt: Date;
}

export const devLanguageList = [
  { id: 1, value: 'all', label: '상관없음' },
  { id: 2, value: 'next.js', label: 'Next.js' },
  { id: 3, value: 'sveltekit', label: 'SvelteKit' },
  { id: 4, value: 'nuxt.js', label: 'Nuxt.js' },
  { id: 5, value: 'remix', label: 'Remix' },
  { id: 6, value: 'astro', label: 'Astro' },
];

export const studyFieldList = [
  { id: 1, value: 'all', label: '상관없음' },
  { id: 2, value: 'fe', label: 'FE' },
  { id: 3, value: 'be', label: 'BE' },
  { id: 4, value: 'web', label: 'WEB' },
  { id: 5, value: 'app', label: 'APP' },
  { id: 6, value: 'ai', label: 'AI' },
];
