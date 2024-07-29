import { Control, UseFormResetField, UseFormWatch } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { category } from '@/constants/categoryFilter';
import useHorizontalScroll from '@/hooks/useHorizontalScroll';
import { SelectedCategoryData } from '@/types/searchFilterCategory';
import { getCategoryOptions } from '@/utils/getQueryOptions';
import { useQueryClient } from '@tanstack/react-query';
import Reset from '../../../../public/reset.svg';
import CategoryCheckbox from './CategoryCheckbox';

export interface FilterCategoryList {
  tagId: number;
  tagName: string;
  categoryName: string;
}

interface FilterContentProps {
  categoryName: 'mgcType' | 'language' | 'area' | undefined;
  onSubmit: () => void;
  onReset: () => void;
  control: Control<SelectedCategoryData>;
  watch: UseFormWatch<SelectedCategoryData>;
  resetField: UseFormResetField<SelectedCategoryData>;
}

const FilterContent = ({
  categoryName,
  onSubmit,
  onReset,
  control,
  watch,
  resetField,
}: FilterContentProps) => {
  const { scrollRef, handleDragStart, handleDragMove, handleDragEnd, throttle } =
    useHorizontalScroll();

  const queryClient = useQueryClient();
  const categoryList = queryClient.getQueryData(getCategoryOptions().queryKey);

  const getFilterList = (categoryName: string) => {
    const categoryData = categoryList?.filter(
      ({ category_name }) => category_name === categoryName,
    );
    const filterCategoryList: FilterCategoryList[] = [];

    categoryData?.forEach(({ category_name, tags }) => {
      tags.forEach(({ tag_id, tag_name }) => {
        filterCategoryList.push({ tagId: tag_id, tagName: tag_name, categoryName: category_name });
      });
    });

    return filterCategoryList;
  };

  const categories = categoryName ? getFilterList(category[categoryName]) : [];

  const allSelect = {
    tagId: 1000 + categories[0]?.tagId,
    tagName: '전체',
    categoryName: category[categoryName!],
  };

  const isOnlyMgcTypeSelected =
    categoryName !== 'mgcType' &&
    watch('mgcType').length === 1 &&
    watch('mgcType')[0]?.tagName === '번개';

  return (
    <form
      className="mx-auto w-[90%] py-20pxr"
      onSubmit={onSubmit}
      aria-label="filter content"
    >
      <div
        ref={scrollRef}
        onMouseDown={handleDragStart}
        onMouseMove={throttle(handleDragMove, 100)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        className="flex gap-1.5 overflow-x-scroll whitespace-nowrap scrollbar-hide"
      >
        {categoryName ? (
          <>
            <Controller
              key={categoryName}
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <CategoryCheckbox
                    category={allSelect}
                    categories={[...categories, allSelect]}
                    onChange={onChange}
                    value={value}
                    disabled={isOnlyMgcTypeSelected}
                    resetField={resetField}
                  />
                </>
              )}
              name={categoryName!}
            />
            {categories.map((category) => (
              <Controller
                key={category.tagId}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <CategoryCheckbox
                      category={category}
                      categories={categories}
                      allSelectTag={allSelect}
                      onChange={onChange}
                      key={category.tagId}
                      value={value}
                      disabled={isOnlyMgcTypeSelected}
                      resetField={resetField}
                    />
                  </>
                )}
                name={categoryName!}
              />
            ))}
          </>
        ) : null}
      </div>

      {isOnlyMgcTypeSelected ? (
        <span className="text-xs text-red-1">
          번개모각코만 선택했을 시 다른 태그들을 선택할 수 없어요
        </span>
      ) : null}
      <div className="mt-20pxr grid grid-cols-[1fr_3fr] gap-7pxr">
        <button
          type="button"
          onClick={onReset}
          className="flex items-center justify-center rounded-[6px] border border-layer-3 bg-white py-10pxr text-white"
        >
          <Reset />
        </button>
        <button
          type="submit"
          className=" rounded-[6px] bg-main-1 py-10pxr text-white"
        >
          적용하기
        </button>
      </div>
    </form>
  );
};

export default FilterContent;
