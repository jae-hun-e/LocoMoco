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

interface Category {
  category_id: number;
  category_name: string;
  input_type: 'COMBOBOX' | 'CHECKBOX' | 'RADIOGROUP';
  tags: {
    tag_id: number;
    tag_name: string;
  }[];
}

export interface FilterCategoryList {
  tagId: number;
  tagName: string;
  categoryName: string;
}

const FilterContent = ({ onSubmit }: { onSubmit: (data: SearchFilterForm) => void }) => {
  const queryClient = useQueryClient();
  const categoryList = queryClient.getQueryData(getCategoryOptions().queryKey);

  const setFilterList = (filterCategoryData?: Category[]) => {
    const filterCategoryList: FilterCategoryList[] = [];

    filterCategoryData?.forEach(({ category_name, tags }) => {
      tags.forEach(({ tag_id, tag_name }) => {
        filterCategoryList.push({ tagId: tag_id, tagName: tag_name, categoryName: category_name });
      });
    });

    return filterCategoryList;
  };

  const allCategory = [
    {
      categoryName: '',
      tagId: 0,
      tagName: '전체',
    },
  ];

  const MGCTypes = setFilterList(
    categoryList?.filter(({ category_name }) => category_name === '모각코 유형'),
  );
  const languageTypes = setFilterList(
    categoryList?.filter(({ category_name }) => category_name === '개발 언어'),
  );
  const studyTypes = setFilterList(
    categoryList?.filter(({ category_name }) => category_name === '개발 유형'),
  );

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
              types={allCategory.concat(MGCTypes)}
              control={form.control}
              type="mgc"
            />
            <TypeCheckList
              types={allCategory.concat(languageTypes)}
              control={form.control}
              type="language"
            />
            <TypeCheckList
              types={allCategory.concat(studyTypes)}
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
