export const selectionStatus = {
  BEFORE: 'before',
  IN: 'in',
  COMPLETE: 'complete',
  SUBMIT: 'submit',
} as const;

export const category = {
  mgcType: '모각코 유형',
  language: '개발 언어',
  area: '개발 유형',
  searchType: '검색어 유형',
} as const;

export const searchCategory = {
  location: '장소',
  titleAndContent: '제목+내용',
  nickname: '닉네임',
} as const;

export const iconSubmitColor = {
  mgcType: 'text-sub-1',
  language: 'text-sub-2',
  area: 'text-main-1',
} as const;
