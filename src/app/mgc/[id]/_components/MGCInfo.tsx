'use client';

import { Badge } from '@/components/ui/badge';
import { LanguageTypes, MGCTypes, StudyTypes } from '@/constants/types';
import { format } from 'date-fns';

interface Props {
  title: string;
  location: string;
  startTime: Date;
  endTime: Date;

  MGCType?: keyof typeof MGCTypes;
  languageTypes?: (keyof typeof LanguageTypes)[];
  studyTypes?: (keyof typeof StudyTypes)[];
  job?: string[];
  ageRange?: number[];
  content?: string;
}

const MGCInfo = (props: Props) => {
  const { title, location, startTime, endTime, languageTypes, job, ageRange, studyTypes, content } =
    props;

  const optionsMapping = [
    { title: '개발 언어', value: languageTypes },
    { title: '공부 분야', value: studyTypes },
    { title: '현재 신분', value: job },
    { title: '원하는 연령대', value: ageRange },
  ];

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
          {optionsMapping.map(({ title, value }) => (
            <div
              key={title}
              className="flex gap-10pxr"
            >
              <p className="w-100pxr">{title}</p>
              {value ? (
                <div className="flex gap-10pxr">
                  {value.map((language) => (
                    <Badge
                      key={language}
                      className="bg-layer-3 font-extralight text-main-2"
                    >
                      {language}
                    </Badge>
                  ))}
                </div>
              ) : (
                <Badge className="bg-layer-3 font-extralight text-main-2">상관없음</Badge>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-10pxr">
        <p>{content || '내용 없음'}</p>
        <div className="mb-10pxr mt-30pxr h-150pxr w-full bg-layer-5">지도</div>
        {/*TODO: 유경이가 PR 머지하고 나면 지도 합치기 [24/02/09]*/}
        <div className="text-sm">장소: {location}</div>
      </div>
    </section>
  );
};

export default MGCInfo;
