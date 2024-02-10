import React from 'react';
import { AccordionContent, AccordionTrigger } from '@/components/ui/accordion';
import { SearchFilterForm } from '@/types/searchFilterForm';
import { Accordion, AccordionItem } from '@radix-ui/react-accordion';
import FilterContent from './FilterContent';

const Filter = ({ onSubmit }: { onSubmit: (data: SearchFilterForm) => void }) => {
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
          <AccordionTrigger
            id="qwe"
            className="p-0 hover:no-underline"
          >
            <div className="flex w-full flex-row justify-between gap-1.5">
              <span>모각코 종류</span>
              <span>개발 언어</span>
              <span>공부 분야</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="absolute left-0 z-10 flex w-full justify-center bg-white">
            <FilterContent onSubmit={(data: SearchFilterForm) => onSubmit(data)} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Filter;
