import { useEffect } from 'react';
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';
import MGCMap from '@/app/_components/Map/MGCMap';
import { MGCCreateForm } from '@/app/create/_components/CreateMGC';
import MGCDate from '@/app/create/_components/MGCDate';
import MGCTime from '@/app/create/_components/MGCTime';
import { Input } from '@/components/ui/input';
import { Label, labelVariants } from '@/components/ui/label';

interface Props {
  register: UseFormRegister<MGCCreateForm>;
  errors: FieldErrors<MGCCreateForm>;
  setValue: UseFormSetValue<MGCCreateForm>;
  trigger: UseFormTrigger<MGCCreateForm>;
  watch: UseFormWatch<MGCCreateForm>;
  setError: UseFormSetError<MGCCreateForm>;
  clearErrors: UseFormClearErrors<MGCCreateForm>;
}
const RequiredFields = ({
  register,
  errors,
  setValue,
  trigger,
  watch,
  clearErrors,
  setError,
}: Props) => {
  const requiredFields: { field: keyof MGCCreateForm; message: string }[] = [
    { field: 'title', message: '제목을 입력해주세요.' },
    { field: 'date', message: '모각코 날짜를 선택해주세요.' },
    { field: 'startTime', message: '시간을 선택해주세요.' },
    { field: 'endTime', message: '시간을 선택해주세요.' },
    { field: 'deadLine', message: '신청 마감일을 선택해주세요.' },
    { field: 'maxParticipants', message: '참여 인원을 입력해주세요.' },
  ];

  const handleMGCDate = (field: keyof MGCCreateForm, selectedDay: Date) => {
    setValue(field, selectedDay);
    trigger(field);
  };

  useEffect(() => {
    requiredFields.forEach(({ field, message }) => {
      register(field, { required: message });
    });
  }, []);

  return (
    <>
      <input
        className="hidden"
        {...register('location.address', { required: true })}
      />
      <MGCMap
        trigger={trigger}
        setValue={setValue}
        defaultAddress={watch('location.address') ? watch('location') : undefined}
      />

      <section className={labelVariants()}>
        <div className="flex h-10">
          <p className="pr-5pxr">*</p>
          <input
            {...register('title', { required: '제목을 입력해주세요.' })}
            placeholder="모각코 제목을 입력해주세요."
            type="text"
            className="w-full border-b-2 border-layer-3 bg-transparent text-lg font-bold focus:outline-none focus:ring-0"
          />
        </div>
        {errors.title && (
          <span className="ml-12pxr text-xs text-red-1">{errors.title.message}</span>
        )}
      </section>

      <MGCDate
        title="* 모각코 날짜"
        onSelectedDay={(selectedDay) => handleMGCDate('date', selectedDay)}
        errorMessages={errors.date?.message}
        defaultValue={watch('date')}
      />

      <MGCTime
        watch={watch}
        register={register}
        errors={errors}
        setError={setError}
        clearErrors={clearErrors}
      />

      <MGCDate
        title="* 신청 마감일"
        onSelectedDay={(selectedDay) => handleMGCDate('deadLine', selectedDay)}
        endDate={watch('date')}
        errorMessages={errors.deadLine?.message}
        defaultValue={watch('deadLine')}
      />

      <section>
        <Label className="flex items-center">
          <p className="w-100pxr flex-shrink-0">* 참여 인원</p>

          <div className="relative flex w-full">
            <Input
              type="number"
              min="1"
              max="10"
              {...register('maxParticipants', {
                required: true,
                min: { value: 2, message: '최소값은 2입니다.' },
                max: { value: 10, message: '최대값은 10입니다.' },
              })}
            />
            {errors.maxParticipants && (
              <span className="absolute -bottom-5 text-xs text-red-1">
                {errors.maxParticipants.message}
              </span>
            )}
          </div>
        </Label>
      </section>
    </>
  );
};

export default RequiredFields;
