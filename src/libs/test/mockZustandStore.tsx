import { useThunderModalStore } from '@/store/thunderModalStore';
import { StoreApi } from 'zustand';

type MockStore = <T>(hook: StoreApi<T>, state: Partial<T>) => void;

const mockStore: MockStore = (hook, state) => {
  const initStore = hook.getState();
  hook.setState({ ...initStore, ...state }, true);
};

export const mockUseThunderModalStore = (state: { isOpen: boolean }) => {
  mockStore(useThunderModalStore, state);
};
