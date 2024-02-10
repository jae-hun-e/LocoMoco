'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { SearchFilterForm } from '@/types/searchFilterForm';
import TypeCheckList from './TypeCheckList';

const FilterContent = ({ onSubmit }: { onSubmit: (data: SearchFilterForm) => void }) => {
  const MGCTypes = ['전체', '장소확정', '장소미정', '번개'];
  const languageTypes = ['전체', 'JAVASCRIPT', 'JAVA', 'PYTHON'];
  const studyTypes = ['전체', 'web', 'FE', 'BE'];

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
          <Button
            type="submit"
            className="float-right h-25pxr w-50pxr"
          >
            적용
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FilterContent;
