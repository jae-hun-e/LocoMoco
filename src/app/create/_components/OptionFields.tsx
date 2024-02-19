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
import { devLanguageList, studyFieldList } from '@/constants/mgcDummyData';

interface Props {
  register: UseFormRegister<MGCCreateForm>;
  setValue: UseFormSetValue<MGCCreateForm>;
  getValues: UseFormGetValues<MGCCreateForm>;
  trigger: UseFormTrigger<MGCCreateForm>;
}

interface ComboBoxMappingProps {
  title: string;
  list: { id: number; value: string; label: string }[];
  field: 'devLanguage' | 'studyField';
}

const comboBoxMapping: ComboBoxMappingProps[] = [
  { title: '개발언어', list: devLanguageList, field: 'devLanguage' },
  { title: '공부분야', list: studyFieldList, field: 'studyField' },
];

const jobList = ['취준생', '현직자', '기타'];
const ageRangeList = [
  { id: 1, value: '10대' },
  { id: 2, value: '20대' },
  { id: 3, value: '30대' },
  { id: 4, value: '40대 이상' },
];

const OptionFields = ({ register, setValue, getValues, trigger }: Props) => {
  const uniqueId = useId();
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
      {/*선택 값 - 개발언어, 공부분야, 현재신분, 원하는 연령대*/}
      {comboBoxMapping.map(({ title, list, field }) => (
        <section
          className="flex items-center"
          key={title}
        >
          <Label
            className="w-100pxr flex-shrink-0"
            htmlFor={`${uniqueId}-${title}`}
          >
            {title}
          </Label>
          <div className="w-full">
            <div className="mb-2">
              {getValues(field)?.map((selected) => (
                <Tag
                  key={selected}
                  onClick={() => handleMultiDeselect(field, selected)}
                  className="inline-flex items-center gap-1"
                >
                  <p>{selected}</p>
                  <p className="text-red-1">x</p>
                </Tag>
              ))}
            </div>

            <Combobox
              id={`${uniqueId}-${title}`}
              dropdownList={list}
              defaultValue="상관없음"
              placeholder={`${title}를 검색해주세요`}
              onSelected={(selected) => handleMultiSelect(field, selected)}
            />
          </div>
        </section>
      ))}

      <section>
        <Label className="w-100pxr flex-shrink-0">현재신분</Label>
        <RadioGroup
          defaultValue={jobList[0]}
          onValueChange={(value) => setValue('job', value)}
          className="mt-4 flex grow flex-wrap justify-between"
        >
          {jobList.map((job) => (
            <div
              className="flex items-center space-x-2"
              key={job}
            >
              <RadioGroupItem
                value={job}
                id={job}
              />
              <Label
                htmlFor={job}
                className="text-xs"
              >
                {job}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </section>

      <section>
        <Label className=" w-100pxr flex-shrink-0">원하는 연령대</Label>
        <CheckboxGroup
          checkBoxList={ageRangeList}
          className="mt-4"
          onSelected={(selected) => handleMultiSelect('ageRange', selected)}
          onDeselected={(deselected) => handleMultiDeselect('ageRange', deselected)}
        />
      </section>

      <section>
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
