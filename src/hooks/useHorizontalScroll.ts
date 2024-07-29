import { MouseEvent, useRef, useState } from 'react';

const useHorizontalScroll = () => {
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleDragStart = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.clientX);
  };

  const timer = useRef<NodeJS.Timeout | null>(null);

  const throttle = (callback: (e: MouseEvent<HTMLDivElement>) => void, delayTime: number) => {
    return (e: MouseEvent<HTMLDivElement>) => {
      if (timer.current) return;
      timer.current = setTimeout(() => {
        callback(e);
        timer.current = null;
      }, delayTime);
    };
  };

  const handleDragMove = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!isDrag || !scrollRef.current) return;

    const maxScrollLeft = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    const newScrollLeft = scrollRef.current.scrollLeft + startX - e.clientX;

    if (
      (scrollRef.current.scrollLeft === 0 && newScrollLeft < 0) ||
      (Math.floor(scrollRef.current.scrollLeft) === Math.floor(maxScrollLeft) &&
        newScrollLeft > maxScrollLeft)
    ) {
      return;
    }

    if (newScrollLeft >= -50 && newScrollLeft <= maxScrollLeft + 50) {
      scrollRef.current.scrollLeft = newScrollLeft;
    }
  };

  const handleDragEnd = () => {
    setIsDrag(false);
  };

  return {
    scrollRef,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    throttle,
  };
};

export default useHorizontalScroll;
