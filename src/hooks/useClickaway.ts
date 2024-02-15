import { useEffect, useRef } from 'react';

const events = ['mousedown', 'touchstart'] as const;

const useClickAway = (handler: (e: MouseEvent | TouchEvent) => void) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleEvent = (e: MouseEvent | TouchEvent) => {
      if (!(e.target instanceof Node)) return;
      if (element.contains(e.target)) return;

      handler(e);
    };

    for (const eventName of events) {
      document.addEventListener(eventName, handleEvent);
    }

    return () => {
      for (const eventName of events) {
        document.removeEventListener(eventName, handleEvent);
      }
    };
  }, [ref, handler]);

  return ref;
};

export default useClickAway;
