'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/libs/utils';
import { Check, ChevronsUpDown } from 'lucide-react';

interface Props {
  id?: string;
  dropdownList: { value: string; label: string; id: number }[];
  defaultValue: string;
  placeholder: string;
  onSelected: (selectedValue: string) => void;
}

const Combobox = ({ id, defaultValue, dropdownList, placeholder, onSelected }: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const handleSelected = (currentValue: string) => {
    setValue(currentValue === value ? '' : currentValue);
    onSelected(currentValue);
    setOpen(false);
  };

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          id={id || ''}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? dropdownList.find((dropdownItem) => dropdownItem.value === value)?.label
            : defaultValue}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-300pxr p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>No dropdownItem found.</CommandEmpty>
          <CommandGroup>
            {dropdownList.map((dropdownItem) => (
              <CommandItem
                key={dropdownItem.value}
                value={dropdownItem.value}
                onSelect={handleSelected}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === dropdownItem.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {dropdownItem.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
