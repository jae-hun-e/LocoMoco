import React from 'react';
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface ReportModifyForm {
  content: string;
}

interface ReportFormProps {
  handleSubmit: UseFormHandleSubmit<ReportModifyForm, ReportModifyForm>;
  register: UseFormRegister<ReportModifyForm>;
  defaultContent: string;
  errors: FieldErrors<ReportModifyForm>;
  handleCloseModal: () => void;
  onSubmit: ({ content }: ReportModifyForm) => void;
  type?: 'update' | 'create';
}

const ReportForm = ({
  handleSubmit,
  register,
  defaultContent,
  errors,
  handleCloseModal,
  onSubmit,
  type = 'update',
}: ReportFormProps) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardHeader>
        <CardTitle className="text-lg">신고 내용 {type === 'update' ? '수정' : ''}</CardTitle>
      </CardHeader>
      <CardContent className="flex-col">
        <Textarea
          className="w-full resize-none rounded-lg border p-10pxr text-sm focus:outline-none"
          {...register('content', {
            required: true,
          })}
          defaultValue={defaultContent}
        />
        {errors.content && <span className="text-sm text-red-1">내용을 입력해야 합니다.</span>}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          type="button"
          onClick={handleCloseModal}
          variant="outline"
          className="border-1pxr w-120pxr border-solid border-main-1 text-main-1 hover:border-hover hover:bg-white hover:text-hover"
        >
          취소
        </Button>
        <Button
          type="submit"
          className="w-120pxr bg-main-1 hover:bg-hover"
        >
          생성
        </Button>
      </CardFooter>
    </form>
  );
};

export default ReportForm;
