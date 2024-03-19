import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Modal from '@/app/_components/Modal';
import ReportForm from '@/app/_components/ReportForm';
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
        <ReportForm
          handleSubmit={handleSubmit}
          register={register}
          defaultContent={defaultContent}
          errors={errors}
          handleCloseModal={handleCloseModal}
          onSubmit={onSubmit}
        />
      </Modal>
    </>
  );
};

export default ReportModifyModal;
