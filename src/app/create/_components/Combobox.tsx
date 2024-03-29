'use client';

import { useState } from 'react';
import { TagType } from '@/apis/mgc/queryFn';
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
  dropdownList: { tag_id: number; tag_name: string }[];
  defaultValue: string;
  placeholder: string;
  onSelected: (selectedValue: TagType) => void;
}

const Combobox = ({ id, defaultValue, dropdownList, placeholder, onSelected }: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const handleSelected = (currentValue: string, tag_id: number) => {
    setValue(currentValue === value ? currentValue : '');
    onSelected({ tag_id, tag_name: currentValue });
    setOpen(false);
  };

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          id={id ?? ''}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? dropdownList.find((dropdownItem) => dropdownItem.tag_name === value)?.tag_name
            : defaultValue}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-300pxr p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>No dropdownItem found.</CommandEmpty>
          <CommandGroup>
            {dropdownList.map(({ tag_id, tag_name }) => (
              <CommandItem
                key={tag_id}
                value={tag_name}
                onSelect={(currentValue) => handleSelected(currentValue, tag_id)}
              >
                <Check
                  className={cn('mr-2 h-4 w-4', value === tag_name ? 'opacity-100' : 'opacity-0')}
                />
                {tag_name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
