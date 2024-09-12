import React, { useRef, useState } from 'react';
import useAddress, { Address } from '@/apis/address/useAddressSearch';
import SearchBar from '@/app/_components/SearchBar';
import SearchBarFilter from '@/app/_components/SearchBarFilter';
import { toast } from '@/components/ui/use-toast';
import useChangeMapCenter from '@/hooks/useChangeMapCenter';
import useClickAway from '@/hooks/useClickaway';
import useGetRegionCodeByCoordinates from '@/hooks/useGetRegionCodeByCoordinates';
import useSearchInputValueStore from '@/store/useSearchValueStore';
import AddressList from './AddressList';

const HomeSearchBarFilter = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const typingTimer = useRef<NodeJS.Timeout | null>(null);
  const [keyword, setKeyword] = useState('');
  const [show, setShow] = useState(false);
  const { data: address } = useAddress(keyword);

  const handleKeywordChange = () => {
    if (typingTimer.current) {
      clearTimeout(typingTimer.current);
    }

    typingTimer.current = setTimeout(() => {
      if (inputRef.current) {
        setKeyword(inputRef.current.value);
      }
    }, 500);
  };

  const { getRegionCodeByCoorinates } = useGetRegionCodeByCoordinates();
  const { changeCenter } = useChangeMapCenter();
  const { setSearchValue, searchValue } = useSearchInputValueStore();
  const clickAwayRef = useClickAway<HTMLDivElement>(() => setShow(false));

  const changeAddress = async (latitude: number, longitude: number, addressName: string) => {
    const newRegionCode = await getRegionCodeByCoorinates(latitude, longitude);
    const len = addressName.split(' ').length;

    if (!newRegionCode) {
      toast({
        description: '오류가 발생했습니다.',
      });
      return;
    }

    setSearchValue({
      ...searchValue,
      address: newRegionCode.hCity?.split(' ').slice(0, len).join(' '),
    });
  };

  const handleAddressClick = (data: Address) => {
    const { latitude, longitude, addressName } = data;
    changeCenter(latitude, longitude);
    changeAddress(latitude, longitude, addressName);
    setShow(false);
  };

  return (
    <SearchBarFilter
      type="map"
      renderComponent={() => (
        <div
          ref={clickAwayRef}
          id="input-container"
          className="relative mb-8pxr"
        >
          <SearchBar
            type="radius"
            className={show ? 'rounded-b-none' : ''}
            inputRef={inputRef}
            onInputChange={handleKeywordChange}
            onFocus={() => setShow(true)}
            placeholder="동명(읍, 면)으로 검색(ex. 서초동)"
          />
          {show ? (
            <AddressList
              onClick={handleAddressClick}
              address={address}
            />
          ) : null}
        </div>
      )}
    />
  );
};

export default HomeSearchBarFilter;
