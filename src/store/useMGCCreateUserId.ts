import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface MGCCreateUserIdStore {
  createUserId: number;
  setMGCCreateUserId: (newCreateUserId: number) => void;
}

export const useMGCCreateUserId = create<MGCCreateUserIdStore>()(
  devtools(
    (set) => ({
      createUserId: 0,
      setMGCCreateUserId: (newCreateUserId: number) => set({ createUserId: newCreateUserId }),
    }),
    {
      name: 'current-MGC-create-user-id',
    },
  ),
);

export default useMGCCreateUserId;
