const isQuotaExceededError = (err: unknown): boolean => {
  return (
    err instanceof DOMException &&
    (err.code === 22 ||
      err.code === 1014 ||
      err.name === 'QuotaExceededError' ||
      err.name === 'NS_ERROR_DOM_QUOTA_REACHED')
  );
};

export const setItem = <T>(storage: Storage, key: string, value: T): void => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (err) {
    if (isQuotaExceededError(err)) {
      alert('현재 사용 가능한 스토리지 공간이 부족합니다.');
    } else {
      alert('예기치 못한 오류가 발생했습니다.');
    }
  }
};

export function getItem<T>(storage: Storage, key: string): T | undefined;
export function getItem<T>(storage: Storage, key: string, defaultValue: T): T;
export function getItem<T>(storage: Storage, key: string, defaultValue?: T): T | undefined {
  try {
    const storedValue = storage.getItem(key);

    if (storedValue === null) return defaultValue;

    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

export const removeItem = (storage: Storage, key: string) => {
  storage.removeItem(key);
};

export const USER_ID_KEY = 'userId';
