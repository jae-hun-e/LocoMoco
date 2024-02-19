import React from 'react';
import { Star } from 'lucide-react';

interface StarListProps {
  rating: number;
  fisrtNumber: number;
  color: string;
  onClick: (rating: number) => void;
}

const StarList = ({ rating, fisrtNumber, color, onClick }: StarListProps) => {
  const getArrayFromCount = (count: number, fisrtNumber: number) => {
    const array = Array.from({ length: count }, (_, index) => index + fisrtNumber);

    return count !== 0 ? array : [];
  };

  return (
    <>
      {getArrayFromCount(rating, fisrtNumber).map((number) => (
        <button
          id={`${number}`}
          key={number}
          onClick={() => onClick(number)}
        >
          <Star
            width={40}
            height={40}
            stroke="transparent"
            fill={color}
          />
        </button>
      ))}
    </>
  );
};

export default StarList;
