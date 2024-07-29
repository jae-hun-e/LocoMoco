import { useThunderModalStore } from '@/store/thunderModalStore';
import useKakaoMapLoad from '@/store/useKakaoMapLoad';
import useSearchValueStore, { Position } from '@/store/useSearchValueStore';
import { StoreApi } from 'zustand';

type MockStore = <T>(hook: StoreApi<T>, state: Partial<T>) => void;

const mockStore: MockStore = (hook, state) => {
  const initStore = hook.getState();
  hook.setState({ ...initStore, ...state }, true);
};

export const mockUseThunderModalStore = (state: { isOpen: boolean }) => {
  mockStore(useThunderModalStore, state);
};

export const mockuseSearchValueStore = (state: { searchValue: Position }) => {
  mockStore(useSearchValueStore, state);
};

export const mockUseKakaoMapLoadStore = (state: { isLoad: boolean }) => {
  mockStore(useKakaoMapLoad, state);
};
