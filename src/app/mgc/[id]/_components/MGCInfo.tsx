'use client';

import { LocationInfo } from '@/apis/mgc/queryFn';
import Tag from '@/app/_components/Tag';
import StaticMap from '@/app/mgc/[id]/_components/StaticMap';
import { filterTagsByIds } from '@/utils/filterTagByIds';
import { getCategoryOptions } from '@/utils/getQueryOptions';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

interface Props {
  title: string;
  location: LocationInfo;
  startTime: string;
  endTime: string;

  content?: string;
  tagIds?: number[];
}

const MGCInfo = ({ title, location, startTime, endTime, content, tagIds }: Props) => {
  const queryClient = useQueryClient();
  const categoryList = queryClient.getQueryData(getCategoryOptions().queryKey);

  // TODO: 어디서 카테고리 정보 맵핑할 지 좀 더 고민해보기..[24/03/04]
  // const { tagMap, setTagMap } = useTagStore<Category['data'][0]>();
  const tagMapping = new Map();
  categoryList?.slice(1).forEach(({ category_name, tags }) => {
    tags.forEach(({ tag_id, tag_name }) => {
      tagMapping.set(tag_id, { tagName: tag_name, categoryName: category_name });
    });
  });
  const optionsMapping = filterTagsByIds(tagMapping, tagIds ?? []);

  return (
    <section>
      <p className="my-20pxr text-lg font-bold">{title}</p>
      <div className="mb-10pxr">
        <p>날짜: {format(startTime, 'yyyy. MM. dd')}</p>
        <p>
          시간: {format(startTime, ' HH:mm')} ~ {format(endTime, 'HH:mm')}
        </p>
      </div>

      <div className="mb-30pxr">
        <div className="flex flex-col gap-5pxr">
          {optionsMapping.map(({ categoryName, tagNames }) => (
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
      </div>

      <div className="mb-10pxr">
        <p>{content ?? '내용 없음'}</p>
        <StaticMap location={location} />
      </div>
    </section>
  );
};

export default MGCInfo;

/*
getQueryData
  <TQueryFnData = unknown,
  TTaggedQueryKey extends QueryKey = QueryKey,
  TInferredQueryFnData = TTaggedQueryKey extends DataTag<unknown, infer TaggedValue>
    ? TaggedValue
    : TQueryFnData>
    (queryKey: TTaggedQueryKey): TInferredQueryFnData | undefined;

 */
