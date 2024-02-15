'use client';

import { AccordionContent, AccordionTrigger } from '@/components/ui/accordion';
import { LanguageTypes, MGCTypes, StudyTypes } from '@/constants/types';
import { SearchFilterForm } from '@/types/searchFilterForm';
import { Accordion, AccordionItem } from '@radix-ui/react-accordion';
import FilterContent from './FilterContent';

const Filter = () => {
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
    <div className="flex h-50pxr w-full flex-row">
      <Accordion
        type="single"
        collapsible
        className="jusify-between flex h-full w-full items-center"
      >
        <AccordionItem
          value="item-1"
          className="w-full"
        >
          <AccordionTrigger className="p-0 hover:no-underline">
            <div className="flex w-full flex-row justify-between gap-1.5">
              <span>모각코 종류</span>
              <span>개발 언어</span>
              <span>공부 분야</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="absolute left-0 z-10 flex w-full justify-center bg-white">
            <FilterContent onSubmit={(data: SearchFilterForm) => handleSubmit(data)} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Filter;
