import { useRef, useState } from 'react';
import { MouseEvent } from 'react';
import { Control, UseFormResetField, UseFormWatch } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { category } from '@/constants/categoryFilter';
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
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

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

  const handleDragStart = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.clientX);
  };

  const timer = useRef<NodeJS.Timeout | null>(null);

  const throttle = (callback: (e: MouseEvent<HTMLDivElement>) => void, delayTime: number) => {
    return (e: MouseEvent<HTMLDivElement>) => {
      if (timer.current) return;
      timer.current = setTimeout(() => {
        callback(e);
        timer.current = null;
      }, delayTime);
    };
  };

  const handleDragMove = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!isDrag || !scrollRef.current) return;

    const maxScrollLeft = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    const newScrollLeft = scrollRef.current.scrollLeft + startX - e.clientX;

    if (
      (scrollRef.current.scrollLeft === 0 && newScrollLeft < 0) ||
      (Math.floor(scrollRef.current.scrollLeft) === Math.floor(maxScrollLeft) &&
        newScrollLeft > maxScrollLeft)
    ) {
      return;
    }

    if (newScrollLeft >= -50 && newScrollLeft <= maxScrollLeft + 50) {
      scrollRef.current.scrollLeft = newScrollLeft;
    }
  };

  const handleDragEnd = () => {
    setIsDrag(false);
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
