import { Control, Controller, UseFormResetField } from 'react-hook-form';
import CategoryDetailBtn from '@/app/_components/SearchBarFilter/CategoryDetailBtn';
import { category } from '@/constants/categoryFilter';
import useHorizontalScroll from '@/hooks/useHorizontalScroll';
import { SelectedCategoryData } from '@/types/searchFilterCategory';

export interface FilterCategoryList {
  tagId: number;
  tagName: string;
  categoryName: string;
  queryParamerter?: 'titleAndContent' | 'nickname' | 'location';
}

interface CategoryDetailBtnGroupProps {
  categoryName: 'mgcType' | 'language' | 'area' | 'searchType' | undefined;
  control: Control<SelectedCategoryData>;
  resetField: UseFormResetField<SelectedCategoryData>;
  categories: FilterCategoryList[];
  type: 'radio' | 'checkbox';
  isOnlyMgcTypeSelected: boolean;
}

const CategoryDetailBtnGroup = ({
  categoryName,
  control,
  resetField,
  categories,
  type,
  isOnlyMgcTypeSelected,
}: CategoryDetailBtnGroupProps) => {
  const { scrollRef, handleDragStart, handleDragMove, handleDragEnd, throttle } =
    useHorizontalScroll();

  const allSelect = {
    tagId: 1000 + categories[0]?.tagId,
    tagName: '전체',
    categoryName: category[categoryName!],
  };

  return (
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
          {type === 'checkbox' ? (
            <Controller
              key={categoryName}
              control={control}
              render={({ field: { onChange, value } }) => (
                <CategoryDetailBtn
                  category={allSelect}
                  categories={[...categories, allSelect]}
                  onChange={onChange}
                  value={value}
                  disabled={isOnlyMgcTypeSelected}
                  resetField={resetField}
                  type={type}
                />
              )}
              name={categoryName!}
            />
          ) : null}
          {categories.map((category) => (
            <Controller
              key={category.tagId}
              control={control}
              render={({ field: { onChange, value } }) => (
                <CategoryDetailBtn
                  category={category}
                  categories={categories}
                  allSelectTag={allSelect}
                  onChange={onChange}
                  key={category.tagId}
                  value={value}
                  disabled={isOnlyMgcTypeSelected}
                  resetField={resetField}
                  type={type}
                />
              )}
              name={categoryName!}
            />
          ))}
        </>
      ) : null}
    </div>
  );
};

export default CategoryDetailBtnGroup;
