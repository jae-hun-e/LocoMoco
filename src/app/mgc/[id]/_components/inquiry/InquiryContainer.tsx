import InquiryForm from '@/app/mgc/[id]/_components/inquiry/InquiryForm';
import { useCreateInquiry } from '@/app/mgc/[id]/_hooks/useCreateInquiry';
import { usePatchInquiry } from '@/app/mgc/[id]/_hooks/usePatchInquiry';

interface InquiryContainerProps {
  userId: number;
  userImage: string | undefined;
  MGCId: number;
  defaultValues?: string;
  inquiryId?: number;
  onClose?: () => void;
}

export const CreateInquiryContainer = (props: InquiryContainerProps) => {
  const { createInquiry } = useCreateInquiry();

  return (
    <InquiryForm
      {...props}
      onSubmitInquiry={createInquiry}
    />
  );
};

export const PatchInquiryContainer = (props: InquiryContainerProps) => {
  const { patchInquiry } = usePatchInquiry();

  return (
    <InquiryForm
      {...props}
      onSubmitInquiry={patchInquiry}
    />
  );
};
