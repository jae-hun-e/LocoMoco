'use client';

import Tag from '@/app/_components/Tag';
import { LanguageTypes, MGCTypes, StudyTypes } from '@/constants/types';
import { formatDistance } from 'date-fns';
import { ko } from 'date-fns/locale';

export interface MGCSummary {
  _id: number;
  title: string;
  location: string;
  createAt: Date;
  hits: number; // 조회 수
  likeCount: number;
  // Todo: 바뀐 데이터 형식에 따라 변경 필요 [2024/02/13]
  category?: undefined;
  currentParticipantsCount: number;
  maxParticipantsCount: number;
  MGCType?: keyof typeof MGCTypes;
  languageTypes?: (keyof typeof LanguageTypes)[];
  studyTypes?: (keyof typeof StudyTypes)[];
}

interface MGCListItemPropsType {
  data: MGCSummary;
}

const MGCListItem = ({ data }: MGCListItemPropsType) => {
  const handleMGCItemClick = () => {
    console.log(data._id);
  };

  const TagsUI = (types: string[] | undefined) => {
    return types && types.map((tagItem, idx) => <Tag key={idx}>{tagItem}</Tag>);
  };

  return (
    <li
      onClick={handleMGCItemClick}
      className="flex w-full flex-col gap-3pxr py-22pxr"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="mr-10pxr font-bold">
            {data.MGCType === MGCTypes.ThunderMGC ? '⚡️ ' : ''}
            {data.title}
          </span>
          <span className="flex items-center">
            {data.MGCType === MGCTypes.LocationNotConfirmed && <Tag theme="gray">장소 미정</Tag>}
          </span>
        </div>
        <span className="font-bold text-main-1">
          참가인원 {data.currentParticipantsCount}/{data.maxParticipantsCount}
        </span>
      </div>
      <div className="text-layer-5">
        {data.location}
        <span className="mx-1">·</span>
        {formatDistance(data.createAt, new Date(), { addSuffix: true, locale: ko })}
        <span className="mx-1">·</span>조회
        {data.hits}
      </div>
      <div className="leading-7">
        {TagsUI(data.languageTypes)}
        {TagsUI(data.studyTypes)}
      </div>
    </li>
  );
};

export default MGCListItem;
