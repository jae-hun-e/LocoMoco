'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TagType } from '@/apis/mgc/queryFn';
import { useCreateMGC } from '@/apis/mgc/useCreateMGC';
import { MogakkoInfo } from '@/apis/mgc/useGetMGCDetail';
import { usePatchMGC } from '@/apis/mgc/usePatchMGC';
import OptionFields from '@/app/create/_components/OptionFields';
import RequiredFields from '@/app/create/_components/RequiredFields';
import MainStyleButton from '@/components/MainStyleButton';
import { useFilterTagsByIds } from '@/hooks/useFilterTagByIds';
import { getTimeString } from '@/utils/getTimeString';
import { getItem } from '@/utils/storage';
import { toKoreanTimeZone } from '@/utils/toKoreanTimeZone';

export interface LocationProps {
  address: string;
  latitude: number;
  longitude: number;
  city: string;
}
export interface MGCCreateForm {
  title: string;
  location: LocationProps;
  date: Date | undefined;
  startTime: string;
  endTime: string;
  deadLine: Date | undefined;
  maxParticipants: number;

  content?: string;

  tags?: TagType[];
}

interface Props {
  initData?: MogakkoInfo;
  MGCId?: number;
}
// TODO: 리렌더링 최적화하기 watch -> click시 getValue 검사 [24/02/22]
const CreateMGC = ({ initData, MGCId }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
    watch,
    trigger,
  } = useForm<MGCCreateForm>({
    mode: 'onTouched',
    defaultValues: {
      title: initData?.title,
      location: {
        address: initData?.location.address,
        latitude: initData?.location.latitude,
        longitude: initData?.location.longitude,
        city: initData?.location.city,
      },
      date: initData?.startTime ? new Date(initData?.startTime) : undefined,
      startTime: initData?.startTime && getTimeString(initData?.startTime),
      endTime: initData?.endTime && getTimeString(initData?.endTime),
      deadLine: initData?.startTime ? new Date(initData?.startTime) : undefined,
      maxParticipants: initData?.maxParticipants ?? 10,
      content: initData?.content,
    },
  });

  const { createMGC } = useCreateMGC();
  const { patchMGC } = usePatchMGC(MGCId);

  const options = useFilterTagsByIds(initData?.tagIds ?? []);

  useEffect(() => {
    options.map(({ categoryName, tags }) => {
      setValue(
        categoryName as keyof MGCCreateForm,
        tags.map(({ tag_name, tag_id }) => ({ tag_name, tag_id })),
      );
    });
  }, []);

  const handleMGCRequest = ({
    title,
    date,
    startTime,
    endTime,
    deadLine,
    maxParticipants,
    content,
    location,
    ...rest
  }: MGCCreateForm) => {
    const [newStartTime, newEndTime] = [startTime, endTime].map((time) => {
      const [h, m] = time.split(':').map(Number);

      const newTime = date as Date;
      newTime.setHours(h);
      newTime.setMinutes(m);
      return toKoreanTimeZone(newTime);
    });

    const tags = Object.values(rest).flatMap((v) => v.map((v) => v.tag_id));

    const userId = getItem(localStorage, 'userId');

    const req = {
      creatorId: Number(userId),
      title,
      location,
      startTime: newStartTime,
      endTime: newEndTime,
      deadline: toKoreanTimeZone(deadLine as Date),
      maxParticipants: Number(maxParticipants),
      content,
      tags,
    };

    // //test
    // const req = {
    //   creatorId: Number(userId),
    //   title,
    //   location,
    //   startTime: '2024-03-19T21:44:00.000Z',
    //   endTime: '2024-03-18T21:46:00.000Z',
    //   deadline: '2024-03-19T21:45:00.000Z',
    //   maxParticipants: Number(maxParticipants),
    //   content,
    //   tags,
    // };
    // console.log('req', req);

    MGCId ? patchMGC(req) : createMGC(req);
  };

  return (
    <form className="flex flex-col gap-10">
      <RequiredFields
        register={register}
        errors={errors}
        setValue={setValue}
        trigger={trigger}
        watch={watch}
      />

      <OptionFields
        register={register}
        setValue={setValue}
        getValues={getValues}
        trigger={trigger}
      />

      <div className={'fixed bottom-0 z-50 w-[calc(100%-2.5rem)]'}>
        <MainStyleButton
          content="완료"
          disabled={!isValid}
          onClick={handleSubmit(handleMGCRequest)}
        />
      </div>
    </form>
  );
};

export default CreateMGC;
