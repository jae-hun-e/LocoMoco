'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { SearchFilterForm } from '@/types/searchFilterForm';
import { getCategoryOptions } from '@/utils/getQueryOptions';
import { useQueryClient } from '@tanstack/react-query';
import TypeCheckList from './TypeCheckList';

export interface FilterCategoryList {
  tagId: number;
  tagName: string;
  categoryName: string;
}

const FilterContent = ({ onSubmit }: { onSubmit: (data: SearchFilterForm) => void }) => {
  const queryClient = useQueryClient();
  const categoryList = queryClient.getQueryData(getCategoryOptions().queryKey);

  const getFilterList = (categoryName: string) => {
    const categoryData = categoryList?.filter(
      ({ category_name }) => category_name === categoryName,
    );
    const filterCategoryList: FilterCategoryList[] = [];

    categoryData?.forEach(({ category_name, tags }) => {
      tags.forEach(({ tag_id, tag_name }) => {
        filterCategoryList.push({ tagId: tag_id, tagName: tag_name, categoryName: category_name });
      });
    });

    return filterCategoryList;
  };

  const MGCTypes = getFilterList('모각코 유형');
  const languageTypes = getFilterList('개발 언어');
  const studyTypes = getFilterList('개발 유형');

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
