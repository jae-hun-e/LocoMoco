import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { category } from '@/constants/categoryFilter';
import { useCategoryList } from '@/hooks/useCategoryList';
import useClickAway from '@/hooks/useClickaway';
import { useTagMapping } from '@/hooks/useTagMapping';
import { cn } from '@/libs/utils';
import useSearchInputValueStore from '@/store/useSearchValueStore';
import { SelectedCategoryData, TagInfo } from '@/types/searchFilterCategory';
import { OpenInfo } from '../search/page';
import CategoryDetailBtnGroup from './SearchBarFilter/CategoryDetailBtnGroup';
import CategorySelectBtnGroup from './SearchBarFilter/CategorySelectBtnGroup';
import SubmitResetGroup from './SearchBarFilter/SubmitResetGroup';

// TODO: 나중에 api로 변경 [24.10.07]
const searchTypes = [
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
  const [categoryName, setCategoryName] = useState<'mgcType' | 'language' | 'area' | undefined>();
  const [isSubmit, setIsSubmit] = useState(false);

  const clickAwayRef = useClickAway<HTMLDivElement>(() =>
    setOpenInfo({ triggerType: 'category', isOpen: false }),
  );

  const { searchValue, setSearchValue } = useSearchInputValueStore();

  const tagMapping = useTagMapping();
  const selectedTags = [...tagMapping]
    .filter((e) => searchValue.tags?.includes(e[0]))
    .map((x) => x[1]);

  const { control, handleSubmit, watch, reset, resetField } = useForm<SelectedCategoryData>({
    defaultValues: {
      mgcType: selectedTags.filter((e) => e.categoryName === '모각코 유형'),
      language: selectedTags.filter((e) => e.categoryName === '개발 언어'),
      area: selectedTags.filter((e) => e.categoryName === '개발 유형'),
      searchType: [],
    },
  });

  const onSubmit = (data: SelectedCategoryData) => {
    const { searchType, ...categoryData } = data;
    const tagInfo = Object.values(categoryData) as TagInfo[][];

    const arr = [] as TagInfo[];
    const filterdAll = arr.concat(...tagInfo).filter((tag) => tag.tagName !== '전체');
    const tagIds = filterdAll.map((tag) => tag.tagId);
    const searchTypeName = searchType[0]?.tagName as 'titleAndContent' | 'nickname' | 'location';

    setSearchValue({ ...searchValue, tags: tagIds, searchType: searchTypeName });

    if (openInfo.triggerType === 'category') {
      setIsSubmit(true);
    }
    setOpenInfo({ triggerType: 'category', isOpen: false });
  };

  const handleBtnClick = (buttonType: 'mgcType' | 'language' | 'area') => {
    setOpenInfo({ ...openInfo, isOpen: true });
    setCategoryName(buttonType);
  };

  const handleResetClick = () => {
    setOpenInfo({ ...openInfo, isOpen: false });
    setSearchValue({ ...searchValue, tags: [] });

    reset();
    setIsSubmit(false);
  };

  const categoryList = useCategoryList(category[categoryName!]);
  const categories = openInfo.triggerType === 'searchType' ? searchTypes : categoryList;

  const isOnlyMgcTypeSelected =
    categoryName !== 'mgcType' &&
    watch('mgcType').length === 1 &&
    watch('mgcType')[0]?.tagName === '번개';

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
        {openInfo.triggerType !== 'searchType' ? (
          <CategorySelectBtnGroup
            openInfo={openInfo}
            type={type}
            onBtnClick={handleBtnClick}
            onResetClick={handleResetClick}
            watch={watch}
            isSubmit={isSubmit}
            categoryName={categoryName}
          />
        ) : null}
        {openInfo.isOpen ? (
          <form
            className="py-20pxr"
            onSubmit={handleSubmit(onSubmit)}
            aria-label="filter content"
          >
            <CategoryDetailBtnGroup
              type={openInfo.triggerType === 'searchType' ? 'radio' : 'checkbox'}
              categories={categories}
              control={control}
              resetField={resetField}
              categoryName={openInfo.triggerType === 'searchType' ? 'searchType' : categoryName}
              isOnlyMgcTypeSelected={isOnlyMgcTypeSelected}
            />
            {isOnlyMgcTypeSelected ? (
              <span className="text-xs text-red-1">
                번개모각코만 선택했을 시 다른 태그들을 선택할 수 없어요
              </span>
            ) : null}
            <SubmitResetGroup onReset={handleResetClick} />
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default SearchBarFilter;
