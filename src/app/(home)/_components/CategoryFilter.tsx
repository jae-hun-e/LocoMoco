import { useState } from 'react';
import Lightning from '../../../../public/Lightning.svg';
import LanguageCategory from '../../../../public/language-category-icon.svg';
import StudyArea from '../../../../public/study-area-icon.svg';
import CategorySelectBtn from './CategorySelectBtn';
import FilterContent from './FilterContent';

export const selectionStatus = {
  BEFORE: 'before',
  IN: 'in',
  COMPLETE: 'complete',
} as const;

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

const CategoryFilter = () => {
  const [open, setOpen] = useState(false);
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

  return (
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
      {open ? (
        <FilterContent
          content={category}
          onSubmit={handleSubmit}
        />
      ) : null}
    </div>
  );
};

export default CategoryFilter;
