'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { SearchFilterForm } from '@/types/searchFilterForm';
import TypeCheckList from './TypeCheckList';

const MGCType = {
  all: 1,
  ThunderMGC: 2,
  LocationConfirmed: 3,
  LocationNotConfirmed: 4,
} as const;

const languageType = {
  all: 1,
  JAVASCRIPT: 5,
  JAVA: 6,
  PYTHON: 7,
} as const;

const studyType = {
  all: 1,
  web: 8,
  FE: 9,
  BE: 10,
} as const;

// const MGCType = {
//   all: {id: 1, text: '전체'},
//   ThunderMGC: {id: 1, text: '번개'},
//   LocationConfirmed: {id: 1, text: '장소확정'},
//   LocationNotConfirmed: {id: 1, text: '장소미정'},
// } as const;

// const languageType = {
//   all: '전체',
//   JAVASCRIPT: 'JAVASCRIPT',
//   JAVA: 'JAVA',
//   PYTHON: 'PYTHON',
// } as const;

// const studyType = {
//   all: '전체',
//   web: 'web',
//   FE: 'FE',
//   BE: 'BE',
// } as const;

const FilterContent = ({ onSubmit }: { onSubmit: (data: SearchFilterForm) => void }) => {
  const MGCTypes = Object.values(MGCType);
  const languageTypes = Object.values(languageType);
  const studyTypes = Object.values(studyType);

  const form = useForm<SearchFilterForm>({
    defaultValues: {
      mgc: [],
      language: [],
      study: [],
    },
  });

  return (
    <div
      id="container"
      className="w-[90%]"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
          id="filter-checkList-content"
        >
          <div className="flex h-120pxr flex-row justify-between pt-10pxr">
            <TypeCheckList
              types={MGCTypes}
              control={form.control}
              type="mgc"
            />
            <TypeCheckList
              types={languageTypes}
              control={form.control}
              type="language"
            />
            <TypeCheckList
              types={studyTypes}
              control={form.control}
              type="study"
            />
          </div>
          <AccordionTrigger
            id="close-accordion"
            className=" flex h-25pxr w-50pxr"
          >
            <Button
              type="submit"
              className="h-25pxr w-50pxr"
            >
              적용
            </Button>
          </AccordionTrigger>
        </form>
      </Form>
    </div>
  );
};

export default FilterContent;
