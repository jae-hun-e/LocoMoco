import { useTagMapStore } from '@/app/_components/CategoryProvider';
import Tag from '@/app/_components/Tag';
import { filterTagsByIds } from '@/utils/filterTagByIds';
import { getCategoryOptions } from '@/utils/getQueryOptions';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  tagIds?: number[];
}
const MGCOptions = ({ tagIds }: Props) => {
  const queryClient = useQueryClient();
  const categoryList = queryClient.getQueryData(getCategoryOptions().queryKey);

  // TODO: 어디서 카테고리 정보 맵핑할 지 좀 더 고민해보기..[24/03/04]
  const tagMapping = new Map();
  categoryList?.slice(1).forEach(({ category_name, tags }) => {
    tags.forEach(({ tag_id, tag_name }) => {
      tagMapping.set(tag_id, { tagName: tag_name, categoryName: category_name });
    });
  });
  const options = filterTagsByIds(tagMapping, tagIds ?? []);

  const tagMap = useTagMapStore((state) => state.tagMap);
  console.log('tagMap', tagMap);
  // const options = filterTagsByIds(tagMap, tagIds ?? []);

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
