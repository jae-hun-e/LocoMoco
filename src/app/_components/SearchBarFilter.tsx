import { ReactNode } from 'react';
import useClickAway from '@/hooks/useClickaway';
import { cn } from '@/libs/utils';
import { FilterCategoryList } from '@/types/searchFilterCategory';
import { OpenInfo } from '../search/page';
import CategoryFilterSection from './SearchBarFilter/CategoryFilterSection';

// TODO: 나중에 api로 변경 [24.10.07]
export const searchTypes: FilterCategoryList[] = [
  {
    tagId: 1,
    tagName: '제목+내용',
    categoryName: '검색어 유형',
    queryParamerter: 'titleAndContent',
  },
  {
    tagId: 2,
    tagName: '닉네임',
    categoryName: '검색어 유형',
    queryParamerter: 'nickname',
  },
  {
    tagId: 3,
    tagName: '장소',
    categoryName: '검색어 유형',
    queryParamerter: 'location',
  },
];

export interface SearchBarFilterProps {
  renderComponent: () => ReactNode;
  type: 'search' | 'map';
  openInfo: OpenInfo;
  setOpenInfo: ({ isOpen, triggerType }: OpenInfo) => void;
}

const SearchBarFilter = ({
  renderComponent,
  type,
  openInfo,
  setOpenInfo,
}: SearchBarFilterProps) => {
  const clickAwayRef = useClickAway<HTMLDivElement>(() =>
    setOpenInfo({ triggerType: 'category', isOpen: false }),
  );

  return (
    <div className={cn('h-0 w-full', openInfo.isOpen && 'h-[100svh] bg-shadow')}>
      <div
        ref={clickAwayRef}
        className={cn(
          'w-full rounded-b-[30px] pt-20pxr',
          openInfo.isOpen && 'bg-layer-1',
          type === 'search' ? 'bg-layer-1 px-20pxr' : 'px-[5%]',
        )}
      >
        {renderComponent()}
        <CategoryFilterSection
          openInfo={openInfo}
          setOpenInfo={setOpenInfo}
          type={type}
        />
      </div>
    </div>
  );
};

export default SearchBarFilter;
