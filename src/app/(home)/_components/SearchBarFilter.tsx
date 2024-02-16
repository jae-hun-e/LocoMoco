import React, { useEffect, useState } from 'react';
import useAddress, { Address } from '@/apis/address/useAddressSearch';
import Filter from '@/app/_components/filter/Filter';
import { Search } from 'lucide-react';
import AddressList from './AddressList';

const SearchBarFilter = ({
  changeCenter,
}: {
  changeCenter: (latitude: number, longitude: number) => void;
}) => {
  const [keyword, setKeyword] = useState('');
  const [show, setShow] = useState(false);

  const { data: address } = useAddress(keyword);

  const handleWindowClick = (e: MouseEvent) => {
    if (e.target && e.target instanceof HTMLElement) {
      if (!e.target.closest('#input-container')) {
        setShow(false);
      }
    }
  };

  const handleAddressClick = (data: Address) => {
    changeCenter(Number(data.latitude), Number(data.longitude));
    setShow(false);
  };

  useEffect(() => {
    window.addEventListener('click', (e) => handleWindowClick(e));
    return () => window.removeEventListener('click', handleWindowClick);
  });

  return (
    <div className="w-[90%] pt-20pxr">
      <div
        id="input-container"
        className="relative"
      >
        <div
          id="input-wrap"
          className={`flex h-50pxr flex-row items-center rounded-lg ${show ? 'rounded-b-none' : 'rounded-b-lg'} border`}
        >
          <Search
            width={20}
            height={20}
            color="gray"
            className="m-10pxr"
          />
          <input
            onFocus={() => setShow(true)}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="동명(읍, 면)으로 검색(ex. 서초동)."
            className="h-10 w-full text-sm focus:outline-none"
          />
        </div>
        {show ? (
          <AddressList
            address={address ?? []}
            onClick={handleAddressClick}
          />
        ) : null}
      </div>

      <Filter />
    </div>
  );
};

export default SearchBarFilter;
