import { useId } from 'react';
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormWatch,
} from 'react-hook-form';
import { MGCCreateForm } from '@/app/create/_components/CreateMGC';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  watch: UseFormWatch<MGCCreateForm>;
  register: UseFormRegister<MGCCreateForm>;
  errors: FieldErrors<MGCCreateForm>;
  setError: UseFormSetError<MGCCreateForm>;
  clearErrors: UseFormClearErrors<MGCCreateForm>;
}

const MGCTime = ({ watch, register, errors, setError, clearErrors }: Props) => {
  const startId = useId();

  const parseTime = (time: string): Date => {
    const date = new Date();

    const [hours, minutes] = time.split(':');
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10));
    return date;
  };

  const endTime = watch('endTime');
  const startTime = watch('startTime');

  const validateTimes = (type: 'start' | 'end'): boolean | string => {
    if (!startTime || !endTime) return true;

    const errorMessage = '종료시간은 시작시간보다 빨리 설정될 수 없습니다.';
    const startDate = parseTime(startTime);
    const endDate = parseTime(endTime);

    if (endDate < startDate) {
      if (type === 'start') {
        setError('endTime', {
          type: 'validate',
          message: errorMessage,
        });
      } else {
        return errorMessage;
      }
    } else if (type === 'start') {
      clearErrors('endTime');
    }

    return true;
  };

  return (
    <section className="flex items-center text-sm font-medium">
      <Label
        className="w-100pxr flex-shrink-0"
        htmlFor={startId}
      >
        * 모각코 시간
      </Label>
      <div className="flex grow flex-wrap justify-start gap-5">
        <Label className="flex items-center">
          <p className="w-30pxr flex-shrink-0 text-xs">시작</p>
          <div className="relative flex w-full">
            <Input
              id={startId}
              type="time"
              step="600"
              {...register('startTime', {
                validate: () => validateTimes('start'),
              })}
              className="w-100pxr text-xs"
              defaultValue={watch('startTime')}
            />
            {errors.startTime && (
              <span className="absolute -bottom-5 text-xs text-red-1">
                {errors.startTime.message}
              </span>
            )}
          </div>
        </Label>
        <Label className="flex items-center">
          <p className="w-30pxr flex-shrink-0 text-xs">종료</p>
          <div className="relative flex w-full">
            <Input
              type="time"
              step="600"
              {...register('endTime', {
                validate: () => validateTimes('end'),
              })}
              className="w-100pxr text-xs"
              defaultValue={watch('endTime')}
            />
            {errors.endTime && (
              <span className="absolute -bottom-5 text-xs text-red-1">
                {errors.endTime.message}
              </span>
            )}
          </div>
        </Label>
      </div>
    </section>
  );
};

export default MGCTime;
