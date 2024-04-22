import React, { useCallback, useEffect, useState } from 'react';
import useAddress, { Address } from '@/apis/address/useAddressSearch';
import Filter from '@/app/_components/filter/Filter';
import { toast } from '@/components/ui/use-toast';
import useChangeMapCenter from '@/hooks/useChangeMapCenter';
import useClickAway from '@/hooks/useClickaway';
import useGetAddressByCoordinates from '@/hooks/useGetAddressByCoordinates';
import useCenterPosition from '@/store/useCenterPosition';
import useSearchInputValueStore from '@/store/useSearchValueStore';
import { Search } from 'lucide-react';
import AddressList from './AddressList';

const SearchBarFilter = () => {
  const [keyword, setKeyword] = useState('');
  const [show, setShow] = useState(false);
  const { data: address } = useAddress(keyword);

  const handleClickAway = () => {
    setShow(false);
  };

  const clickAwayRef = useClickAway<HTMLDivElement>(handleClickAway);

  const { setCenterPosition } = useCenterPosition();

  const handleAddressClick = (data: Address) => {
    setCenterPosition({ latitude: Number(data.latitude), longitude: Number(data.longitude) });
    setShow(false);
  };

  const { searchValue, setSearchValue } = useSearchInputValueStore();
  const { getAddressByCoorinates } = useGetAddressByCoordinates();

  const changeAddress = useCallback(
    async (latitude: number, longitude: number) => {
      const address = await getAddressByCoorinates(latitude, longitude);

      if (!address) {
        toast({
          description: '오류가 발생했습니다.',
        });
        return;
      }

      setSearchValue({ ...searchValue, address });
    },
    [getAddressByCoorinates],
  );

  const { changeCenter } = useChangeMapCenter();
  const { centerPosition } = useCenterPosition();

  useEffect(() => {
    const { latitude, longitude } = centerPosition;

    if (latitude !== 0 && longitude !== 0) {
      changeCenter(latitude, longitude);
      changeAddress(latitude, longitude);
    }
  }, [centerPosition, changeCenter, changeAddress]);

  return (
    <div className="w-[90%] pt-20pxr">
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

      <Filter />
    </div>
  );
};

export default SearchBarFilter;
