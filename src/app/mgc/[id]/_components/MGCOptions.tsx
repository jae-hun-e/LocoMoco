import { useMemo } from 'react';
import Tag from '@/app/_components/Tag';
import { filterTagsByIds } from '@/utils/filterTagByIds';
import { getCategoryOptions } from '@/utils/getQueryOptions';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  tagIds?: number[];
}
const MGCOptions = ({ tagIds }: Props) => {
  /* TODO: [24/03/04]
   * 1. 현재 방법으로하면 렌더링은 정상적으로뜨지만 이 페이지 접속할때마다 맵핑이 다시 실행됨
   *   -> useMemo로 감싸서 임시 해결 -> 근본적인 해결은 안됨 다른 모각코 디테일 들어가면 다시 실행됨
   * 2. 아래 방법으로 하면 첫 렌더링 이후 리렌더링 되면서 태그가 뜸
   *   -> Context.Provider + useTagMapStore로 해결 시도 중
   */

  const queryClient = useQueryClient();
  const tagMapping = useMemo(() => {
    const categoryList = queryClient.getQueryData(getCategoryOptions().queryKey);
    const newTagMapping = new Map();
    categoryList?.forEach(({ category_name, tags }) => {
      tags.forEach(({ tag_id, tag_name }) => {
        newTagMapping.set(tag_id, { tagName: tag_name, categoryName: category_name });
      });
    });
    return newTagMapping;
  }, [queryClient]);

  const options = filterTagsByIds(tagMapping, tagIds ?? []);

  return (
    <div className="flex flex-col gap-5pxr">
      {options.map(({ categoryName, tagNames }) => (
        <div
          key={categoryName}
          className="flex gap-10pxr"
        >
          <p className="w-100pxr">{categoryName}</p>
          {tagNames ? (
            <div className="flex gap-10pxr">
              {tagNames.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          ) : (
            <Tag>상관없음</Tag>
          )}
        </div>
      ))}
    </div>
  );
};

export default MGCOptions;
