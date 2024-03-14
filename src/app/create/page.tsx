'use client';

import { useForm } from 'react-hook-form';
import { TagType } from '@/apis/mgc/queryFn';
import { useCreateMGC } from '@/apis/mgc/useCreateMGC';
import OptionFields from '@/app/create/_components/OptionFields';
import RequiredFields from '@/app/create/_components/RequiredFields';
import MainStyleButton from '@/components/MainStyleButton';
import { getItem } from '@/utils/storage';
import { toKoreanTimeZone } from '@/utils/toKoreanTimeZone';

export interface MGCCreateForm {
  title: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
    city: string;
  };
  date: Date;
  startTime: string;
  endTime: string;
  deadLine: Date;
  maxParticipants: number;

  content?: string;

  tags?: TagType[];
}

// TODO: 리렌더링 최적화하기 watch -> click시 getValue 검사 [24/02/22]
const CreateMGC = () => {
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
      title: '',
      maxParticipants: 10,
    },
  });

  const { createMGC } = useCreateMGC();

  const handleCreateMGC = ({
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
      const newTime = new Date(date);
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
      deadline: toKoreanTimeZone(deadLine),
      maxParticipants: Number(maxParticipants),
      content,
      tags,
    };

    createMGC(req);
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
          onClick={handleSubmit(handleCreateMGC)}
        />
      </div>
    </form>
  );
};

export default CreateMGC;
