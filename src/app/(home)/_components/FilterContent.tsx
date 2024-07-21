import { category } from '@/constants/categoryFilter';
import { getCategoryOptions } from '@/utils/getQueryOptions';
import { useQueryClient } from '@tanstack/react-query';
import Reset from '../../../../public/reset.svg';

interface FilterCategoryList {
  tagId: number;
  tagName: string;
  categoryName: string;
}

interface FilterContentProps {
  categoryName: 'mgcType' | 'language' | 'area' | undefined;
  onSubmit: () => void;
  onReset: () => void;
}

const FilterContent = ({ categoryName, onSubmit, onReset }: FilterContentProps) => {
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

  const categorys = categoryName ? getFilterList(category[categoryName]) : [];

  return (
    <div className="mx-auto w-[90%] py-20pxr">
      <div className="flex gap-1.5 overflow-x-scroll whitespace-nowrap scrollbar-hide">
        {categorys.map((item) => (
          <button
            className="rounded-[30px] border border-layer-3 bg-layer-1 px-20pxr py-9pxr text-sm text-gray-600 xs:text-xs"
            key={item.tagId}
          >
            {item.tagName}
          </button>
        ))}
      </div>

      <div className="mt-20pxr grid grid-cols-[1fr_3fr] gap-7pxr">
        <button
          onClick={onReset}
          className="flex items-center justify-center rounded-[6px] border border-layer-3 bg-white py-10pxr text-white"
        >
          <Reset />
        </button>
        <button
          className=" rounded-[6px] bg-main-1 py-10pxr text-white"
          onClick={onSubmit}
        >
          적용하기
        </button>
      </div>
    </div>
  );
};

export default FilterContent;
