'use client';

import { useForm } from 'react-hook-form';
import OptionFields from '@/app/create/_components/OptionFields';
import RequiredFields from '@/app/create/_components/RequiredFields';
import MainStyleButton from '@/components/MainStyleButton';
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

  tags?: string[];
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
      // TODO : 위치 넘겨 받기 || 현재 위치 받아오기
      location: {
        address: '경기도 부천시 소사로 114번길 5',
        latitude: 31.4295839,
        longitude: 123.123456789,
        city: '서초동',
      },
      maxParticipants: 10,
    },
  });

  const handleCreateMGC = (data: MGCCreateForm) => {
    const { title, date, startTime, endTime, deadLine, maxParticipants, content } = data;

    const [newStartTime, newEndTime] = [startTime, endTime].map((time) => {
      const [h, m] = time.split(':').map(Number);
      const newTime = new Date(date);
      newTime.setHours(h);
      newTime.setMinutes(m);
      return toKoreanTimeZone(newTime);
    });

    const res = {
      creatorId: 4,
      title,
      location: {
        address: '경기도 부천시 소사로 114번길 5',
        latitude: 31.4295839,
        longitude: 123.123456789,
        city: '소사본동',
      },
      startTime: newStartTime,
      endTime: newEndTime,
      deadline: toKoreanTimeZone(deadLine),
      maxParticipants,
      content,
      tags: [1, 2, 3],
    };
    console.log('res', res);
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
