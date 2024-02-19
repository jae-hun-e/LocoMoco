import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

interface ReviewContentProps {
  checkListTitle: string;
  checkList: string[];
  addTextTitle: string;
  guideText: string;
}

const ReviewContent = ({
  checkListTitle,
  checkList,
  guideText,
  addTextTitle,
}: ReviewContentProps) => {
  return (
    <>
      <section>
        <p className="font-bold ">어떤 점이{checkListTitle}?</p>
        <ul className="mt-13pxr flex flex-col gap-10pxr">
          {checkList.map((checkItem) => (
            <li
              key={checkItem}
              className="flex items-center space-x-2"
            >
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {checkItem}
              </label>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <p className="font-bold ">{addTextTitle}</p>
        <span className="text-xs text-layer-5">{guideText}</span>
        <Textarea
          className="mt-10pxr"
          placeholder="여기에 적어주세요. (선택사항)"
        />
      </section>
    </>
  );
};

export default ReviewContent;
