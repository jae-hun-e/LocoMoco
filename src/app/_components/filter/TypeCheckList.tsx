import React from 'react';
import { Control, ControllerRenderProps } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { SearchFilterForm } from '@/types/searchFilterForm';

interface TypeCheckListProps {
  types: number[];
  control: Control<SearchFilterForm>;
  type: keyof SearchFilterForm;
}

// TODO: filted item 백엔드와 결정 후 변경 [24.02.22]
const filtedTextById = [
  { id: 1, text: '전체' },
  { id: 2, text: '번개' },
  { id: 3, text: '장소확정' },
  { id: 4, text: '장소미정' },
  { id: 5, text: 'JAVASCRIPT' },
  { id: 6, text: 'JAVA' },
  { id: 7, text: 'PYTHON' },
  { id: 8, text: 'web' },
  { id: 9, text: 'FE' },
  { id: 10, text: 'BE' },
];

const TypeCheckList = ({ types, control, type }: TypeCheckListProps) => {
  const handleCheckedChange = (
    checked: boolean | 'indeterminate',
    item: number,
    field: ControllerRenderProps<SearchFilterForm, keyof SearchFilterForm>,
  ) => {
    if (item === 1) {
      return checked ? field.onChange([...types]) : field.onChange([]);
    } else {
      if (field.value.includes(1)) {
        return checked
          ? field.onChange([...field.value])
          : field.onChange(field.value?.filter((value) => value !== item && value !== 1));
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
                      <FormLabel className="text-sm font-normal">
                        {filtedTextById.find((e) => e.id === item)?.text}
                      </FormLabel>
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
