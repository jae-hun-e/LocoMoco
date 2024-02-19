import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/libs/utils';
import StarList from './StarList';

interface RatingProps {
  selectedRating: number;
  onClick: (rating: number) => void;
  nickname: string;
}

const Rating = ({ onClick, selectedRating, nickname }: RatingProps) => {
  return (
    <section>
      <div>
        <p className="font-bold">{nickname}님과의 만남이 어떠셨나요?</p>
      </div>
      <div className="mt-20pxr flex justify-center gap-12pxr">
        <StarList
          rating={selectedRating}
          fisrtNumber={1}
          onClick={onClick}
          color="#58C694"
        />
        <StarList
          rating={5 - selectedRating}
          fisrtNumber={selectedRating + 1}
          onClick={onClick}
          color="#D9D9D9"
        />
      </div>
      {selectedRating !== 0 ? (
        <div
          className={cn(
            `mt-10pxr flex items-center space-x-2 ${selectedRating < 3 ? 'block' : 'hidden'}`,
          )}
        >
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            이 분과 다시는 만나고 싶지 않아요.
          </label>
        </div>
      ) : null}
    </section>
  );
};

export default Rating;
