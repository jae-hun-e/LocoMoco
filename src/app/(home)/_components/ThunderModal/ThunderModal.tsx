import { SubmitHandler, useForm } from 'react-hook-form';
import { useCreateThunderMGC } from '@/apis/thunderMGC/useCreateThunderMGC';
import LocationSearch from '@/app/(home)/_components/ThunderModal/LocationSearch';
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
import { toKoreanTimeZone } from '@/utils/toKoreanTimeZone';

type ThunderFormData = {
  endTime: string;
  title?: string;
  location: string;
};

const ThunderModal = () => {
  const endTimeList = ['1', '2', '3', '5', 'N'];

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm<ThunderFormData>({
    mode: 'onSubmit',
    defaultValues: {
      endTime: '',
      title: '',
      location: '',
    },
  });

  const { createThunderMGC } = useCreateThunderMGC();

  const { isOpen, toggleModal } = useThunderModalStore();

  const handleCloseModal = () => {
    reset();
    toggleModal();
  };

  const onSubmit: SubmitHandler<ThunderFormData> = ({
    endTime,
    title,
    location,
  }: ThunderFormData) => {
    const req = {
      creatorId: 5,
      title: '123',
      location: {
        address: '경기도 부천시 소사로 114번길 5',
        latitude: 31.4295839,
        longitude: 123.123456789,
        city: location,
      },
      startTime: toKoreanTimeZone(new Date()),
      endTime: endTime,
      deadline: toKoreanTimeZone(new Date()),
      maxParticipants: 8,
      content: title,
      tags: [],
    };

    console.log(req);
    createThunderMGC(req);
    handleCloseModal();
  };

  const handleSelectLocation = (location: string) => {
    setValue('location', location);
    trigger('location');
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-lg">⚡️번개 모각코를 생성해요!</CardTitle>
            <CardDescription>생성 즉시 모각코가 시작됩니다.</CardDescription>
          </CardHeader>
          <CardContent className="flex-col">
            <div className="mb-5pxr font-bold">끝나는 시간</div>
            <ul className="grid w-full grid-cols-3 gap-x-4 gap-y-2">
              {endTimeList.map((item) => (
                <li
                  key={item}
                  className="block shrink-0"
                >
                  <input
                    id={`radio-${item}`}
                    type="radio"
                    value={item}
                    {...register('endTime', { required: true })}
                    className="peer hidden"
                  />
                  <label
                    htmlFor={`radio-${item}`}
                    className="flex h-30pxr w-74pxr cursor-pointer items-center justify-center rounded-sm border border-layer-5 text-sm text-layer-6 hover:bg-layer-2 hover:text-gray-600 peer-checked:border-main-1 peer-checked:text-main-1"
                  >
                    +{item}시간
                  </label>
                </li>
              ))}
            </ul>
            {errors.endTime && (
              <span className="text-sm text-red-1">끝나는 시간을 선택해야 합니다.</span>
            )}
            <div className="mb-5pxr mt-15pxr font-bold">제목</div>
            <input
              className="w-full rounded-lg border p-10pxr text-sm focus:outline-none"
              {...register('title')}
              placeholder="글 제목을 입력해주세요 (선택)"
            />
            <div className="mb-5pxr mt-15pxr font-bold">장소</div>
            <LocationSearch onSelect={handleSelectLocation}></LocationSearch>
            <input
              className="hidden"
              {...register('location', { required: true })}
            />
            {errors.location && <span className="text-sm text-red-1">장소를 선택해야 합니다.</span>}
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

export default ThunderModal;
