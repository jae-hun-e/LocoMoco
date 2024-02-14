'use client';

import { LanguageTypes, MGCTypes, StudyTypes } from '@/constants/types';
import { SearchFilterForm } from '@/types/searchFilterForm';
import { Search } from 'lucide-react';
import CreateBtn from '../_components/CreateBtn';
import Filter from '../_components/filter/Filter';
import BottomSheet from './_components/BottomSheet';
import Map from './_components/Map';

const Home = () => {
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

  return (
    <div className="relative -left-20pxr w-[100vw]">
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
      <Map />
      <div className="absolute bottom-0 right-24pxr z-30">
        <CreateBtn />
      </div>
      <div className="absolute bottom-0 z-10 w-full rounded-t-xl bg-layer-2">
        <BottomSheet>
          <>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
            <li>테스트</li>
          </>
        </BottomSheet>
      </div>
    </div>
  );
};

export default Home;
