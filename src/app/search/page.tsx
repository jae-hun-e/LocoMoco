'use client';

import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useMGCTotalList from '@/apis/mgcList/useMGCTotalList';
import MGCList from '@/app/_components/MGCList/MGCList';
import useSearchInputValueStore from '@/store/useSearchValueStore';
import { Search } from 'lucide-react';
import CreateBtn from '../_components/CreateBtn';
import Filter from '../_components/filter/Filter';

type SearchForm = {
  search: string;
};

const SearchMGC = () => {
  const { searchValue, setSearchValue } = useSearchInputValueStore();
  useEffect(() => {
    setSearchValue({ ...searchValue, address: '', tags: [] });
  }, []);

  const { data } = useMGCTotalList({
    search: searchValue.address,
    searchType: 'TOTAL',
    tags: searchValue.tags,
  });

  const { register, handleSubmit } = useForm<SearchForm>();

  const onSubmit: SubmitHandler<SearchForm> = ({ search }) => {
    console.log(search);
    setSearchValue({ ...searchValue, address: search });
  };

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
        <form
          className="w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            placeholder="제목, 사용자명 또는 장소를 두 글자 이상 입력해 주세요."
            className="h-10 w-full text-sm focus:outline-none"
            {...register('search', {
              required: true,
              minLength: 2,
            })}
          />
        </form>
      </div>
      <Filter />
      <div className="fixed bottom-50pxr right-24pxr z-30">
        <CreateBtn />
      </div>
      <MGCList data={data ?? []}></MGCList>
    </div>
  );
};

export default SearchMGC;
