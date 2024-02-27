import React, { useState } from 'react';
import useAddress, { Address } from '@/apis/address/useAddressSearch';
import AddressList from '@/app/(home)/_components/AddressList';
import useClickAway from '@/hooks/useClickaway';
import { Search } from 'lucide-react';

interface LocationSearchInputProps {
  onSelect: (location: string) => void;
}

const LocationSearchInput = ({ onSelect }: LocationSearchInputProps) => {
  const [keyword, setKeyword] = useState('');
  const [show, setShow] = useState(false);

  const { data: address } = useAddress(keyword);

  const handleClickAway = () => {
    setShow(false);
  };

  const clickAwayRef = useClickAway<HTMLDivElement>(handleClickAway);

  const handleAddressClick = (data: Address) => {
    setKeyword(data.address_name);
    onSelect(data.address_name);
    setShow(false);
  };

  return (
    <div className="w-[100%]">
      <div
        ref={clickAwayRef}
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
            value={keyword}
            placeholder="동명(읍, 면)으로 검색(ex. 서초동)."
            className="h-10 w-full text-sm focus:outline-none"
          />
        </div>
        {show && (
          <AddressList
            address={address}
            onClick={handleAddressClick}
          />
        )}
      </div>
    </div>
  );
};

export default LocationSearchInput;
