'use client';

import MGCList from '@/app/_components/MGCList/MGCList';
import { dummyData } from '@/constants/mgcListDummy';
import { Search } from 'lucide-react';

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
