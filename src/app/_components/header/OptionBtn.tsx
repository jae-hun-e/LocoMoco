'use client';

import { ReactNode } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MoreVerticalIcon } from 'lucide-react';

const OptionBtn = (props: { children?: ReactNode }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>
          <MoreVerticalIcon />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto -translate-x-20pxr px-16pxr py-10pxr">
        {props.children}
      </PopoverContent>
    </Popover>
  );
};

export default OptionBtn;
