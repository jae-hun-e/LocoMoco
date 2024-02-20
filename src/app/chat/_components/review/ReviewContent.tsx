import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { ReviewForm } from './Review';

interface CheckItem {
  id: number;
  content: string;
}

interface ReviewContentProps {
  checkListTitle: string;
  checkList: CheckItem[];
  addTextTitle: string;
  guideText: string;
  register: UseFormRegister<ReviewForm>;
  onSelected: (selected: number) => void;
  onDeselected: (deselected: number) => void;
  errors: FieldErrors<ReviewForm>;
}

const ReviewContent = ({
  checkListTitle,
  checkList,
  guideText,
  addTextTitle,
  register,
  onSelected,
  onDeselected,
  errors,
}: ReviewContentProps) => {
  return (
    <>
      <section className="relative">
        <p className="font-bold ">어떤 점이{checkListTitle}?</p>
        <ul className="mt-13pxr flex flex-col gap-10pxr">
          {checkList.map(({ content, id }) => (
            <li
              key={id}
              className="flex items-center space-x-2"
            >
              <Checkbox
                id={`${checkList}-${id}`}
                onCheckedChange={(checked) => {
                  checked ? onSelected(id) : onDeselected(id);
                }}
              />
              <label
                htmlFor={`${checkList}-${id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {content}
              </label>
            </li>
          ))}
        </ul>
        {errors?.reviewOptions && (
          <span className="absolute -bottom-5 text-xs text-red-500">
            {errors.reviewOptions.message}
          </span>
        )}
      </section>
      <section className="relative">
        <p className="font-bold ">{addTextTitle}</p>
        <span className="text-xs text-layer-5">{guideText}</span>
        <Textarea
          {...register('reviewContent', {
            maxLength: { value: 300, message: '입력가능한 글자수는 300자입니다.' },
          })}
          className="mt-10pxr"
          placeholder="여기에 적어주세요. (선택사항)"
        />
        {errors?.reviewContent && (
          <span className="absolute -bottom-5 text-xs text-red-500">
            {errors.reviewContent.message}
          </span>
        )}
      </section>
    </>
  );
};

export default ReviewContent;
