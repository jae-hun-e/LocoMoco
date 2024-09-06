import { useForm } from 'react-hook-form';
import { InquiryReq } from '@/app/mgc/[id]/_hooks/useCreateInquiry';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

interface InquiryFormProps {
  userId: number;
  userImage: string | undefined;
  MGCId: number;
  onSubmitInquiry: (inquiryData: InquiryReq) => void;
  defaultValues?: string;
  inquiryId?: number;
  onClose?: () => void;
}
const InquiryForm = ({
  userId,
  userImage,
  MGCId,
  onSubmitInquiry,
  defaultValues,
  inquiryId,
  onClose,
}: InquiryFormProps) => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<InquiryReq>({
    defaultValues: { content: defaultValues },
  });

  const onSubmit = ({ content }: InquiryReq) => {
    console.log('content', content);
    onSubmitInquiry({ userId, mogakkoId: MGCId, content, inquiryId });
    resetField('content');
    onClose?.();
  };

  return (
    <div className="mb-32pxr">
      <form className="flex w-full items-center gap-11pxr">
        <Avatar className="h-32pxr w-32pxr rounded-full ">
          <AvatarImage
            src={userImage ?? '/oh.png'}
            alt="유저 프로필 이미지"
          />
          <AvatarFallback>
            <Image
              src={'/oh.png'}
              alt={'cn'}
              width={32}
              height={32}
            />
          </AvatarFallback>
        </Avatar>
        <Input
          placeholder="문의 쓰기"
          {...register('content', {
            maxLength: { value: 255, message: '문의 내용은 최대 255글자까지 작성할 수 있습니다.' },
          })}
        />
        <Button
          type="submit"
          variant="secondary"
          className="px-10pxr hover:bg-main-1"
          onClick={handleSubmit(onSubmit)}
        >
          {defaultValues ? '수정' : '문의'}
        </Button>
      </form>
      {errors.content && <span className="text-sm text-red-1">{errors.content.message}</span>}
    </div>
  );
};

export default InquiryForm;
