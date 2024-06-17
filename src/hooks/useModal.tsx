import { ComponentProps, useRef } from 'react';
import { ModalContent } from '@/app/_components/NewModal';
import { useOverlay } from '@toss/use-overlay';

export function useModal() {
  const overlay = useOverlay();
  const ref = useRef<HTMLDivElement>(null);

  const openModal = (props: ComponentProps<typeof ModalContent>) =>
    new Promise((resolve) => {
      overlay.open(({ isOpen, close }) => {
        return (
          <>
            {isOpen ? (
              <div
                className="fixed inset-0 left-0 right-0 top-0 z-50 flex h-[100svh] max-h-full w-full content-center bg-neutral-950/[.75]"
                ref={ref}
                onClick={(e: React.MouseEvent) => {
                  {
                    e.target === ref.current ? close() : null;
                  }
                  resolve(false);
                }}
              >
                <ModalContent {...props} />
              </div>
            ) : null}
          </>
        );
      });
    });

  return { open: openModal, close: overlay.close };
}

export default useModal;
