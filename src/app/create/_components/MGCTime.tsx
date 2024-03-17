import { ChangeEvent, useId, useState } from 'react';
import { UseFormWatch } from 'react-hook-form';
import { MGCCreateForm } from '@/app/create/_components/CreateMGC';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  watch: UseFormWatch<MGCCreateForm>;
  onChangeInput: (key: keyof MGCCreateForm, value: string) => void;
  startErrormessage: string | undefined;
  endErrormessage: string | undefined;
}

const MGCTime = ({ watch, onChangeInput, startErrormessage, endErrormessage }: Props) => {
  const startId = useId();
  const [errorMessage, setErrorMessage] = useState(endErrormessage);

  // TODO: 유효성 체크 오류있음 [24/02/22]
  const handelEndTimeValidation = (e: ChangeEvent<HTMLInputElement>) => {
    const startTime = new Date();
    const endTime = new Date();
    const [hours1, minutes1] = watch('startTime').split(':');
    startTime.setHours(parseInt(hours1, 10), parseInt(minutes1, 10));
    const [hours2, minutes2] = e.currentTarget.value.split(':');
    endTime.setHours(parseInt(hours2, 10), parseInt(minutes2, 10));

    if (startTime > endTime) setErrorMessage('시작시간보다 빠를 수 없습니다.');
    else onChangeInput('endTime', e.currentTarget.value);
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
              onChange={(e) => onChangeInput('startTime', e.currentTarget.value)}
              className="w-100pxr text-xs"
              defaultValue={watch('startTime')}
            />
            {startErrormessage && (
              <span className="absolute top-11 text-xs text-red-1">{startErrormessage}</span>
            )}
          </div>
        </Label>
        <Label className="flex items-center">
          <p className="w-30pxr flex-shrink-0 text-xs">종료</p>
          <div className="relative flex w-full">
            <Input
              type="time"
              step="600"
              onChange={handelEndTimeValidation}
              className="w-100pxr text-xs"
              defaultValue={watch('endTime')}
            />
            {errorMessage && (
              <span className="absolute top-11 text-xs text-red-1">{errorMessage}</span>
            )}
          </div>
        </Label>
      </div>
    </section>
  );
};

export default MGCTime;
