'use client';

import React from 'react';
import DatePicker from '@/app/create/_components/DatePick';
import { Label } from '@/components/ui/label';

interface Props {
  title: string;
  onSelectedDay: (selectedDay: Date) => void;
  endDate?: Date;
  errorMessages?: string;
}

const MGCDate = ({ title, onSelectedDay, endDate, errorMessages }: Props) => {
  return (
    <section>
      <Label className="flex items-center">
        <p className="w-100pxr flex-shrink-0">{title}</p>
        <div className="relative flex w-full">
          <DatePicker
            onSelectedDay={onSelectedDay}
            endDate={endDate}
          />
          {errorMessages && (
            <span className="absolute -bottom-4 text-xs text-red-600">{errorMessages}</span>
          )}
        </div>
      </Label>
    </section>
  );
};

export default MGCDate;
