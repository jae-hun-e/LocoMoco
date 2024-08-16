import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LocationInfo } from '@/apis/mgc/queryFn';
import { useCreateThunderMGC } from '@/apis/thunderMGC/useCreateThunderMGC';
import MGCMap from '@/app/_components/Map/MGCMap';
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
import useCreatedPositionInfo from '@/store/useCreatedPositionInfo';
import { getItem } from '@/utils/storage';
import { toKoreanTimeZone } from '@/utils/toKoreanTimeZone';

export interface ThunderFormData {
  endTime: string;
  title: string;
  location: LocationInfo;
}

const ThunderModalContent = ({
  initialPosition,
}: {
  initialPosition?: LocationInfo | undefined;
}) => {
  const endTimeList = ['1', '2', '3', '5', 'N'];

  let userId: string | undefined;
  if (typeof window !== 'undefined') {
    userId = getItem<string | undefined>(localStorage, 'userId');
  }

  const { createdPositionInfo, setCreatedPositionInfo } = useCreatedPositionInfo();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    watch,
    formState: { errors },
  } = useForm<ThunderFormData>({
    mode: 'onSubmit',
    defaultValues: {
      endTime: '',
      title: '',
      location: {
        address: initialPosition?.address || undefined,
        latitude: initialPosition?.latitude || undefined,
        longitude: initialPosition?.longitude || undefined,
        city: initialPosition?.city || undefined,
        hCity: initialPosition?.hCity || undefined,
      },
    },
  });

  useEffect(() => {
    const location = {
      address: createdPositionInfo.address,
      latitude: createdPositionInfo.latitude,
      longitude: createdPositionInfo.longitude,
      city: createdPositionInfo.city,
      hCity: createdPositionInfo.hCity,
    };

    setValue('location', location);
    trigger('location');
  }, [createdPositionInfo, setValue, trigger]);

  const { createThunderMGC } = useCreateThunderMGC();

  const { isOpen, toggleModal } = useThunderModalStore();

  const handleCloseModal = () => {
    setCreatedPositionInfo({
      address: '',
      latitude: 0,
      longitude: 0,
      city: '',
      hCity: '',
    });
    reset();
    toggleModal();
  };

  const onSubmit: SubmitHandler<ThunderFormData> = async ({
    endTime,
    title,
    location,
  }: ThunderFormData) => {
    const currentDate = new Date();
    const endDate = new Date(currentDate);
    const hour = endTime === 'N' ? 12 : Number(endTime);
    endDate.setHours(currentDate.getHours() + hour);

    const req = {
      creatorId: Number(userId),
      title: title ? title : '번개 모각코에 참여하세요!',
      location,
      startTime: toKoreanTimeZone(currentDate),
      endTime: toKoreanTimeZone(endDate),
      deadline: toKoreanTimeZone(endDate),
      maxParticipants: 10,
      content: title,
      tags: [243],
    };

    createThunderMGC(req);
    handleCloseModal();
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
            <input
              className="hidden"
              {...register('location.address', { required: true })}
            />
            <div className="mb-5pxr mt-15pxr font-bold">장소</div>
            <MGCMap
              trigger={trigger}
              setValue={setValue}
              defaultAddress={watch('location.address') ? watch('location') : undefined}
            />
            {errors.location?.address && (
              <span className="text-sm text-red-1">장소를 선택해야 합니다.</span>
            )}
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

export default ThunderModalContent;
