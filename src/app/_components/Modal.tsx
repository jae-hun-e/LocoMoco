import { RefObject } from 'react';
import { Card } from '@/components/ui/card';
import useClickAway from '@/hooks/useClickaway';
import { cn } from '@/libs/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
  height?: string;
  rounded?: string;
}

const Modal = ({ isOpen, onClose, children, width, height, rounded }: ModalProps) => {
  const modalContentRef = useClickAway((e: MouseEvent | TouchEvent) => {
    const { innerHTML } = e.target as HTMLDivElement;
    if (innerHTML === '⚡번개 모각코') return;
    onClose();
  });

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 left-0 right-0 top-0 z-50 flex h-[100svh] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/75">
          <Card
            ref={modalContentRef as RefObject<HTMLDivElement>}
            id="modal-content"
            className={cn(
              `z-100 relative w-310pxr opacity-100 shadow w-${width ?? '310pxr'} h-${height ?? 'auto'} rounded-${rounded ?? 'lg'}`,
            )}
          >
            {children}
          </Card>
        </div>
      )}
    </>
  );
};

export default Modal;
