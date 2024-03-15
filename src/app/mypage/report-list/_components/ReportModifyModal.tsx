import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Modal from '@/app/_components/Modal';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useThunderModalStore } from '@/store/thunderModalStore';

interface ReportModifyForm {
  content: string;
}

interface ReportModifyModalProps {
  defaultContent: string;
  setContent: (content: string) => void;
  completeModify: () => void;
}

const ReportModifyModal = ({
  defaultContent,
  setContent,
  completeModify,
}: ReportModifyModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<ReportModifyForm>({
    mode: 'onSubmit',
    defaultValues: {
      content: defaultContent,
    },
  });

  useEffect(() => {
    reset({ content: defaultContent });
  }, [defaultContent, reset]);

  useEffect(() => {
    setFocus('content');
  }, [setFocus]);

  const { isOpen, toggleModal } = useThunderModalStore();

  const handleCloseModal = () => {
    reset();
    toggleModal();
  };

  const onSubmit: SubmitHandler<ReportModifyForm> = async ({ content }: ReportModifyForm) => {
    setContent(content);
    handleCloseModal();
    completeModify();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-lg">신고 내용 수정</CardTitle>
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
      </Modal>
    </>
  );
};

export default ReportModifyModal;
