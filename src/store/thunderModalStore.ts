import { create } from 'zustand';

interface ThunderModalStore {
  isOpen: boolean;
  toggleModal: () => void;
}

const useThunderModalStore = create<ThunderModalStore>((set) => ({
  isOpen: false,
  toggleModal: () => set(({ isOpen }) => ({ isOpen: !isOpen })),
}));

export { useThunderModalStore };
