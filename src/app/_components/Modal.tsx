import { RefObject } from 'react';
import { Card } from '@/components/ui/card';
import useClickAway from '@/hooks/useClickaway';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
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
            className="z-100 relative w-310pxr rounded-lg opacity-100 shadow"
          >
            {children}
          </Card>
        </div>
      )}
    </>
  );
};

export default Modal;
