import { create } from 'zustand';

interface ThunderModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useThunderModalStore = create<ThunderModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export { useThunderModalStore };
