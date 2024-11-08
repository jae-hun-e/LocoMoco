import { UseFormWatch } from 'react-hook-form';
import { OpenInfo } from '@/app/search/page';
import { selectionStatus } from '@/constants/categoryFilter';
import useHorizontalScroll from '@/hooks/useHorizontalScroll';
import { cn } from '@/libs/utils';
import { SelectedCategoryData } from '@/types/searchFilterCategory';
import Lightning from '../../../../public/Lightning.svg';
import ArrowDownIcon from '../../../../public/arrow-down.svg';
import LanguageCategory from '../../../../public/language-category-icon.svg';
import Reset from '../../../../public/reset.svg';
import StudyArea from '../../../../public/study-area-icon.svg';
import CategorySelectBtn from './CategorySelectBtn';

interface CategorySelectBtnGroupProps {
  openInfo: OpenInfo;
  type: 'search' | 'map';
  onResetClick: () => void;
  onBtnClick: (buttonType: 'mgcType' | 'language' | 'area') => void;
  watch: UseFormWatch<SelectedCategoryData>;
  isSubmit: boolean;
  categoryName: 'mgcType' | 'language' | 'area' | undefined;
}

const CategorySelectBtnGroup = ({
  openInfo,
  type,
  onResetClick,
  onBtnClick,
  watch,
  categoryName,
  isSubmit,
}: CategorySelectBtnGroupProps) => {
  const { scrollRef, handleDragStart, handleDragMove, handleDragEnd, throttle } =
    useHorizontalScroll();

  const convertCategoriesToText = (type: 'mgcType' | 'language' | 'area') => {
    const arr = watch(type)
      .map((tagInfo) => tagInfo.tagName)
      .filter((tagInfo) => tagInfo !== '전체');

    if (arr.length > 3) {
      const addCount = arr.length - 3;

      return `${arr.slice(0, 3).join('•')} + ${addCount}`;
    } else {
      return arr.join('•');
    }
  };

  const getSelectionStage = (type: 'mgcType' | 'language' | 'area') => {
    const selectedCategoryData = {
      mgcType: watch('mgcType'),
      language: watch('language'),
      area: watch('area'),
    };

    const isCategorySelected = selectedCategoryData[type].length > 0;
    const isCurrentCategoryOpen = categoryName === type && openInfo.isOpen;

    if (isCurrentCategoryOpen && !isCategorySelected) {
      return selectionStatus.IN;
    }

    if (isCategorySelected) {
      return isSubmit ? selectionStatus.SUBMIT : selectionStatus.COMPLETE;
    }

    return selectionStatus.BEFORE;
  };

  return (
    <div
      ref={scrollRef}
      onMouseDown={handleDragStart}
      onMouseMove={throttle(handleDragMove, 100)}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      className="z-50 flex flex-row justify-start gap-10pxr overflow-x-scroll whitespace-nowrap py-8pxr scrollbar-hide"
    >
      {isSubmit ? (
        <button
          onClick={onResetClick}
          className={cn(
            'itmain-1nter flex justify-center rounded-[20px] border border-layer-3 bg-white px-14pxr py-10pxr text-white',
            type === 'map' && 'shadow-md',
          )}
        >
          <div className="h-16pxr w-16pxr">
            <Reset />
          </div>
        </button>
      ) : null}
      <CategorySelectBtn
        name={watch('mgcType').length === 0 ? '모각코 종류' : convertCategoriesToText('mgcType')}
        onClick={() => onBtnClick('mgcType')}
        icon={type === 'map' ? <Lightning /> : <ArrowDownIcon />}
        selectionStep={getSelectionStage('mgcType')}
        catetory="mgcType"
        iconPosition={type === 'map' ? 'left' : 'right'}
        className={type === 'map' && !openInfo.isOpen ? 'shadow-md' : ''}
      />
      <CategorySelectBtn
        name={watch('language').length === 0 ? '개발 언어' : convertCategoriesToText('language')}
        onClick={() => onBtnClick('language')}
        icon={type === 'map' ? <LanguageCategory /> : <ArrowDownIcon />}
        selectionStep={getSelectionStage('language')}
        catetory="language"
        iconPosition={type === 'map' ? 'left' : 'right'}
        className={type === 'map' && !openInfo.isOpen ? 'shadow-md' : ''}
      />
      <CategorySelectBtn
        name={watch('area').length === 0 ? '공부 분야' : convertCategoriesToText('area')}
        onClick={() => onBtnClick('area')}
        icon={type === 'map' ? <StudyArea /> : <ArrowDownIcon />}
        selectionStep={getSelectionStage('area')}
        catetory="area"
        iconPosition={type === 'map' ? 'left' : 'right'}
        className={type === 'map' && !openInfo.isOpen ? 'shadow-md' : ''}
      />
    </div>
  );
};

export default CategorySelectBtnGroup;
