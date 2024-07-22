import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { selectionStatus } from '@/constants/categoryFilter';
import useSearchInputValueStore from '@/store/useSearchValueStore';
import { SelectedCategoryData, TagInfo } from '@/types/searchFilterCategory';
import Lightning from '../../../../public/Lightning.svg';
import LanguageCategory from '../../../../public/language-category-icon.svg';
import StudyArea from '../../../../public/study-area-icon.svg';
import CategorySelectBtn from './CategorySelectBtn';
import FilterContent from './FilterContent';

interface ButtonSelectionStep {
  mgcType: (typeof selectionStatus)[keyof typeof selectionStatus];
  language: (typeof selectionStatus)[keyof typeof selectionStatus];
  area: (typeof selectionStatus)[keyof typeof selectionStatus];
}

interface CategoryFilterProp {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CategoryFilter = ({ open, setOpen }: CategoryFilterProp) => {
  const { control, handleSubmit, watch, reset } = useForm<SelectedCategoryData>({
    defaultValues: {
      mgcType: [],
      language: [],
      area: [],
    },
  });

  const [btnSelectionData, setBtnSelectionData] = useState<ButtonSelectionStep>({
    mgcType: selectionStatus.BEFORE,
    language: selectionStatus.BEFORE,
    area: selectionStatus.BEFORE,
  });
  const [category, setCategory] = useState<'mgcType' | 'language' | 'area' | undefined>();

  const ChangeBtnColor = useCallback(
    (buttonType?: 'mgcType' | 'language' | 'area') => {
      const selectedCategoryData = {
        mgcType: watch('mgcType'),
        language: watch('language'),
        area: watch('area'),
      };

      for (const dataKey in selectedCategoryData) {
        if (dataKey === buttonType) continue;

        const key = dataKey as 'mgcType' | 'language' | 'area';

        if (selectedCategoryData[key].length > 0) {
          setBtnSelectionData((pev) => ({ ...pev, [key]: selectionStatus.COMPLETE }));
        } else if (selectedCategoryData[key].length === 0) {
          setBtnSelectionData((pev) => ({ ...pev, [key]: selectionStatus.BEFORE }));
        }
      }
    },
    [watch],
  );

  const handleBtnClick = (buttonType: 'mgcType' | 'language' | 'area') => {
    setOpen(true);
    setCategory(buttonType);
    setBtnSelectionData((pev) => ({ ...pev, [buttonType]: selectionStatus.IN }));

    ChangeBtnColor(buttonType);
  };

  const { searchValue, setSearchValue } = useSearchInputValueStore();

  const onSubmit = (data: SelectedCategoryData) => {
    const tagInfo = Object.values(data) as TagInfo[][];

    const arr = [] as TagInfo[];
    const tags = arr.concat(...tagInfo).map((tag) => tag.tagId);

    setSearchValue({ ...searchValue, tags: tags.filter((tagId) => tagId !== 0) });

    setOpen(false);
  };

  const handleResetClick = () => {
    setOpen(false);
    setBtnSelectionData({
      mgcType: selectionStatus.BEFORE,
      language: selectionStatus.BEFORE,
      area: selectionStatus.BEFORE,
    });

    reset();
  };

  const convertCategoriesToText = (type: 'mgcType' | 'language' | 'area') => {
    const arr = watch(type).map((item) => item.tagName);

    if (arr.length > 3) {
      const addCount = arr.length - 3;

      return `${arr.slice(0, 3).join('•')} + ${addCount}`;
    } else {
      return arr.join('•');
    }
  };

  useEffect(() => {
    if (!open) {
      ChangeBtnColor();
    }
  }, [open, ChangeBtnColor]);

  return (
    <>
      <div className="mx-auto flex w-[90%] flex-row justify-between">
        <CategorySelectBtn
          name={watch('mgcType').length === 0 ? '모각코 종류' : convertCategoriesToText('mgcType')}
          onClick={() => handleBtnClick('mgcType')}
          icon={<Lightning />}
          selectionStep={btnSelectionData.mgcType}
        />

        <CategorySelectBtn
          name={watch('language').length === 0 ? '개발 언어' : convertCategoriesToText('language')}
          onClick={() => handleBtnClick('language')}
          icon={<LanguageCategory />}
          selectionStep={btnSelectionData.language}
        />
        <CategorySelectBtn
          name={watch('area').length === 0 ? '공부 분야' : convertCategoriesToText('area')}
          onClick={() => handleBtnClick('area')}
          icon={<StudyArea />}
          selectionStep={btnSelectionData.area}
        />
      </div>
      {open ? (
        <FilterContent
          watch={watch}
          control={control}
          categoryName={category}
          onSubmit={handleSubmit(onSubmit)}
          onReset={handleResetClick}
        />
      ) : null}
    </>
  );
};

export default CategoryFilter;
