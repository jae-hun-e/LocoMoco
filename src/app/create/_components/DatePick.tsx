'use client';

import { useState } from 'react';
import { SelectSingleEventHandler } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/libs/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

interface Props {
  onSelectedDay?: (day: Date) => void;
  startDate?: Date;
  endDate?: Date;
}
const DatePicker = ({
  onSelectedDay,
  startDate = new Date(new Date().setHours(0, 0, 0, 0)),
  endDate,
}: Props) => {
  const [date, setDate] = useState<Date>();
  const handleSelect: SelectSingleEventHandler = (day) => {
    setDate(day);
    day && onSelectedDay?.(day);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'yyyy-MM-dd') : <span>날짜를 골라주세요.</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          disabled={(date) => !(date > startDate && (!endDate || date <= endDate))}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
export default DatePicker;
