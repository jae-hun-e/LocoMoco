'use client';

import useMGCList from '@/apis/mgcList/useMGCList';
import MGCList from '@/app/_components/MGCList/MGCList';
import { Search } from 'lucide-react';
import CreateBtn from '../_components/CreateBtn';
import Filter from '../_components/filter/Filter';

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
    <div className="pt-20pxr">
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
          placeholder="제목, 사용자명 또는 장소를 입력해 주세요."
          className="h-10 w-full text-sm focus:outline-none"
        />
      </div>
      <Filter />
      <div className="absolute bottom-50pxr right-24pxr z-30">
        <CreateBtn />
      </div>
      <MGCList data={data ?? []}></MGCList>
    </div>
  );
};

export default SearchMGC;
