import { ChangeEvent } from 'react';
import { UseFormResetField } from 'react-hook-form';
import { cn } from '@/libs/utils';
import { FilterCategoryList, SelectedCategoryData, TagInfo } from '@/types/searchFilterCategory';

interface CategoryCheckboxProps {
  category: FilterCategoryList;
  onChange: (value: TagInfo[]) => void;
  value: TagInfo[];
  disabled?: boolean;
  categories: FilterCategoryList[];
  resetField: UseFormResetField<SelectedCategoryData>;
  allSelectTag?: FilterCategoryList;
  type: 'radio' | 'checkbox';
}

const CategoryDetailBtn = ({
  category,
  onChange,
  value,
  disabled,
  categories,
  resetField,
  allSelectTag,
  type,
}: CategoryCheckboxProps) => {
  const checked = value.map((item) => item.tagId).includes(category.tagId);

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === 'radio') {
      onChange([{ tagId: category.tagId, tagName: category.queryParamerter ?? '' }]);

      return;
    }

    if (category.tagName === '전체') {
      if (e.target.checked) {
        onChange([...categories]);
      } else {
        onChange([]);
      }
      return;
    }

    if (e.target.checked) {
      const filtedTagInfo = [...value, { tagId: category.tagId, tagName: category.tagName }];
      if (filtedTagInfo.length === categories.length) {
        filtedTagInfo.push(allSelectTag!);
      }
      onChange(filtedTagInfo);
    } else {
      const filtedTagInfo = value.filter(
        (val) => val.tagId !== category.tagId && val.tagName !== '전체',
      );
      onChange(filtedTagInfo);

      if (category.categoryName === '모각코 유형') {
        if (filtedTagInfo.length === 1 && filtedTagInfo[0].tagName === '번개') {
          resetField('language');
          resetField('area');
        }
      }
    }
  };

  return (
    <>
      <input
        checked={disabled ? disabled : checked}
        onChange={handleValueChange}
        id={category.tagName}
        type={type}
        name="type"
        value={category.tagId}
        className="hidden"
        disabled={disabled}
      />
      <label
        htmlFor={category.tagName}
        className={cn(
          'rounded-[30px] border border-layer-3 bg-layer-1 px-20pxr py-9pxr text-sm text-gray-600 xs:text-xs',
          checked && 'border border-black-2 font-bold text-black-2',
        )}
      >
        {category.tagName}
      </label>
    </>
  );
};

export default CategoryDetailBtn;
