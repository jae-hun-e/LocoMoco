import { SubmitHandler, useForm } from 'react-hook-form';
import Modal from '@/app/_components/Modal';
import { Button } from '@/components/ui/button';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useThunderModalStore } from '@/store/thunderModalStore';

const ThunderModal = () => {
  const isOpen = useThunderModalStore((state) => state.isOpen);
  const closeModal = useThunderModalStore((state) => state.closeModal);

  const endTimeList = ['1', '2', '3', '5', 'N'];

  type Inputs = {
    endTime: string;
    title?: string;
    location: string;
  };
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);

    closeModal();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-lg">⚡️번개 모각코를 생성해요!</CardTitle>
            <CardDescription>생성 즉시 모각코가 시작됩니다.</CardDescription>
          </CardHeader>
          <CardContent className="flex-col">
            <div className="mb-5pxr font-bold">끝나는 시간</div>
            <ul className="mb-15pxr grid w-full grid-cols-3 gap-x-8 gap-y-2">
              {endTimeList.map((item) => (
                <li
                  key={item}
                  className="block shrink-0"
                >
                  <input
                    id={`radio-${item}`}
                    type="radio"
                    value={item}
                    {...register('endTime')}
                    className="peer hidden"
                  />
                  <label
                    htmlFor={`radio-${item}`}
                    className="inline-block flex h-30pxr w-84pxr cursor-pointer items-center justify-center rounded-sm border border-layer-5 text-layer-6 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-blue-600"
                  >
                    +{item}시간
                  </label>
                </li>
              ))}
            </ul>

            <input
              className="mb-10pxr w-full p-4pxr"
              // defaultValue="test"
              {...register('title')}
              placeholder="글 제목을 입력해주세요"
            />
            <input
              className="w-full p-4pxr"
              {...register('location', { required: true })}
              placeholder="장소를 입력해주세요"
            />
            {errors.location && <span>This field is required</span>}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={closeModal}
              variant="outline"
            >
              취소
            </Button>
            <Button type="submit">생성</Button>
          </CardFooter>
        </form>
      </Modal>
    </>
  );
};

export default ThunderModal;
