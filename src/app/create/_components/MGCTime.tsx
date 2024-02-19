import React, { useId } from 'react';
import { MGCCreateForm } from '@/app/create/page';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  onChangeInput: (key: keyof MGCCreateForm, value: string) => void;
  startErrormessage: string | undefined;
  endErrormessage: string | undefined;
}
const MGCTime = ({ onChangeInput, startErrormessage, endErrormessage }: Props) => {
  const startId = useId();

  return (
    <section className="flex items-center text-sm font-medium">
      <Label
        className="w-100pxr flex-shrink-0"
        htmlFor={startId}
      >
        * 모각코 시간
      </Label>
      <div className="flex grow flex-wrap justify-start gap-4">
        <Label className="flex items-center">
          <p className="w-30pxr flex-shrink-0 text-xs">시작</p>
          <div className="relative flex w-full">
            <Input
              id={startId}
              type="time"
              onChange={(e) => onChangeInput('startTime', e.currentTarget.value)}
            />
            {startErrormessage && (
              <span className="absolute -bottom-5 text-xs text-red-1">{startErrormessage}</span>
            )}
          </div>
        </Label>
        <Label className="flex items-center">
          <p className="w-30pxr flex-shrink-0 text-xs">종료</p>
          <div className="relative flex w-full">
            <Input
              type="time"
              onChange={(e) => onChangeInput('endTime', e.currentTarget.value)}
            />
            {endErrormessage && (
              <span className="absolute -bottom-5 text-xs text-red-1">{endErrormessage}</span>
            )}
          </div>
        </Label>
      </div>
    </section>
  );
};

export default MGCTime;
