import { useId } from 'react';
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';
import Tag from '@/app/_components/Tag';
import CheckboxGroup from '@/app/create/_components/CheckboxGroup';
import Combobox from '@/app/create/_components/Combobox';
import { MGCCreateForm } from '@/app/create/page';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { getCategoryOptions } from '@/utils/getQueryOptions';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  register: UseFormRegister<MGCCreateForm>;
  setValue: UseFormSetValue<MGCCreateForm>;
  getValues: UseFormGetValues<MGCCreateForm>;
  trigger: UseFormTrigger<MGCCreateForm>;
}

const OptionFields = ({ register, setValue, getValues, trigger }: Props) => {
  const uniqueId = useId();
  const queryClient = useQueryClient();
  const categoryList = queryClient.getQueryData(getCategoryOptions().queryKey);

  const handleMultiSelect = (field: keyof MGCCreateForm, selected: string) => {
    if (selected === 'all') {
      setValue(field, []);
      trigger(field);
      return;
    }
    const selectedList = getValues(field) as string[] | undefined;

    setValue(
      field,
      selectedList
        ? selectedList.includes(selected)
          ? selectedList
          : [...selectedList, selected]
        : [selected],
    );

    trigger(field);
  };

  const handleMultiDeselect = (field: keyof MGCCreateForm, deselected: string) => {
    const selectedList = getValues(field) as string[] | undefined;

    if (!selectedList) return;

    const updatedList = selectedList.filter((item) => item !== deselected);
    setValue(field, updatedList);
    trigger(field);
  };

  return (
    <>
      {categoryList?.slice(1).map(({ category_id, category_name, tags, input_type }) => {
        const categoryNameCopy = category_name as keyof MGCCreateForm;

        switch (input_type) {
          case 'COMBOBOX':
            return (
              <section
                className="flex items-center"
                key={category_id}
              >
                <Label
                  className="w-100pxr flex-shrink-0"
                  htmlFor={`${uniqueId}-${category_id}`}
                >
                  {categoryNameCopy}
                </Label>
                <div className="w-full">
                  <div className="mb-2">
                    {(getValues(categoryNameCopy) as string[])?.map((selectedField) => (
                      <Tag
                        key={selectedField}
                        onClick={() => handleMultiDeselect(categoryNameCopy, selectedField)}
                        className="inline-flex items-center gap-1"
                      >
                        <p>{selectedField}</p>
                        <p className="text-red-1">x</p>
                      </Tag>
                    ))}
                  </div>

                  <Combobox
                    id={`${uniqueId}-${category_id}`}
                    dropdownList={tags}
                    defaultValue="상관 없음"
                    placeholder={`${category_name}를 검색해주세요`}
                    onSelected={(selected) => handleMultiSelect(categoryNameCopy, selected)}
                  />
                </div>
              </section>
            );

          case 'CHECKBOX':
            return (
              <section key={category_id}>
                <CheckboxGroup
                  title={categoryNameCopy}
                  checkBoxList={tags}
                  className="mt-4"
                  onSelected={(selected) => handleMultiSelect(categoryNameCopy, selected)}
                  onDeselected={(deselected) => handleMultiDeselect(categoryNameCopy, deselected)}
                />
              </section>
            );

          case 'RADIOGROUP':
            return (
              <section key={category_id}>
                <Label className="w-100pxr flex-shrink-0">현재신분</Label>
                <RadioGroup
                  defaultValue="상관 없음"
                  onValueChange={(value) => setValue(categoryNameCopy, value)}
                  className="mt-4 flex grow flex-wrap justify-around"
                >
                  {tags.map(({ tag_name, tag_id }) => (
                    <div
                      className="flex items-center space-x-2"
                      key={tag_id}
                    >
                      <RadioGroupItem
                        value={tag_name}
                        id={tag_name}
                      />
                      <Label
                        htmlFor={tag_name}
                        className="text-xs"
                      >
                        {tag_name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </section>
            );
        }
      })}

      <section className="mb-2">
        <Label htmlFor="content">
          <p className="mb-4">모각코 내용</p>
          <Textarea
            placeholder="모각코 제목을 입력해주세요"
            {...register('content')}
          />
        </Label>
      </section>
    </>
  );
};

export default OptionFields;
