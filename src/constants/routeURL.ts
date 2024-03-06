export const routes = {
  home: '/',
  create: '/create',
  chat: '/chat',
  search: '/search',
  mypage: '/mypage',
  changeMyInfo: '/mypage/change-my-info',
  likeMGC: '/mypage/like-mgc',
  currentJoinMGC: '/mypage/current-join-mgc',
  endJoinMGC: '/mypage/end-join-mgc',
  receivedReviews: '/mypage/received-reviews',
  // TODO: 종료된 모각코에서 갈 수 있게 경로 수정해야함 [24.03.06]
  sendReviews: '/mypage/send-reviews',
  reportList: '/mypage/report-list',
  blackList: '/mypage/black-list',
  logout: '/mypage/logout',
  withdrawal: '/mypage/withdrawal',
} as const;

// TODO: 헤더에 필요한 타이틀 url과 맵핑[24/02/14]
export const titleMap = {
  chat: '채팅',
  create: '모각코 생성',
  mgc: '모각코 디테일',
  'received-reviews': '받은 리뷰 평가',
  'send-reviews': '보낸 리뷰',
} as const;
