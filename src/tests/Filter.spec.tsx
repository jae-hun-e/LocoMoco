import Filter from '@/app/_components/filter/Filter';
import setupRender from '@/libs/test/render';
import useSearchValueStore from '@/store/useSearchValueStore';
import { screen } from '@testing-library/react';
import categoryList from '../mocks/response/categories.json';

global.ResizeObserver = class MockedResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
};

const setup = async () => {
  const { user } = await setupRender(<Filter />);
  const accordionTriggerButton = screen.getByRole('button', { name: 'accordion trigger' });

  return {
    user,
    accordionTriggerButton,
  };
};

describe('Filter컴포넌트 테스트', () => {
  it('카테고리 트리거를 클릭하지 않으면 필터 카테고리가 나타나지 않는다.', async () => {
    await setup();

    expect(screen.getByLabelText('accordion content')).not.toBeVisible();
  });

  it('카테고리 트리거를 클릭하면 필터 카테고리가 나타난다.', async () => {
    const categoryTags = categoryList.data
      .filter((e) => ['개발 언어', '개발 유형', '모각코 유형'].includes(e.category_name))
      .flatMap((category) => category.tags);

    const { user, accordionTriggerButton } = await setup();

    await user.click(accordionTriggerButton);

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

      const { user, accordionTriggerButton } = await setup();

      await user.click(accordionTriggerButton);
      if (selectedLanguage) await user.click(await screen.findByText(selectedLanguage));
      if (selectedStudyArea) await user.click(await screen.findByText(selectedStudyArea));
      if (selectedMgcType) await user.click(await screen.findByText(selectedMgcType));
      await user.click(await screen.findByText('적용'));

      const { tags } = useSearchValueStore.getState().searchValue;
      expect(tags!.sort()).toEqual(selectedTagIds.sort());
    },
  );
});
