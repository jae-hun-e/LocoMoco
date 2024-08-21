'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TagType } from '@/apis/mgc/queryFn';
import { LocationInfo } from '@/apis/mgc/queryFn';
import { useCreateMGC } from '@/apis/mgc/useCreateMGC';
import { MogakkoInfo } from '@/apis/mgc/useGetMGCDetail';
import { usePatchMGC } from '@/apis/mgc/usePatchMGC';
import OptionFields from '@/app/create/_components/OptionFields';
import RequiredFields from '@/app/create/_components/RequiredFields';
import MainStyleButton from '@/components/MainStyleButton';
import { useFilterTagsByIds } from '@/hooks/useFilterTagByIds';
import useCreatedPositionInfo from '@/store/useCreatedPositionInfo';
import { getCategoryOptions } from '@/utils/getQueryOptions';
import { getTimeString } from '@/utils/getTimeString';
import { getItem } from '@/utils/storage';
import { toKoreanTimeZone } from '@/utils/toKoreanTimeZone';
import { useQueryClient } from '@tanstack/react-query';

export interface MGCCreateForm {
  title: string;
  location: LocationInfo;
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
  const { createdPositionInfo } = useCreatedPositionInfo();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
    watch,
    trigger,
    setError,
    clearErrors,
  } = useForm<MGCCreateForm>({
    mode: 'onTouched',
    defaultValues: {
      title: initData?.title,
      location: initData ? initData.location : createdPositionInfo,
      date: initData?.startTime ? new Date(initData?.startTime) : undefined,
      startTime: initData?.startTime && getTimeString(initData?.startTime),
      endTime: initData?.endTime && getTimeString(initData?.endTime),
      deadLine: initData?.endTime
        ? new Date(new Date(initData?.endTime).setHours(0, 0, 0, 0))
        : undefined,
      maxParticipants: initData?.maxParticipants ?? 10,
      content: initData?.content,
    },
  });

  const { createMGC } = useCreateMGC();
  const { patchMGC } = usePatchMGC(MGCId);

  const queryClient = useQueryClient();
  const categoryList = queryClient.getQueryData(getCategoryOptions().queryKey);
  const defaultTags = categoryList
    ?.find(({ category_name }) => category_name === '모각코 유형')
    ?.tags.find(({ tag_name }) => tag_name === '일반')?.tag_id;

  const options = useFilterTagsByIds(initData?.tagIds ?? []);

  const handleBeforeunload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = '';
  };

  useEffect(() => {
    options.map(({ categoryName, tags }) => {
      setValue(
        categoryName as keyof MGCCreateForm,
        tags.map(({ tag_name, tag_id }) => ({ tag_name, tag_id })),
      );
    });
    window.addEventListener('beforeunload', handleBeforeunload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeunload);
    };
  }, [options, setValue]);

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
    tags.push(defaultTags as number);

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
        setError={setError}
        clearErrors={clearErrors}
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
