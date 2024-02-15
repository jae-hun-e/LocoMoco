import React from 'react';
import { Control, ControllerRenderProps } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { SearchFilterForm } from '@/types/searchFilterForm';

interface TypeCheckListProps {
  types: string[];
  control: Control<SearchFilterForm>;
  type: keyof SearchFilterForm;
}

const TypeCheckList = ({ types, control, type }: TypeCheckListProps) => {
  const handleCheckedChange = (
    checked: boolean | 'indeterminate',
    item: string,
    field: ControllerRenderProps<SearchFilterForm, keyof SearchFilterForm>,
  ) => {
    if (item === '전체') {
      return checked ? field.onChange([...types]) : field.onChange([]);
    } else {
      if (field.value.includes('전체')) {
        return checked
          ? field.onChange([...field.value])
          : field.onChange(field.value?.filter((value) => value !== item && value !== '전체'));
      } else {
        return checked
          ? field.onChange([...field.value, item])
          : field.onChange(field.value?.filter((value) => value !== item));
      }
    }
  };

  return (
    <div className="overflow-y-auto">
      <FormField
        control={control}
        name={type}
        render={() => (
          <FormItem>
            {types.map((item) => (
              <FormField
                key={item}
                control={control}
                name={type}
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item)}
                          onCheckedChange={(checked) => handleCheckedChange(checked, item, field)}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">{item}</FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TypeCheckList;
