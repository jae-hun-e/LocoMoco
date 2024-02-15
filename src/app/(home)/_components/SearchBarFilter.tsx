import Filter from '@/app/_components/filter/Filter';
import { Search } from 'lucide-react';

const SearchBarFilter = () => {
  return (
    <div className="w-[90%] pt-20pxr">
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
      <Filter />
    </div>
  );
};

export default SearchBarFilter;
