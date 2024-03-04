'use client';

import useMGCList from '@/apis/mgcList/useMGCList';
import MGCList from '@/app/_components/MGCList/MGCList';
import { Search } from 'lucide-react';

const SearchMGC = () => {
  const { data } = useMGCList([]);

  //   {
  //     "id": 53,
  //     "title": "이게 무슨 일이야 이렇게 좋은 날에",
  //     "views": 0,
  //     "likeCount": 0,
  //     "maxParticipants": 2,
  //     "curParticipants": 0,
  //     "location": {
  //         "address": "경기도 부천시 소사로 114번길 5",
  //         "latitude": 31.4295839,
  //         "longitude": 123.123456789,
  //         "city": "소사본동"
  //     },
  //     "tags": [
  //         222,
  //         220,
  //         218,
  //         225,
  //         217
  //     ]
  // }

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
      <MGCList data={data ?? []}></MGCList>
    </div>
  );
};

export default SearchMGC;
