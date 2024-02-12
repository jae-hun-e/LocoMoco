'use client';

import { useEffect, useRef } from 'react';
import { SearchFilterForm } from '@/types/searchFilterForm';
import { Search } from 'lucide-react';
import CreateBtn from '../_components/CreateBtn';
import Filter from '../_components/filter/Filter';
import BottomSheet from './_components/BottomSheet';

const Home = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  const MGCTypes = {
    ThunderMGC: '번개',
    LocationConfirmed: '장소확정',
    LocationNotConfirmed: '장소미정',
  } as const;

  const LanguageTypes = {
    JAVA: 'JAVA',
    JAVASCRIPT: 'JAVASCRIPT',
    PYTHON: 'PYTHON',
  } as const;

  const StudyTypes = {
    web: 'web',
    FE: 'FE',
    BE: 'BE',
  } as const;

  const DUMMYDATAS = [
    {
      title: '장소미정/BE/자바',
      location: [],
      createdAt: '2023-02-12',
      likeCount: 3,
      studyTypes: [StudyTypes.BE],
      languageTypes: [LanguageTypes.JAVA],
      currentParticipantsCount: 2,
      maxParticipantsCount: 3,
      MGSType: MGCTypes.LocationNotConfirmed,
    },
    {
      title: '장소확정/FE/자스',
      location: [],
      createdAt: '2023-02-12',
      likeCount: 3,
      studyTypes: [StudyTypes.FE],
      languageTypes: [LanguageTypes.JAVASCRIPT],
      currentParticipantsCount: 2,
      maxParticipantsCount: 3,
      MGSType: MGCTypes.LocationConfirmed,
    },
    {
      title: '번개/BE/파이썬',
      location: [],
      createdAt: '2023-02-12',
      likeCount: 3,
      studyTypes: [StudyTypes.BE],
      languageTypes: [LanguageTypes.PYTHON],
      currentParticipantsCount: 2,
      maxParticipantsCount: 3,
      MGSType: MGCTypes.ThunderMGC,
    },
  ];

  const handleSubmit = (data: SearchFilterForm) => {
    const { language, mgc, study } = data;

    const filtedDatas = DUMMYDATAS.filter((data) => {
      const isMGC = mgc.length === 0 || mgc.includes(data.MGSType);
      const isLanguage = data.languageTypes.filter((x) => language.includes(x)).length;
      const isStudy = data.studyTypes.filter((x) => study.includes(x)).length;

      return isMGC && isLanguage && isStudy;
    });

    console.log(filtedDatas);
  };

  useEffect(() => {
    window.kakao.maps.load(function () {
      if (mapRef.current != null) {
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        new window.kakao.maps.Map(mapRef.current, mapOption);
      }
    });
  }, []);

  return (
    <div className="relative">
      <section className="flex w-full flex-col items-center">
        <div className="w-[90%] pt-20pxr">
          <div
            id="input-wrap"
            className="flex h-50pxr flex-row items-center rounded-lg border"
          >
            <Search
              width={20}
              height={20}
              color="gray"
              className="m-10pxr"
            />
            <input
              placeholder="장소를 입력해 주세요."
              className="h-10 w-full text-sm focus:outline-none"
            />
          </div>
          <Filter onSubmit={handleSubmit} />
        </div>
      </section>
      <div
        ref={mapRef}
        className="h-[calc(100svh-3.125rem-7.5rem)] w-full"
      ></div>
      <div className="absolute bottom-0 right-24pxr z-30">
        <CreateBtn />
      </div>

      <div className="absolute bottom-0 z-10 w-full rounded-t-xl bg-layer-2">
        <BottomSheet />
      </div>
    </div>
  );
};

export default Home;
