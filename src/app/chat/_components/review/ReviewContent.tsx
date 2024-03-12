import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { ReviewForm } from './Review';

interface ReviewContentProps {
  selectedRating: number;
  register: UseFormRegister<ReviewForm>;
  onSelected: (selected: number) => void;
  onDeselected: (deselected: number) => void;
  errors: FieldErrors<ReviewForm>;
}

const ReviewContent = ({
  selectedRating,
  register,
  onSelected,
  onDeselected,
  errors,
}: ReviewContentProps) => {
  const isGood = (rating: number) => {
    return rating < 3 ? 'bad' : 'good';
  };

  const handleCheckedChange = (checked: boolean, id: number) => {
    checked ? onSelected(id) : onDeselected(id);
  };

  const goodCheckList = [
    { id: 1, content: '예시1' },
    { id: 2, content: '예시2' },
    { id: 3, content: '예시3' },
    { id: 4, content: '예시4' },
    { id: 5, content: '예시5' },
  ];

  const badCheckList = [
    { id: 1, content: '별로 예시1' },
    { id: 2, content: '별로 예시2' },
    { id: 3, content: '별로 예시3' },
    { id: 4, content: '별로 예시4' },
    { id: 5, content: '별로 예시5' },
  ];

  const checkListTitle = {
    good: '좋았나요',
    bad: '별로였나요',
  };

  const checkList = {
    good: goodCheckList,
    bad: badCheckList,
  };

  const addTextTitle = {
    good: '좋았던 후기를 상대방에게 알려주세요!',
    bad: '아쉬웠던 점을 작성해주세요.',
  };

  const guideText = {
    good: '남겨주신 후기는 상대방에게 전달돼요.',
    bad: '비속어와 비방하는 문구는 신고대상이됩니다.',
  };

  return (
    <>
      <section className="relative">
        <p className="font-bold ">어떤 점이{checkListTitle[isGood(selectedRating)]}?</p>
        <ul className="mt-13pxr flex flex-col gap-10pxr">
          {checkList[isGood(selectedRating)].map(({ content, id }) => (
            <li
              key={id}
              className="flex items-center space-x-2"
            >
              <Checkbox
                id={`checkList-${id}`}
                onCheckedChange={(checked) => handleCheckedChange(checked as boolean, id)}
              />
              <label
                htmlFor={`checkList-${id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {content}
              </label>
            </li>
          ))}
        </ul>
        {errors?.reviewContentId && (
          <span className="absolute -bottom-5 text-xs text-red-500">
            {errors.reviewContentId.message}
          </span>
        )}
      </section>
      <section className="relative">
        <p className="font-bold ">{addTextTitle[isGood(selectedRating)]}</p>
        <span className="text-xs text-layer-5">{guideText[isGood(selectedRating)]}</span>
        <Textarea
          {...register('content', {
            maxLength: { value: 300, message: '입력가능한 글자수는 300자입니다.' },
          })}
          className="mt-10pxr"
          placeholder="여기에 적어주세요. (선택사항)"
        />
        {errors?.content && (
          <span className="absolute -bottom-5 text-xs text-red-500">{errors.content.message}</span>
        )}
      </section>
    </>
  );
};

export default ReviewContent;
