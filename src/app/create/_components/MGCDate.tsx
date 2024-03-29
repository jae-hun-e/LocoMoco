import React from 'react';
import DatePicker from '@/app/create/_components/DatePick';
import { Label } from '@/components/ui/label';

interface Props {
  title: string;
  onSelectedDay: (selectedDay: Date) => void;
  endDate?: Date;
  errorMessages?: string;
  defaultValue?: Date;
}

const MGCDate = ({ title, onSelectedDay, endDate, errorMessages, defaultValue }: Props) => {
  return (
    <section>
      <Label className="flex items-center">
        <p className="w-100pxr flex-shrink-0">{title}</p>
        <div className="relative flex w-full">
          <DatePicker
            onSelectedDay={onSelectedDay}
            endDate={endDate}
            defaultValue={defaultValue}
          />
          {errorMessages && (
            <span className="absolute -bottom-5 text-xs text-red-1">{errorMessages}</span>
          )}
        </div>
      </Label>
    </section>
  );
};

export default MGCDate;
