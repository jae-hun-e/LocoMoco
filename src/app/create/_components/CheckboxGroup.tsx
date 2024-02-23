import { useId } from 'react';
import { ComboboxType } from '@/app/create/page';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/libs/utils';

interface Props {
  title: string;
  checkBoxList: ComboboxType[];
  onSelected: (checked: ComboboxType) => void;
  onDeselected: (checked: number) => void;
  className?: string;
}

const CheckboxGroup = ({ title, checkBoxList, className, onSelected, onDeselected }: Props) => {
  const uniqueId = useId();

  return (
    <>
      <Label className=" w-100pxr flex-shrink-0">{title}</Label>
      <div className={cn('flex flex-wrap justify-between', className)}>
        {checkBoxList.map(({ tag_id, tag_name }) => (
          <div
            key={`${uniqueId}-${tag_id}`}
            className="flex items-center gap-1"
          >
            <Checkbox
              id={`${uniqueId}-${tag_name}`}
              onCheckedChange={(checked) =>
                checked ? onSelected({ tag_id, tag_name }) : onDeselected(tag_id)
              }
            />
            <label
              htmlFor={`${uniqueId}-${tag_name}`}
              className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {tag_name}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};
export default CheckboxGroup;
