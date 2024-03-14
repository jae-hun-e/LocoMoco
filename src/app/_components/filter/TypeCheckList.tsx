import React from 'react';
import { Control, ControllerRenderProps } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { SearchFilterForm } from '@/types/searchFilterForm';
import { FilterCategoryList } from './FilterContent';

interface TypeCheckListProps {
  types: FilterCategoryList[];
  control: Control<SearchFilterForm>;
  type: keyof SearchFilterForm;
}

const TypeCheckList = ({ types, control, type }: TypeCheckListProps) => {
  const handleCheckedChange = (
    checked: boolean | 'indeterminate',
    item: number,
    field: ControllerRenderProps<SearchFilterForm, keyof SearchFilterForm>,
  ) => {
    if (item === 0) {
      return checked ? field.onChange([...types.map((type) => type.tagId)]) : field.onChange([]);
    } else {
      if (field.value.includes(0)) {
        return checked
          ? field.onChange([...field.value])
          : field.onChange(field.value?.filter((value) => value !== item && value !== 0));
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
                key={item.tagId}
                control={control}
                name={type}
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.tagId}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.tagId)}
                          onCheckedChange={(checked) =>
                            handleCheckedChange(checked, item.tagId, field)
                          }
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {/* {filtedTextById.find((e) => e.id === item)?.text} */}
                        {item.tagName}
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
