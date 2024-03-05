'use client';

import Tag from '@/app/_components/Tag';
import { MGCTypes } from '@/constants/types';
import { MGCSummary } from '@/types/MGCList';
import { getCategoryOptions } from '@/utils/getQueryOptions';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

// import { formatDistance } from 'date-fns';
// import { ko } from 'date-fns/locale';

interface MGCListItemPropsType {
  data: MGCSummary;
}

const MGCListItem = ({ data }: MGCListItemPropsType) => {
  const router = useRouter();

  const queryClient = useQueryClient();
  const categoryList = queryClient.getQueryData(getCategoryOptions().queryKey)!;

  const MGCTypeTag = categoryList ? categoryList[0].tags : [];
  const tagInfo = categoryList ? [...categoryList[1].tags, ...categoryList[2].tags] : [];

  const handleMGCItemClick = () => {
    console.log(data.id);
    router.push(`/mgc/${data.id}`);
  };

  const TagsUI = (tagIds: number[] | undefined) => {
    return (
      tagIds &&
      tagIds.map((tagId) => {
        const tag = tagInfo.find((tag) => tag.tag_id === tagId);

        return <Tag key={tag?.tag_id}>{tag?.tag_name}</Tag>;
      })
    );
  };

  const thunderMGCId = MGCTypeTag.find((MGCTag) => MGCTag.tag_name === MGCTypes.ThunderMGC)?.tag_id;
  const LocationNotConfirmedId = MGCTypeTag.find(
    (MGCTag) => MGCTag.tag_name === MGCTypes.LocationNotConfirmed,
  )?.tag_id;

  return (
    <li
      onClick={handleMGCItemClick}
      className="flex w-full flex-col gap-3pxr py-22pxr"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="mr-10pxr font-bold">
            {data.tags.includes(thunderMGCId!) ? '⚡️ ' : ''}
            {data.title}
          </span>
          <span className="flex items-center">
            {data.tags.includes(LocationNotConfirmedId!) && <Tag theme="gray">장소 미정</Tag>}
          </span>
        </div>
        <span className="font-bold text-main-1">
          참가인원 {data.curParticipants}/{data.maxParticipants}
        </span>
      </div>
      <div className="text-layer-5">
        {data.location.address}
        <span className="mx-1">·</span>
        {/* TODO: 서버 데이터에 createdAt생기면 Date연산 하기 [24.02.24] */}
        {/* {formatDistance(data.createAt, new Date(), { addSuffix: true, locale: ko })} */}
        {'ex)0시간 전'}
        <span className="mx-1">·</span>조회
        {data.views}
      </div>
      <div className="leading-7">{TagsUI(data.tags)}</div>
    </li>
  );
};

export default MGCListItem;
