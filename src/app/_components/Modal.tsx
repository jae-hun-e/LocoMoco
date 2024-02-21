import { Card } from '@/components/ui/card';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 left-0 right-0 top-0 z-50 flex h-[100svh] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/75"
        >
          <Card
            onClick={(e) => e.stopPropagation()}
            className="z-100 relative w-350pxr rounded-lg opacity-100 shadow"
          >
            {children}
          </Card>
        </div>
      )}
    </>
  );
};

export default Modal;
