import React, { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import CategoryFilterSection from '@/app/_components/SearchBarFilter/CategoryFilterSection';
import { OpenInfo } from '@/app/search/page';
import setupRender from '@/libs/test/render';
import useSearchValueStore from '@/store/useSearchValueStore';
import { SelectedCategoryData } from '@/types/searchFilterCategory';
import { screen } from '@testing-library/react';
import categoryList from '../mocks/response/categories.json';

global.ResizeObserver = class MockedResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
};

const Wrapper = ({ children }: { children: ReactNode }) => {
  const formMethods = useForm<SelectedCategoryData>({
    defaultValues: {
      mgcType: [],
      language: [],
      area: [],
    },
  });

  return <FormProvider {...formMethods}>{children}</FormProvider>;
};

const setup = async ({ openInfo, type }: { openInfo: OpenInfo; type: 'map' | 'search' }) => {
  const { user } = await setupRender(
    <Wrapper>
      <CategoryFilterSection
        openInfo={openInfo}
        setOpenInfo={vi.fn()}
        type={type}
      />
    </Wrapper>,
  );
  const mgcTypeBtn = screen.getByRole('button', { name: 'mgcType buttons category' });
  const languageTypeBtn = screen.getByRole('button', { name: 'language buttons category' });
  const areaTypeBtn = screen.getByRole('button', { name: 'area buttons category' });

  return {
    user,
    mgcTypeBtn,
    languageTypeBtn,
    areaTypeBtn,
  };
};

describe('CategoryFilterSection컴포넌트 테스트', () => {
  it('카테고리 버튼을 클릭하지 않으면 필터 카테고리가 나타나지 않는다.', async () => {
    const openInfo: OpenInfo = {
      isOpen: false,
      triggerType: 'category',
    };
    await setup({ openInfo: openInfo, type: 'map' });

    expect(screen.queryByLabelText('filter content')).not.toBeInTheDocument();
  });

  it('모각코 종류 버튼을 클릭하면 모각코 종류 카테고리에 해당하는 버튼들이 나타난다.', async () => {
    const categoryTags = categoryList.data
      .filter((e) => e.category_name === '모각코 유형')
      .flatMap((category) => category.tags);

    const openInfo: OpenInfo = {
      isOpen: true,
      triggerType: 'category',
    };

    const { user, mgcTypeBtn } = await setup({ openInfo: openInfo, type: 'map' });

    await user.click(mgcTypeBtn);

    for (const tag of categoryTags) {
      expect(await screen.findByText(tag.tag_name)).toBeInTheDocument();
    }
  });

  it('개발 언어 버튼을 클릭하면 개발 언어 카테고리에 해당하는 버튼들이 나타난다.', async () => {
    const categoryTags = categoryList.data
      .filter((e) => e.category_name === '개발 언어')
      .flatMap((category) => category.tags);

    const openInfo: OpenInfo = {
      isOpen: true,
      triggerType: 'category',
    };

    const { user, languageTypeBtn } = await setup({ openInfo: openInfo, type: 'map' });

    await user.click(languageTypeBtn);

    for (const tag of categoryTags) {
      expect(await screen.findByText(tag.tag_name)).toBeInTheDocument();
    }
  });

  it('공부 분야 버튼을 클릭하면 공부 분야  카테고리에 해당하는 버튼들이 나타난다.', async () => {
    const categoryTags = categoryList.data
      .filter((e) => e.category_name === '개발 유형')
      .flatMap((category) => category.tags);

    const openInfo: OpenInfo = {
      isOpen: true,
      triggerType: 'category',
    };

    const { user, areaTypeBtn } = await setup({ openInfo: openInfo, type: 'map' });

    await user.click(areaTypeBtn);

    for (const tag of categoryTags) {
      expect(await screen.findByText(tag.tag_name)).toBeInTheDocument();
    }
  });

  it.each([
    { selectedLanguage: 'JS', selectedStudyArea: '코딩테스트', selectedMgcType: '일반' },
    { selectedLanguage: 'Java', selectedStudyArea: 'BE' },
    { selectedStudyArea: '코딩테스트' },
  ])(
    '필터를 선택하면 searchValue의 상태가 변경된다.',
    async ({ selectedLanguage, selectedStudyArea, selectedMgcType }) => {
      const selectedCategory = [selectedLanguage, selectedStudyArea, selectedMgcType];
      const categoryTags = categoryList.data.flatMap((category) => category.tags);

      const selectedTagIds = categoryTags
        .filter((tag) => selectedCategory.includes(tag.tag_name))
        .map((x) => x.tag_id);

      const openInfo: OpenInfo = {
        isOpen: true,
        triggerType: 'category',
      };

      const { user, mgcTypeBtn, languageTypeBtn, areaTypeBtn } = await setup({
        openInfo: openInfo,
        type: 'map',
      });

      await user.click(mgcTypeBtn);
      if (selectedMgcType) await user.click(await screen.findByText(selectedMgcType));

      await user.click(languageTypeBtn);
      if (selectedLanguage) await user.click(await screen.findByText(selectedLanguage));

      await user.click(areaTypeBtn);
      if (selectedStudyArea) await user.click(await screen.findByText(selectedStudyArea));

      await user.click(await screen.findByText('적용하기'));

      const { tags } = useSearchValueStore.getState().searchValue;
      expect(tags!.sort()).toEqual(selectedTagIds.sort());
    },
  );
});
