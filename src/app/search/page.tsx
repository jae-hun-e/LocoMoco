'use client';

import MGCList from '@/app/_components/MGCList/MGCList';
import { MGCSummary } from '@/types/MGCList';
import { Search } from 'lucide-react';

const dummyData: MGCSummary[] = [
  {
    id: 1,
    title: '모각코 구함',
    location: {
      address: '구로동',
      latitude: 37.48,
      longitude: 126.8,
    },
    // createAt: new Date('1995-12-17T03:24:00'),
    views: 3,
    likeCount: 30,
    curParticipants: 2,
    maxParticipants: 8,
    tags: [1, 2, 3],
  },
  {
    id: 2,
    title: '면접 준비 같이해요~',
    location: {
      address: '구로동',
      latitude: 37.48,
      longitude: 126.8,
    },
    // createAt: new Date('2023-12-17T03:24:00'),
    views: 3,
    likeCount: 30,
    curParticipants: 2,
    maxParticipants: 3,
    tags: [1, 2, 3],
  },
  {
    id: 3,
    title: '번개 모각코 하실 분~!',
    location: {
      address: '구로동',
      latitude: 37.48,
      longitude: 126.8,
    },
    // createAt: new Date('2024-02-14T00:24:00'),
    views: 10,
    likeCount: 20,
    curParticipants: 1,
    maxParticipants: 5,
    tags: [1, 2, 3],
  },
];

const SearchMGC = () => {
  return (
    <div className="mt-20pxr">
      <div
        id="input-wrap"
        className="flex h-50pxr flex-row items-center rounded-lg border"
      >
        <Search
          width={20}
          height={20}
          color="gray"
          className="m-10pxr"
        />
        <input
          placeholder="장소를 입력해 주세요."
          className="h-10 w-full text-sm focus:outline-none"
        />
      </div>
      {/* Todo: filter 가져와야 함 [2024/02/13] */}
      {/* Todo: 생성 버튼 가져와야 함 [2024/02/13] */}
      <MGCList data={dummyData}></MGCList>
    </div>
  );
};

export default SearchMGC;
