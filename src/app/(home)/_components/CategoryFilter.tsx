import { useState } from 'react';
import { selectionStatus } from '@/constants/categoryFilter';
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

interface SelectedCategoryData {
  mgcType: number[];
  language: number[];
  area: number[];
}

interface CategoryFilterProp {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CategoryFilter = ({ open, setOpen }: CategoryFilterProp) => {
  const [btnSelectionData, setBtnSelectionData] = useState<ButtonSelectionStep>({
    mgcType: selectionStatus.BEFORE,
    language: selectionStatus.BEFORE,
    area: selectionStatus.BEFORE,
  });
  const [category, setCategory] = useState<'mgcType' | 'language' | 'area' | undefined>();
  const [selectedCategoryData] = useState<SelectedCategoryData>({
    mgcType: [],
    language: [],
    area: [],
  });

  const handleBtnClick = (buttonType: 'mgcType' | 'language' | 'area') => {
    setOpen(true);
    setCategory(buttonType);
    setBtnSelectionData((pev) => ({ ...pev, [buttonType]: selectionStatus.IN }));

    for (const dataKey in selectedCategoryData) {
      if (dataKey === buttonType) continue;

      const key = dataKey as 'mgcType' | 'language' | 'area';

      if (selectedCategoryData[key].length > 0) {
        setBtnSelectionData((pev) => ({ ...pev, [key]: selectionStatus.COMPLETE }));
      } else if (selectedCategoryData[key].length === 0) {
        setBtnSelectionData((pev) => ({ ...pev, [key]: selectionStatus.BEFORE }));
      }
    }
  };

  const handleSubmit = () => {
    setOpen(false);
  };

  const handleResetClick = () => {
    setOpen(false);
    setBtnSelectionData({
      mgcType: selectionStatus.BEFORE,
      language: selectionStatus.BEFORE,
      area: selectionStatus.BEFORE,
    });
  };

  return (
    <>
      <div className="mx-auto flex w-[90%] flex-row justify-between">
        <CategorySelectBtn
          name="모각코 종류"
          onClick={() => handleBtnClick('mgcType')}
          icon={<Lightning />}
          selectionStep={btnSelectionData.mgcType}
        />

        <CategorySelectBtn
          name="개발 공부"
          onClick={() => handleBtnClick('language')}
          icon={<LanguageCategory />}
          selectionStep={btnSelectionData.language}
        />
        <CategorySelectBtn
          name="공부 분야"
          onClick={() => handleBtnClick('area')}
          icon={<StudyArea />}
          selectionStep={btnSelectionData.area}
        />
      </div>
      {open ? (
        <FilterContent
          categoryName={category}
          onSubmit={handleSubmit}
          onReset={handleResetClick}
        />
      ) : null}
    </>
  );
};

export default CategoryFilter;
