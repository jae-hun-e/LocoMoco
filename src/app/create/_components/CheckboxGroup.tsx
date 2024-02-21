import { useId } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/libs/utils';

interface Props {
  title: string;
  checkBoxList: { id: number; value: string }[];
  onSelected: (checked: string) => void;
  onDeselected: (checked: string) => void;
  className?: string;
}
const CheckboxGroup = ({ title, checkBoxList, className, onSelected, onDeselected }: Props) => {
  const uniqueId = useId();

  return (
    <>
      <Label className=" w-100pxr flex-shrink-0">{title}</Label>
      <div className={cn('flex flex-wrap justify-between', className)}>
        {checkBoxList.map(({ id, value }) => (
          <div
            key={id}
            className="flex items-center gap-1"
          >
            <Checkbox
              id={`${uniqueId}-${value}`}
              onCheckedChange={(checked) => (checked ? onSelected(value) : onDeselected(value))}
            />
            <label
              htmlFor={`${uniqueId}-${value}`}
              className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {value}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};
export default CheckboxGroup;
