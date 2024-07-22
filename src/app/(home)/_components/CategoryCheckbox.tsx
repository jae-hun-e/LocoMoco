import { ChangeEvent } from 'react';
import { cn } from '@/libs/utils';
import { TagInfo } from '@/types/searchFilterCategory';
import { FilterCategoryList } from './FilterContent';

interface CategoryCheckboxProps {
  category: FilterCategoryList;
  onChange: (value: TagInfo[]) => void;
  value: TagInfo[];
  disabled?: boolean;
}

const CategoryCheckbox = ({ category, onChange, value, disabled }: CategoryCheckboxProps) => {
  const checked = value.map((item) => item.tagId).includes(category.tagId);

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      onChange([...value, { tagId: category.tagId, tagName: category.tagName }]);
    } else {
      onChange(value.filter((val) => val.tagId !== category.tagId));
    }
  };

  return (
    <>
      <input
        checked={checked}
        onChange={handleValueChange}
        id={category.tagName}
        type="checkbox"
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
        <span>{category.tagName}</span>
      </label>
    </>
  );
};

export default CategoryCheckbox;
