import { SubmitHandler, useForm } from 'react-hook-form';
import useCreateReport from '@/apis/report/useCreateReport';
import Modal from '@/app/_components/Modal';
import ReportForm from '@/app/_components/ReportForm';
import { useThunderModalStore } from '@/store/thunderModalStore';
import useMGCCreateUserId from '@/store/useMGCCreateUserId';
import { USER_ID_KEY, getItem } from '@/utils/storage';

interface ReportModifyForm {
  content: string;
}

const ReportCreateModal = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReportModifyForm>({
    mode: 'onSubmit',
    defaultValues: {
      content: '',
    },
  });

  const { mutate: createReport } = useCreateReport();
  const { createUserId } = useMGCCreateUserId();
  const userId = getItem<string>(localStorage, USER_ID_KEY);

  const { isOpen, toggleModal } = useThunderModalStore();

  const handleCloseModal = () => {
    reset();
    toggleModal();
  };

  const onSubmit: SubmitHandler<ReportModifyForm> = async ({ content }: ReportModifyForm) => {
    createReport({
      reportedId: createUserId,
      reporterId: parseInt(userId!, 10),
      content,
    });
    handleCloseModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
    >
      <ReportForm
        handleSubmit={handleSubmit}
        register={register}
        defaultContent=""
        errors={errors}
        handleCloseModal={handleCloseModal}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};

export default ReportCreateModal;
