import { useRef, useState } from 'react';
import useAddress, { Address } from '@/apis/address/useAddressSearch';
import { toast } from '@/components/ui/use-toast';
import { metroGovernments } from '@/constants/metroGovernments';
import useChangeMapCenter from '@/hooks/useChangeMapCenter';
import useClickAway from '@/hooks/useClickaway';
import useGetAddressByCoordinates from '@/hooks/useGetAddressByCoordinates';
import useSearchInputValueStore from '@/store/useSearchValueStore';
import { Search } from 'lucide-react';
import AddressList from './AddressList';

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const [show, setShow] = useState(false);
  const { data: address } = useAddress(keyword);

  const handleClickAway = () => {
    setShow(false);
  };

  const clickAwayRef = useClickAway<HTMLDivElement>(handleClickAway);

  const typingTimer = useRef<NodeJS.Timeout | null>(null);

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (typingTimer.current) {
      clearTimeout(typingTimer.current);
    }

    typingTimer.current = setTimeout(() => {
      setKeyword(value);
    }, 500);
  };

  const { changeCenter } = useChangeMapCenter();
  const { searchValue, setSearchValue } = useSearchInputValueStore();
  const { getAddressByCoorinates } = useGetAddressByCoordinates();

  const changeAddress = async (latitude: number, longitude: number, addressName: string) => {
    const address = await getAddressByCoorinates(latitude, longitude);

    if (!address) {
      toast({
        description: '오류가 발생했습니다.',
      });
      return;
    }

    const isIncluded = Object.keys(metroGovernments).includes(addressName);

    setSearchValue({
      ...searchValue,
      address: isIncluded ? metroGovernments[addressName] : address,
    });
  };

  const handleAddressClick = (data: Address) => {
    const { latitude, longitude, addressName } = data;
    changeCenter(latitude, longitude);
    changeAddress(latitude, longitude, addressName);
    setShow(false);
  };

  return (
    <div
      ref={clickAwayRef}
      id="input-container"
      className="relative mb-8pxr"
    >
      <div
        id="input-wrap"
        className={`flex h-50pxr flex-row items-center rounded-[30px] bg-layer-1 pr-10pxr ${show ? 'rounded-b-none' : 'rounded-[30px]'} border`}
      >
        <Search
          width={20}
          height={20}
          color="gray"
          className="m-10pxr"
        />
        <input
          onFocus={() => setShow(true)}
          onChange={handleKeywordChange}
          placeholder="동명(읍, 면)으로 검색(ex. 서초동)."
          className="h-10 w-full rounded-[30px] text-sm focus:outline-none"
        />
      </div>
      {show && (
        <AddressList
          address={address}
          onClick={handleAddressClick}
        />
      )}
    </div>
  );
};

export default SearchBar;
