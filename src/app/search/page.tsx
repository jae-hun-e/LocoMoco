'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useMGCTotalList from '@/apis/mgcList/useMGCTotalList';
import { TotalSearchProps } from '@/apis/mgcList/useMGCTotalList';
import MGCList from '@/app/_components/MGCList/MGCList';
import { Search } from 'lucide-react';
import CreateBtn from '../_components/CreateBtn';
import Filter from '../_components/filter/Filter';

type SearchForm = {
  search: string;
};

const SearchMGC = () => {
  const initialSearchParams: TotalSearchProps = { search: '', searchType: 'TOTAL' };

  const [searchParams, setSearchParams] = useState(initialSearchParams);
  const { data } = useMGCTotalList(searchParams);

  const { register, handleSubmit } = useForm<SearchForm>();

  const onSubmit: SubmitHandler<SearchForm> = ({ search }) => {
    console.log(search);
    setSearchParams({ ...searchParams, search: search });
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
            placeholder="제목, 사용자명 또는 장소를 입력해 주세요."
            className="h-10 w-full text-sm focus:outline-none"
            {...register('search', { required: true })}
          />
        </form>
      </div>
      <Filter />
      {/* TODO: Filter의 전송 버튼 클릭 시 현재 search, searchType도 추가해서 API 요청해야 함 [2024/03/05] */}
      <div className="absolute bottom-50pxr right-24pxr z-30">
        <CreateBtn />
      </div>
      <MGCList data={data ?? []}></MGCList>
    </div>
  );
};

export default SearchMGC;
