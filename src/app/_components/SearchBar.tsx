import { MutableRefObject } from 'react';
import { searchCategory } from '@/constants/categoryFilter';
import { cn } from '@/libs/utils';
import useSearchInputValueStore from '@/store/useSearchValueStore';
import Category from '../../../public/category.svg';
import Search from '../../../public/reading-glasses.svg';
import { OpenInfo } from '../search/page';
import Tag from './Tag';

export interface SearchBarProps {
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  onFocus?: () => void;
  onBlur?: () => void;
  inputRef: MutableRefObject<HTMLInputElement | null>;
  type: 'radius' | 'flat';
  className?: string;
  setOpenInfo?: ({ isOpen, triggerType }: OpenInfo) => void;
  openInfo?: OpenInfo;
}

const SearchBar = ({
  onInputChange,
  placeholder,
  onFocus,
  onBlur,
  inputRef,
  type,
  className,
  setOpenInfo,
  openInfo,
}: SearchBarProps) => {
  const { searchValue, setSearchValue } = useSearchInputValueStore();

  const handleRemoveBtnClick = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }

    setSearchValue({ ...searchValue, searchType: undefined });
  };

  return (
    <div
      id="input-wrap"
      className={cn(
        'flex h-50pxr flex-row items-center bg-layer-1 pr-10pxr text-black-5',
        type === 'flat' ? 'rounded-none border-b' : 'rounded-[30px] border',
        className,
      )}
    >
      <div className={cn('ml-1 mr-10pxr', type === 'radius' && 'ml-15pxr')}>
        <Search />
      </div>
      {type === 'flat' && searchValue.searchType ? (
        <Tag
          className="mr-10pxr h-28pxr px-[0.938rem] py-5pxr text-black-4"
          type="removable"
          onClick={handleRemoveBtnClick}
        >
          {searchCategory[searchValue.searchType]}
        </Tag>
      ) : null}
      <input
        ref={inputRef}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onInputChange}
        placeholder={placeholder}
        className="mr-10pxr h-10 flex-grow  text-sm focus:outline-none"
      />
      {type === 'flat' ? (
        <button
          type="button"
          onClick={() => {
            setOpenInfo?.({ triggerType: 'searchType', isOpen: true });
          }}
          className={cn(
            ' text-black-5',
            (searchValue.searchType || openInfo?.triggerType === 'searchType') && 'text-main-1',
          )}
        >
          <Category />
        </button>
      ) : null}
    </div>
  );
};

export default SearchBar;
