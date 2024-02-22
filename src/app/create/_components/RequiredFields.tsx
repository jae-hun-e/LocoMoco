import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';
import MGCDate from '@/app/create/_components/MGCDate';
import MGCTime from '@/app/create/_components/MGCTime';
import { MGCCreateForm } from '@/app/create/page';
import { Input } from '@/components/ui/input';
import { Label, labelVariants } from '@/components/ui/label';

interface Props {
  register: UseFormRegister<MGCCreateForm>;
  errors: FieldErrors<MGCCreateForm>;
  setValue: UseFormSetValue<MGCCreateForm>;
  trigger: UseFormTrigger<MGCCreateForm>;
  watch: UseFormWatch<MGCCreateForm>;
}
const RequiredFields = ({ register, errors, setValue, trigger, watch }: Props) => {
  const requiredFields: { field: keyof MGCCreateForm; message: string }[] = [
    { field: 'title', message: '제목을 입력해주세요.' },
    { field: 'date', message: '모각코 날짜를 선택해주세요.' },
    { field: 'startTime', message: '시작시간을 선택해주세요.' },
    { field: 'endTime', message: '종료시간을 선택해주세요.' },
    { field: 'deadLine', message: '신청 마감일을 선택해주세요.' },
    { field: 'maxParticipants', message: '참여 인원을 입력해주세요.' },
  ];
  requiredFields.forEach(({ field, message }) => {
    register(field, { required: message });
  });

  const handleMGCDate = (field: keyof MGCCreateForm, selectedDay: Date) => {
    setValue(field, selectedDay);
    trigger(field);
  };

  const handleMGCTime = (field: keyof MGCCreateForm, value: string) => {
    setValue(field, value);
    trigger(field);
  };

  return (
    <>
      {/*필수 값 - 장소, 날짜/시간, 신청 종류시간, 신청기한 */}
      {/*TODO: 유경이가 PR 머지하고 나면 지도 합치기 [24/02/15]*/}
      <section
        className="mb-10pxr h-150pxr w-full bg-layer-5"
        // ref={mapRef}
      />

      <section className={labelVariants()}>
        <input
          {...register('title', { required: '제목을 입력해주세요.' })}
          placeholder="모각코 제목을 입력해주세요."
          type="text"
          className="h-10 w-full border-b-2 border-layer-3 bg-transparent text-lg font-bold focus:outline-none focus:ring-0"
        />
        {errors.title && <span className="text-xs text-red-1">{errors.title.message}</span>}
      </section>

      <MGCDate
        title="* 모각코 날짜"
        onSelectedDay={(selectedDay) => handleMGCDate('date', selectedDay)}
        errorMessages={errors.date?.message}
      />

      <MGCTime
        onChangeInput={handleMGCTime}
        startErrormessage={errors.startTime?.message}
        endErrormessage={errors.endTime?.message}
        watch={watch}
      />

      <MGCDate
        title="* 신청 마감일"
        onSelectedDay={(selectedDay) => handleMGCDate('deadLine', selectedDay)}
        endDate={watch('date')}
        errorMessages={errors.deadLine?.message}
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
