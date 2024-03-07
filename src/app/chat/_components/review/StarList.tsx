import { Star } from 'lucide-react';

interface StarListProps {
  rating: number;
  fisrtNumber: number;
  color: string;
  onClick?: (rating: number) => void;
  size?: number;
}

const StarList = ({ rating, fisrtNumber, color, onClick, size }: StarListProps) => {
  const getArrayFromCount = (count: number, fisrtNumber: number) => {
    const array = Array.from({ length: count }, (_, index) => index + fisrtNumber);

    return array;
  };

  return (
    <>
      {getArrayFromCount(rating, fisrtNumber).map((number) => (
        <button
          id={`${number}`}
          key={number}
          onClick={() => onClick?.(number)}
        >
          <Star
            width={size ?? 40}
            height={size ?? 40}
            stroke="transparent"
            fill={color}
          />
        </button>
      ))}
    </>
  );
};

export default StarList;
