import { MutableRefObject } from 'react';
import { cn } from '@/libs/utils';
import { Search } from 'lucide-react';

export interface SearchBarProps {
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  onFocus?: () => void;
  onBlur?: () => void;
  inputRef: MutableRefObject<HTMLInputElement | null>;
  type: 'radius' | 'flat';
  className?: string;
}

const SearchBar = ({
  onInputChange,
  placeholder,
  onFocus,
  onBlur,
  inputRef,
  type,
  className,
}: SearchBarProps) => {
  return (
    <div
      id="input-wrap"
      className={cn(
        'flex h-50pxr flex-row items-center bg-layer-1 pr-10pxr',
        type === 'flat' ? 'rounded-none border-b' : 'rounded-[30px] border',
        className,
      )}
    >
      <Search
        width={20}
        height={20}
        color="gray"
        className="m-10pxr"
      />
      <input
        ref={inputRef}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onInputChange}
        placeholder={placeholder}
        className="mr-10pxr h-10 w-full text-sm focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
